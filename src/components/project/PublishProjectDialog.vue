<!-- eslint-disable vue/attributes-order -->
<template>
  <div
    v-if="props.visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">发布科研项目</h3>
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

      <form class="p-6 space-y-6" @submit.prevent="publishProject">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 左侧：基本信息 -->
          <div class="space-y-6">
            <!-- 项目标题 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">项目标题</label>
              <input
                v-model="newProject.title"
                type="text"
                placeholder="输入项目标题..."
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  formErrors.title ? 'border-red-300' : 'border-gray-300',
                ]"
                required
                @input="validateTitle"
              />
              <div class="flex justify-between items-center mt-1">
                <p v-if="formErrors.title" class="text-sm text-red-600">{{ formErrors.title }}</p>
                <p class="text-xs text-gray-500 ml-auto">{{ newProject.title.length }}/20</p>
              </div>
            </div>

            <!-- 研究领域 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">研究领域</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="field in newProject.fields"
                  :key="field"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ field }}
                  <button
                    type="button"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                    @click="removeField(field)"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <select
                  v-model="fieldInput"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.fields ? 'border-red-300' : 'border-gray-300',
                  ]"
                >
                  <option value="">选择研究领域</option>
                  <option value="计算机科学">计算机科学</option>
                  <option value="人工智能">人工智能</option>
                  <option value="机器学习">机器学习</option>
                  <option value="数据科学">数据科学</option>
                  <option value="生物信息学">生物信息学</option>
                  <option value="物理学">物理学</option>
                  <option value="化学">化学</option>
                  <option value="数学">数学</option>
                  <option value="材料科学">材料科学</option>
                  <option value="环境科学">环境科学</option>
                  <option value="地球科学">地球科学</option>
                  <option value="天文学">天文学</option>
                  <option value="医学">医学</option>
                  <option value="药学">药学</option>
                  <option value="心理学">心理学</option>
                  <option value="社会学">社会学</option>
                  <option value="经济学">经济学</option>
                  <option value="管理学">管理学</option>
                  <option value="法学">法学</option>
                  <option value="教育学">教育学</option>
                  <option value="历史学">历史学</option>
                  <option value="哲学">哲学</option>
                  <option value="语言学">语言学</option>
                  <option value="政治学">政治学</option>
                  <option value="艺术学">艺术学</option>
                  <option value="农学">农学</option>
                  <option value="工程学">工程学</option>
                  <option value="电子科学">电子科学</option>
                  <option value="自动化">自动化</option>
                  <option value="交通运输">交通运输</option>
                  <option value="能源科学">能源科学</option>
                  <option value="海洋科学">海洋科学</option>
                  <option value="统计学">统计学</option>
                  <option value="信息科学">信息科学</option>
                  <option value="新闻传播学">新闻传播学</option>
                  <option value="体育学">体育学</option>
                  <option value="其他">其他</option>
                </select>
                <button
                  type="button"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  @click="addField"
                >
                  添加
                </button>
              </div>
              <p v-if="formErrors.fields" class="mt-1 text-sm text-red-600">
                {{ formErrors.fields }}
              </p>
            </div>

            <!-- 团队规模 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">团队规模限制</label>
              <input
                v-model.number="newProject.maxMembers"
                type="number"
                min="2"
                max="50"
                placeholder="最大成员数量"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  formErrors.maxMembers ? 'border-red-300' : 'border-gray-300',
                ]"
                required
              />
              <p v-if="formErrors.maxMembers" class="mt-1 text-sm text-red-600">
                {{ formErrors.maxMembers }}
              </p>
            </div>
            <!-- 联系方式 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
              <textarea
                v-model="newProject.contactInfo"
                rows="3"
                placeholder="提供邮箱、微信、QQ等联系方式..."
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  formErrors.contactInfo ? 'border-red-300' : 'border-gray-300',
                ]"
                required
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="formErrors.contactInfo" class="text-sm text-red-600">
                  {{ formErrors.contactInfo }}
                </p>
                <p class="text-xs text-gray-500 ml-auto">{{ newProject.contactInfo.length }}/200</p>
              </div>
            </div>
          </div>

          <!-- 右侧：详细信息 -->
          <div class="space-y-6">
            <!-- 项目时间 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">开始时间</label>
                <input
                  v-model="newProject.startDate"
                  type="date"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.startDate ? 'border-red-300' : 'border-gray-300',
                  ]"
                  required
                />
                <p v-if="formErrors.startDate" class="mt-1 text-sm text-red-600">
                  {{ formErrors.startDate }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">预期结束时间</label>
                <input
                  v-model="newProject.endDate"
                  type="date"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.endDate ? 'border-red-300' : 'border-gray-300',
                  ]"
                  required
                />
                <p v-if="formErrors.endDate" class="mt-1 text-sm text-red-600">
                  {{ formErrors.endDate }}
                </p>
              </div>
            </div>
            <!-- 合作需求 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">合作需求</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="requirement in newProject.requirements"
                  :key="requirement"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {{ requirement }}
                  <button
                    type="button"
                    class="ml-1 text-green-600 hover:text-green-800"
                    @click="removeRequirement(requirement)"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="requirementInput"
                  type="text"
                  placeholder="输入合作需求后按回车添加"
                  :class="[
                    'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    formErrors.requirements ? 'border-red-300' : 'border-gray-300',
                  ]"
                  @keyup.enter="addRequirement"
                />
                <button
                  type="button"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  @click="addRequirement"
                >
                  添加
                </button>
              </div>
              <p v-if="formErrors.requirements" class="mt-1 text-sm text-red-600">
                {{ formErrors.requirements }}
              </p>
            </div>
            <!-- 项目描述 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
              <textarea
                v-model="newProject.description"
                rows="6"
                placeholder="详细描述项目背景、目标、研究内容等..."
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  formErrors.description ? 'border-red-300' : 'border-gray-300',
                ]"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="formErrors.description" class="text-sm text-red-600">
                  {{ formErrors.description }}
                </p>
                <p class="text-xs text-gray-500 ml-auto">{{ newProject.description.length }}/300</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            @click="$emit('close')"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            发布项目
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addProject } from '@/api/modules/project'

