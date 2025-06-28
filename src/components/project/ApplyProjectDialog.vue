<!-- eslint-disable vue/attributes-order -->
<template>
  <div
    v-if="props.visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">申请加入项目</h3>
          <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 项目信息 -->
      <div v-if="props.project" class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h4 class="font-medium text-gray-900 mb-2">{{ props.project.title }}</h4>
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ props.project.description }}
        </p>
      </div>

      <form class="p-6 space-y-6" @submit.prevent="submitApplication">
        <!-- 申请理由 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">申请理由</label>
          <textarea
            v-model="applicationData.reason"
            rows="6"
            placeholder="说明你为什么想加入这个项目，以及你能为项目带来什么价值..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <!-- 相关经验 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">相关经验</label>
          <textarea
            v-model="applicationData.experience"
            rows="4"
            placeholder="描述你在相关领域的经验、技能或已完成的项目..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <!-- 可投入时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">可投入时间</label>
          <select
            v-model="applicationData.timeCommitment"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">请选择时间投入</option>
            <option value="full-time">全职参与</option>
            <option value="part-time">兼职参与（每周20+小时）</option>
            <option value="flexible">灵活参与（每周10-20小时）</option>
            <option value="limited">有限参与（每周5-10小时）</option>
          </select>
        </div>

        <!-- 联系方式 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
          <input
            v-model="applicationData.contact"
            type="text"
            placeholder="提供邮箱、微信等联系方式"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            @click="$emit('close')"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            提交申请
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { applyProject } from '@/api/modules/project'
import type { Project } from '@/api/types/project'

// Props
interface Props {
  visible: boolean
  project: Project | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  success: []
}>()

// 申请表单
const applicationData = ref({
  reason: '',
  experience: '',
  timeCommitment: '',
  contact: '',
})

// 提交申请
const submitApplication = async () => {
  if (!props.project) {
    ElMessage.error('项目信息不存在')
    return
  }

  try {
    // 调用API提交申请
    await applyProject({
      projectId: props.project.id,
      reason: applicationData.value.reason,
      experience: applicationData.value.experience,
      contact: applicationData.value.contact,
      workTime: applicationData.value.timeCommitment,
    })

    // 重置表单
    applicationData.value = {
      reason: '',
      experience: '',
      timeCommitment: '',
      contact: '',
    }

    ElMessage.success('申请提交成功！项目负责人将会尽快回复。')

    // 触发成功事件
    emit('success')
  } catch (error) {
    console.error('提交申请失败:', error)
    ElMessage.error('提交申请失败，请稍后重试')
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
