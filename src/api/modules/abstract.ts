import { useUserStore } from "@/stores/user";
import request from "@/utils/request";
import axios from 'axios';

export type UploadFileRes = {
  id: string
  name: string
  size: number
  extension: string
  mime_type: string
  created_by: string
  created_at: string
}

export type UploadFileOptions = {
  timeout?: number
  customHeaders?: Record<string, string>
}

export type WorkflowInput = {
  inputs: {
    [variable_name: string]: {
      type: string
      transfer_method: string
      upload_file_id: string
    }
  }
  response_mode: string
  user: string
}

export type WorkflowRunOptions = {
  timeout?: number
  customHeaders?: Record<string, string>
  onMessage?: (message: string) => void
  onError?: (error: Error) => void
  onComplete?: () => void
}

export type ChunkCompletionResponse = {
  event: 'workflow_started' | 'node_started' | 'text_chunk' | 'node_finished' | 'workflow_finished' | 'error' | 'ping' | 'tts_message' | 'tts_message_end'
  task_id: string
  workflow_run_id: string
  data?: {
    text?: string
    from_variable_selector?: string[]
    id?: string
    workflow_id?: string
    node_id?: string
    node_type?: string
    title?: string
    index?: number
    predecessor_node_id?: string
    inputs?: any
    outputs?: any
    status?: 'running' | 'succeeded' | 'failed' | 'stopped'
    error?: string
    elapsed_time?: number
    execution_metadata?: {
      total_tokens?: number
      total_price?: number
      currency?: string
    }
    created_at?: string
    finished_at?: string
  }
  message_id?: string
  audio?: string
  created_at?: number
}

const DIFY_API_BASE = 'http://10.251.254.129:8083/v1';

export const uploadFile = async (
  url: string,
  options: UploadFileOptions = {}
): Promise<string> => {
  const { timeout = 60000, customHeaders = {} } = options;

  try {
    // 验证URL
    if (!url || typeof url !== 'string') {
      throw new Error('无效的文件URL');
    }

    // 使用原生axios获取文件，避免request工具的响应拦截器影响
    const fileResponse = await axios.get('/api' + url, {
      responseType: 'blob',
      timeout: 30000,
      validateStatus: (status) => status < 400, // 只接受2xx和3xx状态码
    });

    // 验证响应数据
    if (!fileResponse.data) {
      throw new Error('文件数据为空');
    }

    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1] || 'file';

    // 安全地获取文件类型
    const contentType = fileResponse.headers?.['content-type'] ||
      fileResponse.headers?.['Content-Type'] ||
      'application/octet-stream';

    const file = new File([fileResponse.data], fileName, {
      type: contentType
    });

    // 验证文件大小
    if (file.size === 0) {
      throw new Error('文件大小为0，可能下载失败');
    }

    // 获取当前用户名
    const userStore = useUserStore();
    const userName = userStore.user?.name || 'unknown_user';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', userName);

    const response = await axios.post(DIFY_API_BASE + '/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer app-1zEkt0Du8l1RKIZiBVuYFFri',
        ...customHeaders
      },
      timeout,
    });


    return response.data.id;
  } catch (error: any) {
    console.error('❌ 文件上传失败:', error);

    // 详细的错误处理
    if (error.code === 'ECONNABORTED') {
      throw new Error('请求超时，请检查网络连接');
    }
    if (error.response) {
      const { status, data } = error.response;
      console.error('HTTP错误详情:', { status, data });

      switch (status) {
        case 401:
          throw new Error('认证失败，请检查API密钥');
        case 403:
          throw new Error('权限不足，无法上传文件');
        case 404:
          throw new Error('文件URL不存在或无法访问');
        case 413:
          throw new Error('文件太大，超出上传限制');
        case 500:
          throw new Error('服务器内部错误，请稍后重试');
        default:
          throw new Error(`上传失败 (${status}): ${data?.message || '未知错误'}`);
      }
    }
    if (error.request) {
      throw new Error('网络连接失败，请检查网络设置');
    }

    // 其他错误
    throw new Error(error.message || '文件上传失败');
  }
}