// Props
interface Props {
  visible: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  success: []
}>()

// 发布项目表单
const newProject = ref({
  title: '',
  description: '',
  fields: [] as string[],
  requirements: [] as string[],
  startDate: '',
  endDate: '',
  maxMembers: 5,
  contactInfo: '',
})
const fieldInput = ref('')
const requirementInput = ref('')

// 表单校验错误信息
const formErrors = ref({
  title: '',
  fields: '',
  maxMembers: '',
  contactInfo: '',
  startDate: '',
  endDate: '',
  description: '',
  requirements: '',
})

// 清除所有错误信息
const clearErrors = () => {
  formErrors.value = {
    title: '',
    fields: '',
    maxMembers: '',
    contactInfo: '',
    startDate: '',
    endDate: '',
    description: '',
    requirements: '',
  }
}

// 验证标题
const validateTitle = () => {
  if (!newProject.value.title.trim()) {
    formErrors.value.title = '项目标题不能为空'
    return false
  }
  if (newProject.value.title.length > 20) {
    formErrors.value.title = '项目标题不能超过20字'
    return false
  }
  formErrors.value.title = ''
  return true
}

// 验证研究领域
const validateFields = () => {
  if (newProject.value.fields.length === 0) {
    formErrors.value.fields = '请至少选择一个研究领域'
    return false
  }
  if (newProject.value.fields.length > 5) {
    formErrors.value.fields = '研究领域最多只能添加5个'
    return false
  }
  formErrors.value.fields = ''
  return true
}

// 验证团队规模
const validateMaxMembers = () => {
  const value = newProject.value.maxMembers
  if (!value || value < 2) {
    newProject.value.maxMembers = 2
    ElMessage.warning('团队规模最小为2人，已自动调整')
    return false
  }
  if (value > 50) {
    newProject.value.maxMembers = 50
    ElMessage.warning('团队规模最大为50人，已自动调整')
    return false
  }
  formErrors.value.maxMembers = ''
  return true
}

// 验证联系方式
const validateContactInfo = () => {
  if (!newProject.value.contactInfo.trim()) {
    formErrors.value.contactInfo = '联系方式不能为空'
    return false
  }
  if (newProject.value.contactInfo.length > 200) {
    formErrors.value.contactInfo = '联系方式不能超过200字'
    return false
  }
  formErrors.value.contactInfo = ''
  return true
}

