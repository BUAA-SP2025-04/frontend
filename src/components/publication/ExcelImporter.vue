<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import * as XLSX from 'xlsx'
import type { PublicationProfile } from '@/api/types/publication'
import { doiPattern, urlPattern } from '@/utils/publications'

const props = defineProps<{
  showExcelImporter: boolean
  existingTitles: string[]
  currentUsername: string | undefined
}>()
const emit = defineEmits(['update:showExcelImporter'])

const publicationProfiles = ref<PublicationProfile[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const showDialog = ref(props.showExcelImporter) // 新增：控制弹窗显示

watch(
  () => props.showExcelImporter,
  val => {
    showDialog.value = val
  }
)
watch(showDialog, val => {
  emit('update:showExcelImporter', val)
})

function handleFileChange(file: File) {
  const reader = new FileReader()
  reader.onload = e => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    publicationProfiles.value = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
  }
  reader.readAsArrayBuffer(file)
}
</script>

<template>
  <el-dialog v-model="showDialog" title="批量导入出版物" width="800px">
    <el-upload
      ref="fileInput"
      class="block mb-2"
      drag
      :show-file-list="false"
      accept=".xlsx,.xls"
      :before-upload="handleFileChange"
    >
      <div style="display: flex; justify-content: center; align-items: center">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <path
            d="M645.071238 97.52381L828.952381 281.258667V414.47619h48.761905v390.095239h-48.761905v48.761904a73.142857 73.142857 0 0 1-73.142857 73.142857H268.190476a73.142857 73.142857 0 0 1-73.142857-73.142857v-48.761904H146.285714V414.47619h48.761905V170.666667a73.142857 73.142857 0 0 1 73.142857-73.142857h376.880762zM755.809524 804.571429H268.190476v48.761904h487.619048v-48.761904z m-190.366476-292.571429a72.167619 72.167619 0 0 0-24.990477 3.998476c-7.216762 2.657524-13.312 6.314667-18.236952 10.971429a45.494857 45.494857 0 0 0-11.166476 16.505905c-2.486857 6.339048-3.754667 13.165714-3.754667 20.48 0 13.360762 3.657143 24.283429 10.947048 32.768 7.314286 8.484571 19.017143 15.798857 35.181714 21.991619 5.144381 1.999238 9.411048 3.900952 12.775619 5.705142 3.364571 1.80419 6.046476 3.632762 8.045714 5.510096 1.999238 1.852952 3.413333 3.803429 4.169143 5.802666a17.017905 17.017905 0 0 1 1.194667 6.265905 13.970286 13.970286 0 0 1-4.388571 9.703619 16.530286 16.530286 0 0 1-5.705143 3.437714 23.113143 23.113143 0 0 1-8.143238 1.292191c-13.653333 0-27.233524-3.559619-40.764953-10.727619l-5.802666-3.291429-11.142096 32.353524c9.849905 5.87581 19.69981 10.24 29.500953 13.04381 9.776762 2.80381 20.772571 4.193524 32.914285 4.193523 8.874667 0 16.969143-1.243429 24.259048-3.779047a49.688381 49.688381 0 0 0 30.671238-27.916191 55.344762 55.344762 0 0 0 4.291048-22.186666c0-6.753524-0.78019-12.824381-2.364953-18.236953a39.814095 39.814095 0 0 0-8.045714-14.750476 60.099048 60.099048 0 0 0-15.018667-12.288 138.288762 138.288762 0 0 0-23.478857-10.776381c-9.313524-3.31581-15.847619-6.656-19.626666-10.020571-3.803429-3.388952-5.705143-7.021714-5.705143-10.898286 0-3.730286 1.706667-6.89981 5.168762-9.508571 3.413333-2.56 8.216381-3.85219 14.384762-3.852191 6.582857 0 12.629333 0.633905 18.212571 1.950476 3.730286 0.853333 7.558095 1.950476 11.459048 3.340191l5.924571 2.243047 8.777143-31.890285a104.643048 104.643048 0 0 0-22.723048-8.289524 111.542857 111.542857 0 0 0-26.819047-3.145143z m-291.352381 4.315429H228.815238l44.617143 83.870476-49.127619 87.527619h45.909333l33.036191-62.537143 33.060571 62.512762h45.909333l-49.127619-87.527619 44.617143-83.870476h-45.275428l-29.184 59.294476-29.159619-59.270095z m157.476571 0h-42.910476v171.398095h108.568381v-34.499048H431.542857v-136.899047z m247.808 0h-45.275428l44.617142 83.870476-49.127619 87.527619h45.909334l33.060571-62.537143 33.036191 62.512762H787.504762l-49.127619-87.527619 44.617143-83.870476h-45.275429l-29.159619 59.294476-29.184-59.270095zM581.412571 170.642286L268.190476 170.666667v243.809523h487.619048v-49.956571h-174.372572L581.412571 170.666667z m73.142858 39.740952v80.993524h81.042285l-81.042285-80.993524z"
            fill="#1296db"
          ></path>
        </svg>
      </div>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">仅支持 .xlsx, .xls 文件</div>
      </template>
    </el-upload>
    <div v-if="publicationProfiles.length">
      <el-table :data="publicationProfiles" style="width: 100%" size="small" border>
        <el-table-column
          v-for="key in Object.keys(publicationProfiles[0])"
          :key="key"
          :prop="key"
          :label="key"
          min-width="200"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <div style="word-break: break-word; white-space: normal">
              <!-- 确保内容换行 -->
              <template v-if="key === 'title'">
                <span v-if="!row[key]" style="color: red">未检测到标题</span>
                <span v-else-if="props.existingTitles.includes(row[key])" style="color: red"
                  >标题重复: {{ row[key] }}</span
                >
                <span v-else>{{ row[key] }}</span>
              </template>
              <template v-else-if="key === 'authors'">
                <span v-if="!row[key]">未检测到作者</span>
                <span
                  v-else-if="
                    !(Array.isArray(row[key]) ? row[key].join(',') : row[key]).includes(
                      props.currentUsername
                    )
                  "
                  style="color: orange"
                  >未包含当前用户({{ props.currentUsername }}): {{ row[key] }}</span
                >
                <span v-else>{{ row[key] }}</span>
              </template>
              <template v-else-if="key === 'doi'">
                <span v-if="!row[key] || doiPattern.test(row[key])" style="color: green">{{
                  row[key]
                }}</span>
                <span v-else style="color: red">格式错误: {{ row[key] }}</span>
              </template>
              <template v-else-if="key === 'pdfUrl'">
                <span v-if="!row[key] || urlPattern.test(row[key])" style="color: green">{{
                  row[key]
                }}</span>
                <span v-else style="color: red">格式错误: {{ row[key] }}</span>
              </template>
              <template v-else>
                {{ row[key] }}
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button @click="showDialog = false">关闭</el-button>
    </template>
  </el-dialog>
</template>