/**
 * 运行Dify工作流（流式传输，使用SSE协议）
 * @param uploadFileId 上传文件ID
 * @param user 用户ID
 * @param options 配置选项
 * @returns Promise<void>
 */
export const runWorkflow = async (
  uploadFileId: string,
  user: string,
  options: WorkflowRunOptions = {}
): Promise<void> => {
  const {
    timeout = 300000,
    customHeaders = {},
    onMessage,
    onError,
    onComplete
  } = options;

  const workflowInputs: WorkflowInput = {
    inputs: {
      article: {
        type: "document",
        transfer_method: "local_file",
        upload_file_id: uploadFileId,
      }
    },
    response_mode: "streaming",
    user: user
  };

  try {
    // 使用 fetch 发送 POST 请求，设置 Accept 头为 text/event-stream
    const response = await fetch(`${DIFY_API_BASE}/workflows/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer app-1zEkt0Du8l1RKIZiBVuYFFri',
        'Connection': 'keep-alive',
        ...customHeaders
      },
      body: JSON.stringify(workflowInputs)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 检查响应类型
    const contentType = response.headers.get('content-type');

    // 如果响应不是SSE格式，尝试解析为普通JSON
    if (!contentType || (!contentType.includes('text/event-stream') && !contentType.includes('application/json'))) {
      console.warn('响应格式未知，尝试解析为普通JSON');
      const data = await response.json();
      if (data.answer) {
        onMessage?.(data.answer);
      }
      onComplete?.();
      return;
    }

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error('无法获取响应流');
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let chunkCount = 0;

    // 设置超时
    const timeoutId = setTimeout(() => {
      reader.cancel();
      onError?.(new Error('请求超时'));
    }, timeout);

    try {
      console.log('开始读取流数据...');

      while (true) {
        const { done, value } = await reader.read();
        chunkCount++;

        if (done) {
          break;
        }

        // 解码二进制数据为文本
        const chunk = decoder.decode(value, { stream: true });

        buffer += chunk;
        // 按行分割
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // 保留不完整的行

        for (const line of lines) {

          if (line.trim() === '') {
            continue;
          }

          // 处理SSE格式的数据
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              clearTimeout(timeoutId);
              onComplete?.();
              return;
            }

            try {
              const chunk = JSON.parse(data);
              console.log('解析后的JSON:', chunk);

              // 根据事件类型处理不同的数据
              if (chunk.event === 'text_chunk') {
                console.log('收到text_chunk事件:', chunk);
                if (chunk.data && chunk.data.text) {
                  console.log('发送text_chunk文本:', chunk.data.text);
                  onMessage?.(chunk.data.text);
                }
              } else if (chunk.event === 'workflow_finished') {
                console.log('收到workflow_finished事件:', chunk);
                clearTimeout(timeoutId);
                onComplete?.();
                return;
              } else if (chunk.event === 'workflow_started') {
                console.log('收到workflow_started事件:', chunk);
              } else if (chunk.event === 'node_started') {
                console.log('收到node_started事件:', chunk);
              } else if (chunk.event === 'node_finished') {
                console.log('收到node_finished事件:', chunk);
              } else if (chunk.event === 'error') {
                console.error('收到error事件:', chunk);
                onError?.(new Error(chunk.data?.error || '工作流执行错误'));
              } else if (chunk.event === 'ping') {
                console.log('收到ping事件:', chunk);
              } else if (chunk.event === 'tts_message') {
                console.log('收到tts_message事件:', chunk);
              } else if (chunk.event === 'tts_message_end') {
                console.log('收到tts_message_end事件:', chunk);
              } else {
                console.log('未处理的事件类型:', chunk.event, '完整数据:', chunk);
              }
            } catch (e) {
              console.warn('解析SSE数据失败:', e, '原始数据:', data);
            }
          }
          // 处理其他SSE事件类型
          else if (line.startsWith('event: ')) {
            const eventType = line.slice(7);
            console.log('SSE事件类型:', eventType);
          }
          // 处理SSE注释
          else if (line.startsWith(':')) {
            console.log('SSE注释:', line.slice(1));
          }
          // 处理普通JSON响应
          else {
            console.log('尝试解析为普通JSON:', line);
            try {
              const data = JSON.parse(line);
              if (data.answer) {
                console.log('普通JSON消息:', data.answer);
                onMessage?.(data.answer);
              }
            } catch (e) {
              console.log('不是有效的JSON:', line);
            }
          }
        }
      }
    } finally {
      clearTimeout(timeoutId);
      console.log('流处理完成，总共处理了', chunkCount, '个数据块');
    }

    onComplete?.();
  } catch (error: any) {
    const errorMessage = error.message || '未知错误';
    const finalError = new Error(`工作流运行失败: ${errorMessage}`);
    onError?.(finalError);
    throw finalError;
  }
}

/**
 * 使用EventSource运行Dify工作流（SSE协议，备选方案）
 * 注意：EventSource不支持自定义headers，需要服务器支持GET请求
 * @param uploadFileId 上传文件ID
 * @param user 用户ID
 * @param options 配置选项
 * @returns Promise<void>
 */
export const runWorkflowWithEventSource = async (
  uploadFileId: string,
  user: string,
  options: WorkflowRunOptions = {}
): Promise<void> => {
  const {
    timeout = 300000,
    onMessage,
    onError,
    onComplete
  } = options;

  const workflowInputs: WorkflowInput = {
    inputs: {
      article: {
        type: "document",
        transfer_method: "local_file",
        upload_file_id: uploadFileId,
      }
    },
    response_mode: "streaming",
    user: user
  };

  return new Promise((resolve, reject) => {
    // 创建URL参数
    const params = new URLSearchParams({
      inputs: JSON.stringify(workflowInputs.inputs),
      response_mode: workflowInputs.response_mode,
      user: workflowInputs.user
    });

    // 创建EventSource（注意：不支持自定义headers）
    const eventSource = new EventSource(`${DIFY_API_BASE}/workflows/run?${params}`);

    // 设置超时
    const timeoutId = setTimeout(() => {
      eventSource.close();
      const error = new Error('请求超时');
      onError?.(error);
      reject(error);
    }, timeout);

    // 处理连接打开
    eventSource.onopen = () => {
      console.log('SSE连接已建立');
    };

    // 处理消息
    eventSource.onmessage = (event) => {
      try {
        if (event.data === '[DONE]') {
          clearTimeout(timeoutId);
          eventSource.close();
          onComplete?.();
          resolve();
          return;
        }

        const chunk: ChunkCompletionResponse = JSON.parse(event.data);

        // 根据事件类型处理不同的数据
        if (chunk.event === 'text_chunk') {
          if (chunk.data && chunk.data.text) {
            onMessage?.(chunk.data.text);
          }
        } else if (chunk.event === 'workflow_finished') {
          clearTimeout(timeoutId);
          eventSource.close();
          onComplete?.();
          resolve();
          return;
        }
      } catch (e) {
        console.warn('解析SSE消息失败:', e, '原始数据:', event.data);
      }
    };

    // 处理错误
    eventSource.onerror = (error) => {
      clearTimeout(timeoutId);
      eventSource.close();
      const finalError = new Error(`SSE连接错误: ${error}`);
      onError?.(finalError);
      reject(finalError);
    };

    // 处理自定义事件
    eventSource.addEventListener('error', (event) => {
      console.log('SSE错误事件:', event);
    });

    eventSource.addEventListener('complete', (event) => {
      console.log('SSE完成事件:', event);
    });
  });
}

/**
 * 运行Dify工作流（非流式，返回完整响应）
 * @param workflowId 工作流ID
 * @param uploadFileId 上传文件ID
 * @param user 用户ID
 * @param options 配置选项
 * @returns Promise<any>
 */
export const runWorkflowSync = async (
  workflowId: string,
  uploadFileId: string,
  user: string,
  options: WorkflowRunOptions = {}
): Promise<any> => {
  const { timeout = 60000, customHeaders = {} } = options;

  const workflowInputs: WorkflowInput = {
    inputs: {
      "article": {
        "type": "document",
        "transfer_method": "local_file",
        "upload_file_id": uploadFileId
      }
    },
    response_mode: "streaming",
    user: user
  };

  try {
    const response = await axios.post(`${DIFY_API_BASE}/workflows/${workflowId}/run`, workflowInputs, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer app-1zEkt0Du8l1RKIZiBVuYFFri',
        ...customHeaders
      },
      timeout
    });

    return response;
  } catch (error: any) {
    throw new Error(`工作流运行失败: ${error.message || '未知错误'}`);
  }
}

/**
 * 运行Dify工作流（非流式，便捷版本）
 * @param workflowId 工作流ID
 * @param uploadFileId 上传文件ID
 * @param user 用户ID
 * @param options 配置选项
 * @returns Promise<any>
 */
export const runWorkflowSyncSimple = async (
  workflowId: string,
  uploadFileId: string,
  user: string,
  options: WorkflowRunOptions = {}
): Promise<any> => {
  return runWorkflowSync(workflowId, uploadFileId, user, options);
}

/**
 * 使用示例:
 * 
 * // 1. 上传文件
 * // 基本使用
 * const result = await uploadFile('https://example.com/file.pdf');
 * 
 * // 带选项的使用
 * const result = await uploadFile('https://example.com/file.pdf', {
 *   timeout: 120000, // 2分钟超时
 *   customHeaders: {
 *     'X-Custom-Header': 'value'
 *   }
 * });
 * 
 * // 错误处理
 * try {
 *   const result = await uploadFile('https://example.com/file.pdf');
 *   console.log('上传成功:', result);
 * } catch (error) {
 *   console.error('上传失败:', error.message);
 * }
 * 
 * // 2. 运行工作流（流式传输）
 * const workflowInputs = {
 *   inputs: {
 *     "article": {
 *       "type": "document",
 *       "transfer_method": "local_file",
 *       "upload_file_id": "c3cbb05b-cdc3-4518-a504-2b16e0f12308"
 *     }
 *   },
 *   response_mode: "streaming",
 *   user: "1"
 * };
 * 
 * // 流式运行工作流
 * await runWorkflow('workflow_123', workflowInputs, {
 *   onMessage: (message) => {
 *     console.log('收到消息:', message);
 *   },
 *   onError: (error) => {
 *     console.error('工作流错误:', error);
 *   },
 *   onComplete: () => {
 *     console.log('工作流完成');
 *   }
 * });
 * 
 * // 3. 运行工作流（非流式）
 * const result = await runWorkflowSync('workflow_123', workflowInputs);
 * console.log('工作流结果:', result);
 * 
 * // 4. 便捷版本使用（推荐）
 * // 只需要传入变化的参数
 * await runWorkflowSimple('workflow_123', 'c3cbb05b-cdc3-4518-a504-2b16e0f12308', '1', {
 *   onMessage: (message) => console.log('收到消息:', message),
 *   onError: (error) => console.error('工作流错误:', error),
 *   onComplete: () => console.log('工作流完成')
 * });
 * 
 * // 非流式便捷版本
 * const result = await runWorkflowSyncSimple('workflow_123', 'c3cbb05b-cdc3-4518-a504-2b16e0f12308', '1');
 * console.log('工作流结果:', result);
 */