// 验证时间
const validateDates = () => {
  if (!newProject.value.startDate) {
    formErrors.value.startDate = '请选择开始时间'
    return false
  }
  if (!newProject.value.endDate) {
    formErrors.value.endDate = '请选择结束时间'
    return false
  }

  const startDate = new Date(newProject.value.startDate)
  const endDate = new Date(newProject.value.endDate)

  if (endDate <= startDate) {
    formErrors.value.endDate = '结束时间不能早于或等于开始时间'
    return false
  }

  formErrors.value.startDate = ''
  formErrors.value.endDate = ''
  return true
}

// 验证项目描述
const validateDescription = () => {
  if (newProject.value.description.length > 300) {
    formErrors.value.description = '项目描述不能超过300字'
    return false
  }
  formErrors.value.description = ''
  return true
}

// 验证合作需求
const validateRequirements = () => {
  if (newProject.value.requirements.length > 5) {
    formErrors.value.requirements = '合作需求最多只能添加5个'
    return false
  }

  // 检查每个需求的长度
  for (const requirement of newProject.value.requirements) {
    if (requirement.length > 50) {
      formErrors.value.requirements = '单个合作需求不能超过50字'
      return false
    }
  }

  formErrors.value.requirements = ''
  return true
}

// 完整表单验证
const validateForm = () => {
  clearErrors()

  const validations = [
    validateTitle(),
    validateFields(),
    validateMaxMembers(),
    validateContactInfo(),
    validateDates(),
    validateDescription(),
    validateRequirements(),
  ]

  return validations.every(v => v)
}

// 添加研究领域
const addField = () => {
  const field = fieldInput.value.trim()
  if (!field) {
    ElMessage.warning('请输入研究领域')
    return
  }

  if (newProject.value.fields.includes(field)) {
    ElMessage.warning('该研究领域已存在')
    return
  }

  if (newProject.value.fields.length >= 5) {
    ElMessage.warning('研究领域最多只能添加5个')
    return
  }

  newProject.value.fields.push(field)
  fieldInput.value = ''
  formErrors.value.fields = ''
}

// 移除研究领域
const removeField = (field: string) => {
  const index = newProject.value.fields.indexOf(field)
  if (index > -1) {
    newProject.value.fields.splice(index, 1)
  }
}

// 添加合作需求
const addRequirement = () => {
  const requirement = requirementInput.value.trim()
  if (!requirement) {
    ElMessage.warning('请输入合作需求')
    return
  }

  if (requirement.length > 50) {
    ElMessage.warning('单个合作需求不能超过50字')
    return false
  }

  if (newProject.value.requirements.includes(requirement)) {
    ElMessage.warning('该合作需求已存在')
    return
  }

  if (newProject.value.requirements.length >= 5) {
    ElMessage.warning('合作需求最多只能添加5个')
    return
  }

  newProject.value.requirements.push(requirement)
  requirementInput.value = ''
  formErrors.value.requirements = ''
}

// 移除合作需求
const removeRequirement = (requirement: string) => {
  const index = newProject.value.requirements.indexOf(requirement)
  if (index > -1) {
    newProject.value.requirements.splice(index, 1)
  }
}

// 发布项目
const publishProject = async () => {
  // 表单验证
  if (!validateForm()) {
    ElMessage.error('请检查表单填写是否正确')
    return
  }

  try {
    // 准备API请求数据
    const projectData = {
      title: newProject.value.title.trim(),
      description: newProject.value.description.trim(),
      collaborationCondition: newProject.value.requirements.join(','), // 转换为逗号分隔的字符串
      researchArea: newProject.value.fields.join(','), // 转换为逗号分隔的字符串
      startTime: newProject.value.startDate + ' 00:00:00', // 添加时分秒
      endTime: newProject.value.endDate + ' 00:00:00', // 添加时分秒
      recruitNum: newProject.value.maxMembers,
      contact: newProject.value.contactInfo.trim(),
    }

    // 调用API
    await addProject(projectData)

    // 重置表单
    newProject.value = {
      title: '',
      description: '',
      fields: [],
      requirements: [],
      startDate: '',
      endDate: '',
      maxMembers: 5,
      contactInfo: '',
    }

    // 清空输入框
    fieldInput.value = ''
    requirementInput.value = ''

    // 清除错误信息
    clearErrors()

    // 触发成功事件
    emit('success')
  } catch (error) {
    console.error('发布项目失败:', error)
    ElMessage.error('发布项目失败，请稍后重试')
  }
}
</script>
