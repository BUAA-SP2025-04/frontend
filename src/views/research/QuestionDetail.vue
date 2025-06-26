<!-- filepath: c:\Users\Windows11\Desktop\小学期\frontend\src\views\research\QuestionDetail.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回问题列表
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 主内容区域 -->
        <div class="lg:col-span-3">
          <!-- 问题详情卡片 -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div class="p-8">
              <!-- 问题标题和操作 -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ question.title }}</h1>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in question.tags"
                      :key="tag"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <!-- 关注和分享按钮 -->
                <div class="flex space-x-3 ml-6">
                  <button
                    @click="toggleFollow"
                    :class="[
                      'px-4 py-2 rounded-lg font-medium transition-colors',
                      question.isFollowed
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {{ question.isFollowed ? '已关注' : '关注问题' }}
                  </button>
                  
                  <button
                    @click="shareQuestion"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                    分享
                  </button>
                </div>
              </div>

              <!-- 问题描述 -->
              <div 
                class="prose prose-lg max-w-none mb-6"
                v-html="renderedDescription"
              ></div>

              <!-- 问题元信息 -->
              <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <img
                      :src="question.author.avatar"
                      :alt="question.author.name"
                      class="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p class="font-medium text-gray-900">{{ question.author.name }}</p>
                      <p class="text-sm text-gray-500">{{ question.author.institution }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    发布于 {{ formatTime(question.createdAt) }}
                  </div>
                </div>
                
                <div class="flex items-center space-x-6 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {{ question.viewCount }} 浏览
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {{ question.followCount }} 关注
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 回答区域 -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div class="px-8 py-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">
                  {{ answers.length }} 个回答
                </h2>
                <div class="flex items-center space-x-3">
                  <label class="text-sm text-gray-600">排序方式：</label>
                  <select
                    v-model="answerSortBy"
                    class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="helpful">最有帮助</option>
                    <option value="latest">最新回答</option>
                    <option value="oldest">最早回答</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 回答列表 -->
            <div class="divide-y divide-gray-200">
              <div
                v-for="answer in sortedAnswers"
                :key="answer.id"
                class="p-8"
              >
                <!-- 回答者信息 -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <img
                      :src="answer.author.avatar"
                      :alt="answer.author.name"
                      class="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p class="font-medium text-gray-900">{{ answer.author.name }}</p>
                      <p class="text-sm text-gray-500">
                        {{ answer.author.institution }} · {{ formatTime(answer.createdAt) }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- 最佳答案标记 -->
                  <div v-if="answer.isBest" class="flex items-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      最佳答案
                    </span>
                  </div>
                </div>

                <!-- 回答内容 -->
                <div 
                  class="prose prose-lg max-w-none mb-6"
                  v-html="renderMarkdown(answer.content)"
                ></div>

                <!-- 回答操作 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div class="flex items-center space-x-4">
                    <!-- 点赞 -->
                    <button
                      @click="toggleLike(answer.id)"
                      :class="[
                        'flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        answer.isLiked
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7m5 3v4M9 7H5a2 2 0 00-2 2v6a2 2 0 002 2h2.5l1.5-3h2z"></path>
                      </svg>
                      <span>{{ answer.likeCount }}</span>
                    </button>

                    <!-- 评论 -->
                    <button
                      @click="toggleComments(answer.id)"
                      class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"></path>
                      </svg>
                      <span>{{ answer.commentCount }}</span>
                    </button>

                    <!-- 分享 -->
                    <button
                      @click="shareAnswer(answer.id)"
                      class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                      </svg>
                      分享
                    </button>
                  </div>

                  <!-- 采纳按钮（仅问题作者可见） -->
                  <div v-if="isQuestionAuthor && !answer.isBest && !hasBestAnswer">
                    <button
                      @click="markAsBest(answer.id)"
                      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      采纳为最佳答案
                    </button>
                  </div>
                </div>

                <!-- 评论区域 -->
                <div v-if="answer.showComments" class="mt-6 pt-6 border-t border-gray-100">
                  <!-- 评论列表 -->
                  <div v-if="answer.comments && answer.comments.length > 0" class="space-y-4 mb-4">
                    <div
                      v-for="comment in answer.comments"
                      :key="comment.id"
                      class="flex space-x-3"
                    >
                      <img
                        :src="comment.author.avatar"
                        :alt="comment.author.name"
                        class="w-8 h-8 rounded-full"
                      />
                      <div class="flex-1">
                        <div class="bg-gray-50 rounded-lg p-3">
                          <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-medium text-gray-900">{{ comment.author.name }}</span>
                            <span class="text-xs text-gray-500">{{ formatTime(comment.createdAt) }}</span>
                          </div>
                          <p class="text-sm text-gray-700">{{ comment.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 添加评论 -->
                  <div class="flex space-x-3">
                    <img
                      src="/default-avatar.png"
                      alt="当前用户"
                      class="w-8 h-8 rounded-full"
                    />
                    <div class="flex-1">
                      <textarea
                        v-model="newComments[answer.id]"
                        placeholder="写下你的评论..."
                        rows="2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      ></textarea>
                      <div class="flex justify-end mt-2">
                        <button
                          @click="addComment(answer.id)"
                          :disabled="!newComments[answer.id]?.trim()"
                          class="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          发布评论
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 写回答 -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="px-8 py-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">写回答</h3>
              <p class="text-sm text-gray-600 mt-1">分享你的见解，帮助解决这个问题</p>
            </div>
            
            <div class="p-8">
              <!-- Markdown编辑器 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- 编辑区 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    编写回答（支持Markdown）
                  </label>
                  <textarea
                    v-model="newAnswerContent"
                    placeholder="你可以使用 Markdown 语法来格式化你的回答...

例如：
**粗体文字**
*斜体文字*
`代码`
```代码块```
- 列表项
1. 有序列表"
                    rows="12"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  ></textarea>
                </div>
                
                <!-- 预览区 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">预览</label>
                  <div 
                    class="w-full min-h-[300px] p-3 border border-gray-300 rounded-lg bg-gray-50 prose prose-sm max-w-none"
                    v-html="previewContent"
                  ></div>
                </div>
              </div>

              <!-- 提交按钮 -->
              <div class="flex justify-end mt-6 pt-6 border-t border-gray-200">
                <button
                  @click="submitAnswer"
                  :disabled="!newAnswerContent.trim()"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  发布回答
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <!-- 问题统计 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">问题统计</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">回答数</span>
                <span class="font-medium">{{ answers.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">浏览数</span>
                <span class="font-medium">{{ question.viewCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">关注数</span>
                <span class="font-medium">{{ question.followCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">发布时间</span>
                <span class="font-medium">{{ formatDate(question.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- 相关问题 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">相关问题</h3>
            <div class="space-y-4">
              <div
                v-for="relatedQ in relatedQuestions"
                :key="relatedQ.id"
                class="group cursor-pointer"
                @click="goToQuestion(relatedQ.id)"
              >
                <h4 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                  {{ relatedQ.title }}
                </h4>
                <div class="flex items-center text-xs text-gray-500">
                  <span>{{ relatedQ.answerCount }} 回答</span>
                  <span class="mx-1">·</span>
                  <span>{{ relatedQ.viewCount }} 浏览</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const route = useRoute()
const router = useRouter()

// 配置marked
marked.setOptions({
  // @ts-expect-error: highlight is a valid option for marked but not in MarkedOptions type
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (__) {}
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
} as any)

// 响应式数据
const answerSortBy = ref('helpful')
const newAnswerContent = ref('')
const newComments = ref<Record<number, string>>({})
const isQuestionAuthor = ref(false) // 当前用户是否为问题作者

// 模拟问题数据
const question = ref({
  id: 1,
  title: '如何选择合适的机器学习算法来解决多分类问题？',
  description: `我正在处理一个包含10个类别的图像分类任务，数据集大小约为50000张图片。目前考虑使用CNN，但不确定具体应该选择哪种架构。

## 数据集详情
- **总样本数**：50,000张图片
- **类别数**：10个类别
- **图片尺寸**：224x224 RGB
- **数据分布**：存在类别不平衡问题

## 遇到的问题
1. 某些类别的样本数量较少（最少的类别只有2000个样本）
2. 不确定应该使用哪种CNN架构
3. 如何处理类别不平衡问题

## 已尝试的方法
- 基础的CNN模型（准确率约75%）
- 数据增强（旋转、翻转、缩放）
- 简单的权重平衡

希望能得到一些关于**算法选择**和**数据预处理**的专业建议。有经验的同行能否分享一些实际的解决方案？

\`\`\`python
# 当前使用的简单模型
model = Sequential([
    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])
\`\`\``,
  category: '机器学习',
  tags: ['CNN', '图像分类', '多分类', '类别不平衡'],
  author: {
    id: 1,
    name: '张研究员',
    avatar: '/images/avatar/1.png',
    institution: '清华大学'
  },
  createdAt: '2025-06-25T10:30:00',
  viewCount: 328,
  followCount: 15,
  isFollowed: false
})

// 模拟回答数据
const answers = ref([
  {
    id: 1,
    content: `对于你的多分类图像任务，我建议从以下几个方面来优化：

## 1. 模型架构选择

根据你的数据集规模（50k样本），我推荐以下几种架构：

### ResNet系列
\`\`\`python
from tensorflow.keras.applications import ResNet50

base_model = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])
\`\`\`

### EfficientNet
EfficientNet在准确率和效率之间取得了很好的平衡：

\`\`\`python
from tensorflow.keras.applications import EfficientNetB0

base_model = EfficientNetB0(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)
\`\`\`

## 2. 类别不平衡解决方案

### 损失函数优化
使用**Focal Loss**来解决类别不平衡：

\`\`\`python
def focal_loss(gamma=2., alpha=0.25):
    def focal_loss_fixed(y_true, y_pred):
        epsilon = K.epsilon()
        y_pred = K.clip(y_pred, epsilon, 1. - epsilon)
        p_t = tf.where(K.equal(y_true, 1), y_pred, 1 - y_pred)
        alpha_factor = K.ones_like(y_true) * alpha
        alpha_t = tf.where(K.equal(y_true, 1), alpha_factor, 1 - alpha_factor)
        cross_entropy = -K.log(p_t)
        weight = alpha_t * K.pow((1 - p_t), gamma)
        loss = weight * cross_entropy
        return K.mean(K.sum(loss, axis=1))
    return focal_loss_fixed
\`\`\`

### 数据采样策略
- **过采样**：对少数类别使用SMOTE或简单复制
- **欠采样**：减少多数类别的样本
- **组合采样**：结合过采样和欠采样

## 3. 数据增强策略

\`\`\`python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    shear_range=0.2,
    fill_mode='nearest',
    # 高级增强
    channel_shift_range=0.1,
    brightness_range=[0.8, 1.2]
)
\`\`\`

## 4. 训练策略

1. **学习率调度**：使用余弦退火或阶梯式衰减
2. **早停策略**：监控验证损失，防止过拟合
3. **模型集成**：训练多个模型进行集成预测

预期通过这些优化，你的模型准确率应该能提升到**85-90%**以上。`,
    author: {
      id: 2,
      name: '李教授',
      avatar: '/images/avatar/2.png',
      institution: '北京大学',
      title: '机器学习教授'
    },
    createdAt: '2025-06-25T11:15:00',
    likeCount: 24,
    commentCount: 8,
    isLiked: false,
    isBest: true,
    showComments: false,
    comments: [
      {
        id: 1,
        content: '非常详细的回答！Focal Loss确实很有效，我在项目中使用过。',
        author: {
          name: '王研究生',
          avatar: '/images/avatar/3.png'
        },
        createdAt: '2025-06-25T12:00:00'
      },
      {
        id: 2,
        content: '请问EfficientNet和ResNet在计算效率上有多大差别？',
        author: {
          name: '陈同学',
          avatar: '/images/avatar/4.png'
        },
        createdAt: '2025-06-25T13:30:00'
      }
    ]
  },
  {
    id: 2,
    content: `补充一些实际经验：

## 预训练模型的选择

除了前面提到的架构，我还推荐考虑**Vision Transformer (ViT)**：

\`\`\`python
import timm

model = timm.create_model(
    'vit_base_patch16_224',
    pretrained=True,
    num_classes=10
)
\`\`\`

ViT在大规模数据集上表现很好，但需要更多的计算资源。

## 实用的评估指标

对于不平衡数据集，不要只看准确率，还要关注：

1. **F1-Score（宏平均和微平均）**
2. **每个类别的精确率和召回率**
3. **混淆矩阵**

\`\`\`python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# 获取预测结果
y_pred = model.predict(X_test)
y_pred_classes = np.argmax(y_pred, axis=1)

# 分类报告
print(classification_report(y_test, y_pred_classes))

# 混淆矩阵可视化
cm = confusion_matrix(y_test, y_pred_classes)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.show()
\`\`\`

## 超参数调优建议

使用**Optuna**进行自动化超参数搜索：

\`\`\`python
import optuna

def objective(trial):
    # 建议的超参数范围
    learning_rate = trial.suggest_float('learning_rate', 1e-5, 1e-2, log=True)
    batch_size = trial.suggest_categorical('batch_size', [16, 32, 64])
    dropout_rate = trial.suggest_float('dropout_rate', 0.2, 0.7)
    
    # 训练模型并返回验证准确率
    model = build_model(dropout_rate)
    model.compile(
        optimizer=Adam(learning_rate=learning_rate),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    history = model.fit(X_train, y_train, 
                       batch_size=batch_size,
                       validation_data=(X_val, y_val),
                       epochs=50, verbose=0)
    
    return max(history.history['val_accuracy'])

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)
\`\`\`

希望这些补充信息对你有帮助！`,
    author: {
      id: 3,
      name: '赵工程师',
      avatar: '/images/avatar/5.png',
      institution: '字节跳动',
      title: '高级算法工程师'
    },
    createdAt: '2025-06-25T14:20:00',
    likeCount: 18,
    commentCount: 5,
    isLiked: true,
    isBest: false,
    showComments: false,
    comments: [
      {
        id: 3,
        content: 'Optuna确实很好用，自动调参省了很多时间。',
        author: {
          name: '孙研究员',
          avatar: '/images/avatar/6.png'
        },
        createdAt: '2025-06-25T15:00:00'
      }
    ]
  },
  {
    id: 3,
    content: `我最近也遇到了类似的问题，分享一下我的解决方案：

## 数据预处理的重要性

很多人忽视了数据预处理，但这往往是提升性能的关键：

### 1. 数据清洗
- 检查并移除损坏的图片
- 统一图片格式和尺寸
- 检查标注错误

### 2. 数据标准化
\`\`\`python
# ImageNet预训练模型的标准化
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std)
])
\`\`\`

## 渐进式训练策略

我采用了**渐进式训练**的方法：

1. **第一阶段**：冻结预训练模型，只训练分类头
2. **第二阶段**：解冻最后几层，低学习率微调
3. **第三阶段**：全模型微调，更低学习率

\`\`\`python
# 第一阶段：冻结特征提取器
for param in base_model.parameters():
    param.requires_grad = False

# 训练分类头
optimizer = Adam(model.classifier.parameters(), lr=1e-3)

# 第二阶段：解冻最后几层
for param in base_model.layer4.parameters():
    param.requires_grad = True

optimizer = Adam(model.parameters(), lr=1e-4)

# 第三阶段：全模型微调
for param in model.parameters():
    param.requires_grad = True

optimizer = Adam(model.parameters(), lr=1e-5)
\`\`\`

这种方法在我的项目中将准确率从78%提升到了87%。

## 模型融合技巧

最后，尝试集成多个模型：

\`\`\`python
# 简单的投票集成
models = [resnet_model, efficientnet_model, vit_model]
predictions = []

for model in models:
    pred = model.predict(X_test)
    predictions.append(pred)

# 平均预测概率
ensemble_pred = np.mean(predictions, axis=0)
final_pred = np.argmax(ensemble_pred, axis=1)
\`\`\`

希望这些经验对你有用！有问题随时交流。`,
    author: {
      id: 4,
      name: '钱博士后',
      avatar: '/images/avatar/7.png',
      institution: '中科院计算所',
      title: '博士后研究员'
    },
    createdAt: '2025-06-25T16:45:00',
    likeCount: 12,
    commentCount: 3,
    isLiked: false,
    isBest: false,
    showComments: false,
    comments: []
  }
])

// 相关问题
const relatedQuestions = ref([
  {
    id: 2,
    title: '深度学习模型在小样本数据集上的过拟合问题如何解决？',
    answerCount: 8,
    viewCount: 256
  },
  {
    id: 3,
    title: 'CNN和Vision Transformer在图像分类任务上的性能对比',
    answerCount: 5,
    viewCount: 178
  },
  {
    id: 4,
    title: '如何处理医学图像分类中的类别不平衡问题？',
    answerCount: 12,
    viewCount: 389
  },
  {
    id: 5,
    title: '迁移学习在小数据集上的最佳实践',
    answerCount: 7,
    viewCount: 203
  }
])

// 计算属性
const renderedDescription = computed(() => {
  return renderMarkdown(question.value.description)
})

const previewContent = computed(() => {
  return newAnswerContent.value ? renderMarkdown(newAnswerContent.value) : '<p class="text-gray-400">预览将在这里显示...</p>'
})

const sortedAnswers = computed(() => {
  const sorted = [...answers.value]
  
  switch (answerSortBy.value) {
    case 'helpful':
      // 最佳答案优先，然后按点赞数排序
      sorted.sort((a, b) => {
        if (a.isBest && !b.isBest) return -1
        if (!a.isBest && b.isBest) return 1
        return b.likeCount - a.likeCount
      })
      break
    case 'latest':
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'oldest':
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
  }
  
  return sorted
})

const hasBestAnswer = computed(() => {
  return answers.value.some(answer => answer.isBest)
})

// 方法
const renderMarkdown = (content: string) => {
  return marked(content)
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString))
}

const goBack = () => {
  router.push('/research/qa')
}

const toggleFollow = () => {
  question.value.isFollowed = !question.value.isFollowed
  question.value.followCount += question.value.isFollowed ? 1 : -1
  ElMessage.success(question.value.isFollowed ? '关注成功' : '取消关注')
}

const shareQuestion = () => {
  // 复制链接到剪贴板
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    ElMessage.success('链接已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败，请手动复制链接')
  })
}

const toggleLike = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    answer.isLiked = !answer.isLiked
    answer.likeCount += answer.isLiked ? 1 : -1
  }
}

const toggleComments = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    answer.showComments = !answer.showComments
  }
}

const addComment = (answerId: number) => {
  const content = newComments.value[answerId]?.trim()
  if (!content) return

  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    if (!answer.comments) answer.comments = []
    
    answer.comments.push({
      id: Date.now(),
      content,
      author: {
        name: '当前用户',
        avatar: '/images/avatar/default.png'
      },
      createdAt: new Date().toISOString()
    })
    
    answer.commentCount++
    newComments.value[answerId] = ''
    ElMessage.success('评论发布成功')
  }
}

const markAsBest = (answerId: number) => {
  const answer = answers.value.find(a => a.id === answerId)
  if (answer) {
    // 移除其他最佳答案标记
    answers.value.forEach(a => a.isBest = false)
    // 标记当前答案为最佳
    answer.isBest = true
    ElMessage.success('已采纳为最佳答案')
  }
}

const shareAnswer = (answerId: number) => {
  const url = `${window.location.href}#answer-${answerId}`
  navigator.clipboard.writeText(url).then(() => {
    ElMessage.success('答案链接已复制')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

const submitAnswer = () => {
  if (!newAnswerContent.value.trim()) return

  const newAnswer = {
    id: Date.now(),
    content: newAnswerContent.value,
    author: {
      id: 999,
      name: '当前用户',
      avatar: '/images/avatar/default.png',
      institution: '我的大学',
      title: '研究生'
    },
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    isBest: false,
    showComments: false,
    comments: []
  }

  answers.value.push(newAnswer)
  newAnswerContent.value = ''
  ElMessage.success('回答发布成功！')
  
  // 滚动到新回答
  setTimeout(() => {
    const element = document.querySelector(`[data-answer-id="${newAnswer.id}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

const goToQuestion = (questionId: number) => {
  router.push(`/research/qa/${questionId}`)
}

onMounted(() => {
  // 模拟增加浏览量
  question.value.viewCount++
  
  // 检查当前用户是否为问题作者（模拟逻辑）
  isQuestionAuthor.value = false // 实际应用中根据登录用户判断
  
  // 初始化评论对象
  answers.value.forEach(answer => {
    newComments.value[answer.id] = ''
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Markdown样式优化 */
.prose {
  color: #374151;
  max-width: none;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  color: #111827;
  font-weight: 600;
}

.prose h1 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.prose h2 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h3 {
  font-size: 1.125rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose ul, .prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose code {
  background-color: #f3f4f6;
  color: #e11d48;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.prose th, .prose td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  text-align: left;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}

.prose strong {
  font-weight: 600;
  color: #111827;
}

.prose em {
  font-style: italic;
}

.prose a {
  color: #2563eb;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}
</style>