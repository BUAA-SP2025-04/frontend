<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden">
    <!-- 学术元素背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 书本图标 -->
      <div class="absolute top-20 left-10 opacity-[0.05] transform rotate-12 animate-fade-pulse">
        <svg class="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>
      
      <!-- 烧杯图标 -->
      <div class="absolute top-40 right-20 opacity-[0.04] transform -rotate-6 animate-fade-pulse-delay">
        <svg class="w-28 h-28 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9,2V7.38L4.06,16.11C3.8,16.61 4.17,17.23 4.73,17.23H19.27C19.83,17.23 20.2,16.61 19.94,16.11L15,7.38V2H9M11,4H13V7.38L14,9H10L11,7.38V4M8.5,11H15.5L16.5,13H7.5L8.5,11Z"/>
        </svg>
      </div>
      
      <!-- 望远镜图标 -->
      <div class="absolute bottom-32 left-20 opacity-[0.1] transform rotate-45 animate-fade-pulse-slow">
      <svg t="1751381075713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5509" width="200" height="200"><path d="M998.453213 578.067455l-72.874118-42.012837 8.298832-14.263617a51.089684 51.089684 0 0 0-18.802041-69.891725L333.509307 116.833938A51.867699 51.867699 0 0 0 337.140046 83.119933 51.867699 51.867699 0 0 0 312.762227 51.999314l-77.801549-45.124899a50.700676 50.700676 0 0 0-25.93385-6.87247A51.867699 51.867699 0 0 0 164.679946 26.065464L6.87247 299.148901a51.867699 51.867699 0 0 0-5.18677 38.900775A51.867699 51.867699 0 0 0 25.93385 369.040626l77.801549 45.124899a51.867699 51.867699 0 0 0 25.933849 6.87247 51.089684 51.089684 0 0 0 40.586475-20.74708l112.1639 64.834624a230.033247 230.033247 0 0 0 178.684224 220.437723V972.650978H281.511938a25.93385 25.93385 0 0 0 0 51.219353H691.137094a25.93385 25.93385 0 0 0 0-51.219353H511.934193V691.268708A222.901438 222.901438 0 0 0 622.412393 661.444781l128.761563 74.30048a50.960015 50.960015 0 0 0 25.93385 6.87247 50.571007 50.571007 0 0 0 44.346883-25.93385l8.298832-14.263617 72.744448 42.012836A51.219353 51.219353 0 0 0 972.519363 726.279406l44.99523-77.801549A51.089684 51.089684 0 0 0 998.453213 578.067455zM51.867699 324.304735L209.026828 51.999314l77.80155 45.124898L129.669248 369.818642z m460.066494 315.74462a178.035878 178.035878 0 0 1-173.756793-142.636173l230.033247 132.78131a171.552416 171.552416 0 0 1-56.276454 9.854863z m264.654936 51.8677L196.189573 356.33304l112.682577-195.281888 580.529225 335.195007z m151.064674 9.076847l-72.874117-42.012836 45.124898-77.801549L972.519363 622.544007z" fill="#5FC2DD" p-id="5510"></path></svg>
      </div>
      
      <!-- 原子图标 -->
      <div class="absolute top-80 right-40 opacity-[0.05] transform -rotate-12 animate-spin-gentle">
        <svg class="w-36 h-36 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z"/>
        </svg>
      </div>
      
      <!-- 齿轮图标 -->
      <div class="absolute bottom-1/2 right-1/3 opacity-[0.04] transform rotate-12 animate-spin-clockwise">
        <svg class="w-36 h-36 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      </div>
      
      <!-- 数学公式装饰 -->
      <div class="absolute top-1/2 left-10 opacity-[0.08] transform -rotate-6 -translate-y-1/2 ">
        <svg class="w-56 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 260 80">
          <text x="10" y="40" font-family="serif" font-size="48" font-style="italic" font-weight="bold">∑ƒ(x)dx</text>
          <text x="10" y="70" font-family="serif" font-size="32" font-weight="bold">∫ π = 3.14...</text>
        </svg>
      </div>
    </div>

    <!-- @ts-nocheck -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题和操作按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg class="w-8 h-8 mr-3 text-indigo-600" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            科研成果管理
          </h1>
          <p class="text-gray-600 mt-2">管理您的研究成果、发表论文和项目经历</p>
        </div>
        <div class="relative group">
          <!-- 悬停时展开的按钮组 -->
          <div
            class="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 flex -gap-0.5"
          >
            <el-button type="success" size="large" @click="showExcelImporter = true">
              <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v16h16V4H4zm4 4h8v8H8V8z"
                />
              </svg>
              批量导入
            </el-button>
            <el-button type="warning" size="large" @click="showClaimDialog = true">
              <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              成果认领
            </el-button>
          </div>
          <!-- 主按钮 -->
          <el-button type="primary" size="large" @click="showAddDialog = true">
            <svg class="w-5 h-5 mr-2" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            添加成果
          </el-button>
        </div>
      </div>

      <!-- 统计数据卡片组 -->
      <PublicationStatsCardGroup :stats="stats" />

      <!-- 筛选和搜索 -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <el-input
              v-model="searchQuery"
              placeholder="搜索论文标题、作者或关键词..."
              prefix-icon="Search"
              size="large"
            />
          </div>
          <el-select v-model="filterType" placeholder="类型筛选" size="large" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="期刊论文" value="journal" />
            <el-option label="会议论文" value="conference" />
            <el-option label="专利" value="patent" />
          </el-select>
          <el-input
            v-model="filterYear"
            placeholder="年份"
            maxlength="4"
            type="number"
            style="width: 120px"
          />
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="bg-white rounded-lg shadow">
        <el-table
          v-loading="loading"
          :data="filteredPublications"
          style="width: 100%"
          :default-sort="{ prop: 'year', order: 'descending' }"
          :show-select-all="false"
        >
          <el-table-column label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="getTypeColor(row.type)" size="small">
                {{ getTypeLabel(row.type) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="title" label="标题" min-width="300">
            <template #default="{ row }">
              <div
                class="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                @click="onShowInfo(row)"
              >
                {{ row.title }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="authors" label="作者" min-width="180">
            <template #default="{ row }">
              <span>{{ formatAuthors(row.authors) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="venue" label="发表于" width="200">
            <template #default="{ row }">
              <div class="text-gray-900">
                {{ row.venue ? row.venue : '暂无数据' }}
              </div>
              <div class="text-sm text-gray-500">
                {{ row.year ? row.year : '暂无数据' }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="readerNum" label="阅读量" width="100" sortable align="center">
            <template #default="{ row }">
              <div v-if="row.readerNum" class="font-semibold text-green-600">
                {{ row.readerNum }}
              </div>
              <div v-else class="text-green-600">-</div>
            </template>
          </el-table-column>

          <el-table-column prop="likeNum" label="点赞数" width="120" sortable align="center">
            <template #default="{ row }">
              <div v-if="row.likeNum" class="font-semibold text-blue-600">{{ row.likeNum }}</div>
              <div v-else class="text-gray-400">-</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusColor(row.status)" size="small">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <el-button size="small" @click="editPublication(row)">
                <svg class="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                <svg class="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加/编辑对话框 -->
      <el-dialog
        v-model="showAddDialog"
        :title="isEditing ? '编辑成果' : '添加成果'"
        width="60%"
        destroy-on-close
        @close="resetForm"
      >
        <el-form
          ref="formRef"
          :model="currentPublication"
          label-width="100px"
          class="space-y-4"
          :rules="rules"
        >
          <el-form-item label="类型" required>
            <el-select
              v-model="currentPublication.type"
              placeholder="请选择类型"
              style="width: 100%"
            >
              <el-option label="期刊论文" value="journal" />
              <el-option label="会议论文" value="conference" />
              <el-option label="专利" value="patent" />
            </el-select>
          </el-form-item>

          <el-form-item label="标题" prop="title" required>
            <el-input v-model="currentPublication.title" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item label="作者">
            <div>
              <el-tag :key="userName" type="info" disable-transitions style="margin-right: 4px">
                {{ userName }}
              </el-tag>
              <el-tag
                v-for="(tag, index) in authorTags"
                :key="tag.authorName"
                :closable="tag.authorId === 0"
                style="margin-right: 4px"
                @close="removeAuthorTag(index)"
              >
                {{ tag.authorName }}
              </el-tag>
              <div style="margin-top: 8px">
                <el-input
                  v-model="authorInput"
                  placeholder="输入作者名后回车添加"
                  style="width: 200px"
                  @keyup.enter="addAuthorTag"
                />
              </div>
            </div>
          </el-form-item>

          <el-form-item label="发表于">
            <el-input v-model="currentPublication.venue" placeholder="期刊/会议名称" />
          </el-form-item>

          <el-form-item label="年份">
            <el-input
              v-model="currentPublication.year"
              placeholder="请输入年份"
              maxlength="4"
              type="number"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="摘要">
            <el-input
              v-model="currentPublication.abstracts"
              type="textarea"
              :rows="4"
              placeholder="请输入摘要"
            />
          </el-form-item>

          <el-form-item label="关键词">
            <div>
              <template v-if="keywordTags.length > 0">
                <el-tag
                  v-for="(tag, index) in keywordTags"
                  :key="tag"
                  closable
                  class="mr-1 mb-1"
                  @close="removeKeywordTag(index)"
                >
                  {{ tag }}
                </el-tag>
                <div style="margin-top: 8px">
                  <el-input
                    v-model="keywordInput"
                    placeholder="输入关键词后回车添加"
                    style="width: 200px"
                    @keyup.enter="addKeywordTag"
                  />
                </div>
              </template>
              <template v-else>
                <el-input
                  v-model="keywordInput"
                  placeholder="输入关键词后回车添加"
                  style="width: 200px"
                  @keyup.enter="addKeywordTag"
                />
              </template>
            </div>
          </el-form-item>

          <el-form-item label="doi" prop="doi">
            <el-input v-model="currentPublication.doi" placeholder="数字对象标识符" />
          </el-form-item>

          <el-form-item label="pdfUrl" prop="pdfUrl">
            <div v-if="pdfInputType === 'url'" style="width: 100%">
              <el-input
                v-model="currentPublication.pdfUrl"
                placeholder="论文链接"
                style="width: 100%; height: 40px"
              />
            </div>
            <div v-else style="width: 100%">
              <el-upload
                class="upload-demo"
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handlePdfFileChange"
                :limit="1"
                :on-exceed="handlePdfExceed"
                accept="application/pdf"
                style="width: 100%; height: 40px; display: flex; align-items: center"
              >
                <el-button type="primary">选择PDF文件</el-button>
                <span v-if="pdfFile" class="ml-4 text-green-600">{{ pdfFile.name }}</span>
                <span v-else-if="oldFilePath" class="ml-2 text-green-600">已上传</span>
              </el-upload>
            </div>
            <div style="margin-top: 8px">
              <el-radio-group v-model="pdfInputType" size="small">
                <el-radio-button :value="'url'">链接</el-radio-button>
                <el-radio-button :value="'upload'">上传文件</el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="状态">
            <el-select
              v-model="currentPublication.status"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="已发表" value="published" />
              <el-option label="待发表" value="accepted" />
              <el-option label="审核中" value="under-review" />
              <el-option label="草稿" value="draft" />
            </el-select>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" :loading="saving" @click="handleSave">
              {{ isEditing ? '更新' : '保存' }}
            </el-button>
          </span>
        </template>
        <!-- 新增：上传文件后弹出隐私条款同意框 -->
        <el-dialog
          v-model="showPrivacyDialog"
          title="隐私条款"
          width="500px"
          :close-on-click-modal="false"
          :show-close="false"
        >
          <div style="max-height: 300px; overflow-y: auto">
            <p>请您在上传文件前仔细阅读并同意以下隐私条款：</p>
            <p>1. 您上传的文件仅用于本系统的学术出版物管理，不会用于其他用途。</p>
            <p>2. 您有权随时删除您上传的文件及相关数据。</p>
            <p>3. 我们承诺保护您的数据安全，不会将您的数据泄露给第三方。</p>
            <p class="text-red-600">请您确认您有权利公开分享此文档</p>
            <p>
              如您同意以上条款并确认您有此文档的公开权利，请点击“同意并确认”继续上传，否则请取消操作。
            </p>
          </div>
          <template #footer>
            <el-button @click="onCancelPrivacy">取消</el-button>
            <el-button type="primary" @click="onAgreePrivacy"> 同意并确认</el-button>
          </template>
        </el-dialog>
      </el-dialog>
      <PublicationDetailDialog
        v-model:visible="showInfo"
        :publication="shownPublication"
        :show-claim-button="false"
      />
      <ExcelImporter
        v-model:show-excel-importer="showExcelImporter"
        :existing-titles="publications.map(p => p.title)"
        :current-username="userStore.user?.name"
        @close="showExcelImporter = false"
        @upload-success="getPublicationData"
      />

      <!-- 成果认领对话框 -->
      <el-dialog
        v-model="showClaimDialog"
        v-loading="claimLoading"
        title="成果认领"
        width="60%"
        destroy-on-close
      >
        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-blue-800 font-medium mb-2">认领说明</h4>
            <p class="text-blue-700 text-sm">
              以下是系统中存在您可能参与但未关联到您账户的科研成果，说明如下：
            </p>
            <ul class="text-blue-700 text-sm mt-2 space-y-1">
              <li>• 推荐成果列表通过您的姓名进行匹配，请仔细核对</li>
              <li>
                • 如果成果中不存在属于您的成果，但您在其他科研人员详情页中发现了，请联系相应科研人员
              </li>
              <!-- <li>• 等待管理员审核确认</li> -->
            </ul>
          </div>

          <div v-if="claimResults.length > 0" class="mt-6">
            <h4 class="font-medium mb-3">推荐成果列表</h4>
            <div class="space-y-3">
              <div
                v-for="result in claimResults"
                :key="result.publication.id"
                class="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <h5 class="text-xl font-semibold text-gray-900">
                        {{ result.publication.title || '暂无标题' }}
                      </h5>
                      <el-tag :type="getTypeColor(result.publication.type)" size="small">
                        {{ getTypeLabel(result.publication.type) || '未知类型' }}
                      </el-tag>
                    </div>
                    <div class="space-y-1.5">
                      <p class="text-sm text-gray-600">
                        <span class="text-gray-500 font-medium">作者：</span>
                        {{ formatAuthors(result.authors) }}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="text-gray-500 font-medium">发表于：</span>
                        {{ result.publication.venue || '未知机构' }} ({{
                          result.publication.year || '未知年份'
                        }})
                      </p>
                      <div class="flex items-center space-x-4 text-xs text-gray-600 mt-8">
                        <span
                          ><span class="text-gray-500 font-medium">阅读量：</span
                          >{{ result.publication.readerNum || 0 }}</span
                        >
                        <span
                          ><span class="text-gray-500 font-medium">点赞数：</span
                          >{{ result.publication.likeNum || 0 }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <el-button size="small" @click="viewClaimDetail(result)"> 查看详情</el-button>
                    <el-button size="small" type="primary" @click="claimPublication(result)">
                      认领此成果
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <svg
              class="w-16 h-16 mx-auto text-gray-300 mb-4"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>暂未找到推荐给您的成果</p>
            <p class="text-sm mt-1">如果您认为有遗漏，请联系管理员</p>
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showClaimDialog = false">关闭</el-button>
            <el-button type="primary" :loading="claimLoading" @click="refreshClaimResults">
              刷新列表
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 成果详情弹窗 -->
      <PublicationDetailDialog
        v-model:visible="showClaimDetailDialog"
        :publication="selectedClaimPublication"
        :show-claim-button="true"
        @claim="claimPublication"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { UploadFile } from 'element-plus'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type {
  Author,
  Publication,
  PublicationDetail,
  PublicationProfile,
  PublicationStats,
  PublicationStatus,
  SavePublicationRequest,
} from '@/api/types/publication'
import {
  claimPublication as claimPublicationApi,
  deletePublication,
  deletePublicationFile,
  getProbablePublicationsByName,
  getPublicationsByUser,
  getPublicationStatsByUser,
  savePublication,
  updatePublicationFile,
  uploadPublicationFile,
} from '@/api/modules/publication'
import { useUserStore } from '@/stores/user'
import PublicationStatsCardGroup from '@/components/publication/PublicationStatsCardGroup.vue'
import ExcelImporter from '@/components/publication/ExcelImporter.vue'
import PublicationDetailDialog from '@/components/publication/PublicationDetailDialog.vue'
import type { UploadResponse } from '@/api/types/utils'
import { doiPattern, urlPattern } from '@/utils/publications'

const loading = ref(false)
const saving = ref(false)
const showAddDialog = ref(false)
const showInfo = ref(false)
const showExcelImporter = ref(false)
const showPrivacyDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterYear = ref('')
const showClaimDialog = ref(false)
const showClaimDetailDialog = ref(false)

// 成果认领相关变量
const claimLoading = ref(false)
const claimResults = ref<Publication[]>([])
const selectedClaimPublication = ref<PublicationDetail | null>(null)

const stats = reactive<PublicationStats>({
  totalPublicationNum: 0,
  totalReaderNum: 0,
  totalLikeNum: 0,
  totalProjectNum: 0,
})

const publications = reactive<PublicationDetail[]>([])

const emptyPublication: PublicationProfile = {
  type: 'journal',
  title: '',
  authors: null,
  venue: null,
  year: null,
  status: 'published',
  abstracts: null,
  keywords: null,
  doi: null,
  pdfUrl: null,
  isPublic: 1,
}
const currentPublication = reactive<PublicationProfile>(
  JSON.parse(JSON.stringify(emptyPublication))
)
const shownPublication = ref<PublicationDetail | null>(null)

const pdfInputType = ref<'url' | 'upload'>('url')
const pdfFile = ref<File | null>(null)
const oldFilePath = ref<string>('')
const formRef = ref<FormInstance>()

const userStore = useUserStore()
const userName = computed(() => userStore.user?.name || '')

// 转换函数：将Publication转换为PublicationDetail
const convertToPublicationDetail = (pub: Publication): PublicationDetail => {
  return {
    ...pub.publication,
    authors: pub.authors,
  }
}

const getPublicationData = async () => {
  if (userStore.user?.id) {
    loading.value = true
    try {
      const [pubRes, statsRes] = await Promise.all([
        getPublicationsByUser(userStore.user.id),
        getPublicationStatsByUser(userStore.user.id),
      ])
      if (Array.isArray(pubRes.data)) {
        publications.splice(0, publications.length)
        pubRes.data.forEach(item => {
          // 将 Publication 转换为 PublicationDetail
          const publicationDetail = convertToPublicationDetail(item)
          publications.push(publicationDetail)
        })
      }
      if (statsRes.data) {
        Object.assign(stats, statsRes.data)
      }
    } catch (err) {
      if (err instanceof Error) {
        ElMessage.error(`获取论文列表或统计数据失败：${err.message}`)
      } else {
        ElMessage.error('获取论文列表或统计数据失败：未知错误')
      }
    } finally {
      loading.value = false
    }
  }
}

onMounted(getPublicationData)

const rules: FormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 排除自身（编辑时）
        const duplicate = publications.some(
          item =>
            item.title.trim() === value.trim() &&
            (!isEditing.value || item.id !== currentPublication.id)
        )
        if (duplicate) {
          callback(new Error('标题已存在，请勿重复'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  doi: [
    {
      validator: (rule, value, callback) => {
        if (value && !doiPattern.test(value)) {
          callback(new Error('DOI 格式不正确'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  pdfUrl: [
    {
      validator: function (rule, value, callback) {
        if (pdfInputType.value === 'url') {
          if (value && !urlPattern.test(value)) {
            callback(new Error('URL 格式不正确'))
          } else {
            callback()
          }
        } else if (pdfInputType.value === 'upload') {
          if (!oldFilePath.value && !pdfFile.value) {
            callback(new Error('请上传PDF文件'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 作者字符串拼接工具
const filteredPublications = computed(() => {
  let result = publications as PublicationDetail[]

  if (searchQuery.value) {
    result = result.filter(
      (item: PublicationDetail) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.authors.some(
          (a: Author) =>
            a.authorName && a.authorName.toLowerCase().includes(searchQuery.value.toLowerCase())
        ) ||
        item.keywords?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterType.value) {
    result = result.filter((item: PublicationDetail) => item.type === filterType.value)
  }

  if (filterYear.value) {
    result = result.filter((item: PublicationDetail) => item.year?.toString() === filterYear.value)
  }

  return result
})

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    journal: 'success',
    conference: 'primary',
    patent: 'warning',
  }
  return colors[type] || 'default'
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    journal: '期刊',
    conference: '会议',
    patent: '专利',
  }
  return labels[type] || type
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    published: 'success',
    accepted: 'primary',
    'under-review': 'warning',
    draft: 'info',
  }
  return colors[status] || 'default'
}

const getStatusLabel = (status: PublicationStatus) => {
  const labels: Record<'published' | 'accepted' | 'under-review' | 'draft', string> = {
    published: '已发表',
    accepted: '待发表',
    'under-review': '审核中',
    draft: '草稿',
  }
  return labels[status]
}

const editPublication = (publication: PublicationDetail) => {
  isEditing.value = true
  oldFilePath.value = '' // 编辑时不保留旧路径
  Object.assign(currentPublication, publication)

  // 根据pdfUrl判断类型
  if (publication.pdfUrl && publication.pdfUrl.trim()) {
    if (/^https?:\/\//i.test(publication.pdfUrl.trim())) {
      pdfInputType.value = 'url'
    } else {
      pdfInputType.value = 'upload'
      oldFilePath.value = currentPublication.pdfUrl || ''
      currentPublication.pdfUrl = ''
    }
  } else {
    pdfInputType.value = 'url'
  }
  showAddDialog.value = true
}

const checkPdfSize = (file: File) => {
  const maxSize = 80 * 1024 * 1024
  if (file.size > maxSize) {
    ElMessage.error('PDF文件大小不能超过80MB')
    return false
  }
  return true
}

const handlePdfFileChange = (file: UploadFile) => {
  if (file.raw && file.raw.type !== 'application/pdf') {
    ElMessage.error('只能上传 PDF 文件')
    pdfFile.value = null
    return
  }
  // 手动调用大小校验
  if (file.raw && !checkPdfSize(file.raw)) {
    pdfFile.value = null
    return
  }
  pdfFile.value = file.raw ?? null
}

const handlePdfExceed = (files: File[]) => {
  if (files.length > 0) {
    pdfFile.value = files[files.length - 1]
  }
}

//处理URL
const handlePdfUrl = async (): Promise<string> => {
  if (pdfInputType.value === 'url') {
    if (oldFilePath.value) {
      // url类型且有旧文件，删除旧文件
      await deletePublicationFile(oldFilePath.value)
    }
    return currentPublication.pdfUrl ? currentPublication.pdfUrl : ''
  } else if (pdfInputType.value === 'upload') {
    if (!pdfFile.value) {
      if (oldFilePath.value) return oldFilePath.value
      // 如果没有新文件且没有旧文件，抛出异常
      throw new Error('请上传PDF文件')
    }
    let res: UploadResponse
    if (oldFilePath.value) {
      // upload类型且有旧文件，更新文件
      const formData = new FormData()
      formData.append('oldFilePath', oldFilePath.value) // 添加旧文件路径
      formData.append('file', pdfFile.value)
      res = await updatePublicationFile(formData)
    } else {
      // upload类型且无旧文件，上传文件
      const formData = new FormData()
      formData.append('file', pdfFile.value)
      res = await uploadPublicationFile(formData)
    }
    if (res.data) {
      return res.data
    } else {
      ElMessage.error('更新文件失败')
      return ''
    }
  }
  return ''
}

const submitSuccess = () => {
  loading.value = true
  getPublicationsByUser(userStore.user!.id)
    .then(res => {
      if (Array.isArray(res.data)) {
        publications.splice(0, publications.length)
        res.data.forEach(item => {
          const publication = { ...item.publication, authors: item.authors }
          publications.push(publication)
        })
      }
    })
    .finally(() => {
      loading.value = false
    })

  if (!isEditing.value) stats.totalPublicationNum = (stats.totalPublicationNum || 0) + 1
  resetForm()
  closeDialog()
}

const handleDelete = (id: number) => {
  ElMessageBox.confirm('确定要删除该成果吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      return deletePublication(id)
    })
    .then(() => {
      ElMessage.success('删除成功')
      const idx = publications.findIndex(item => item.id === id)
      if (idx !== -1) publications.splice(idx, 1)
      // 删除后刷新统计数据
      if (userStore.user?.id) {
        return getPublicationStatsByUser(userStore.user.id).then(res => {
          if (res.data) Object.assign(stats, res.data)
        })
      }
    })
    .catch(err => {
      if (err === 'cancel') return
      ElMessage.error(`删除失败：${err.message}`)
    })
}

const resetForm = () => {
  Object.assign(currentPublication, JSON.parse(JSON.stringify(emptyPublication)))
  authorInput.value = ''
  keywordInput.value = ''
  pdfInputType.value = 'url'
  pdfFile.value = null
  oldFilePath.value = ''
}

// 作者与类型 tag 输入相关
const authorTags = ref<{ authorName: string; authorId: number }[]>([])
const authorInput = ref('')
const keywordTags = ref<string[]>([])
const keywordInput = ref('')

// 添加作者 tag
function addAuthorTag() {
  const val = authorInput.value.trim()
  if (val && !authorTags.value.some(a => a.authorName === val) && val !== userName.value) {
    authorTags.value.push({ authorName: val, authorId: 0 })
  }
  authorInput.value = ''
}

// 删除作者 tag（只允许 authorId 为 0 的 tag 删除）
function removeAuthorTag(index: number) {
  if (authorTags.value[index].authorId === 0) {
    authorTags.value.splice(index, 1)
  }
}

// 添加关键词 tag
function addKeywordTag() {
  const val = keywordInput.value.trim()
  if (val && !keywordTags.value.includes(val)) {
    keywordTags.value.push(val)
  }
  keywordInput.value = ''
}

// 删除关键词 tag
function removeKeywordTag(index: number) {
  keywordTags.value.splice(index, 1)
}

// 打开对话框时初始化 tag
watch(
  () => showAddDialog.value,
  val => {
    if (val) {
      // 作者
      authorTags.value = []
      if (isEditing.value && Array.isArray(currentPublication.authors)) {
        ;(currentPublication.authors as Author[]).forEach(a => {
          if (a.authorName !== userName.value) {
            authorTags.value.push({ authorName: a.authorName, authorId: a.authorId ?? 0 })
          }
        })
      }
      // 关键词
      keywordTags.value = []
      if (isEditing.value && currentPublication.keywords) {
        const arr = currentPublication.keywords.split(',').map(k => k.trim())
        keywordTags.value = arr.filter(k => k !== '')
      }
    }
  }
)

// 保存前同步 tag 到 currentPublication
const handleSave = async () => {
  if (!formRef.value) return
  // authors
  currentPublication.authors = [userName.value, ...authorTags.value.map(a => a.authorName)].join(
    ','
  )
  // keywords
  currentPublication.keywords = keywordTags.value.join(',')
  formRef.value
    .validate()
    .then(() => {
      // 新增：格式校验后，添加 then 判断是否 upload，弹隐私条款
      if (pdfInputType.value === 'upload') {
        return new Promise((resolve, reject) => {
          showPrivacyDialog.value = true
          // 用户同意时调用 resolve，不同意时调用 reject
          agreePrivacyCallback.value = () => {
            showPrivacyDialog.value = false
            resolve(undefined)
          }
          rejectPrivacyCallback.value = () => {
            showPrivacyDialog.value = false
            reject('未同意隐私条款')
          }
        })
      }
      return Promise.resolve()
    })
    .then(async () => {
      saving.value = true
      // 先处理PDF相关操作
      currentPublication.pdfUrl = await handlePdfUrl() // 更新当前对象的pdfUrl
      if (pdfInputType.value === 'upload' && !currentPublication.pdfUrl) {
        ElMessage.error('文件上传失败')
        saving.value = false
        return Promise.reject('文件上传失败')
      }
      const payload: SavePublicationRequest = {
        ...currentPublication,
        year: currentPublication.year ? String(currentPublication.year) : null,
        isPublic: String(currentPublication.isPublic),
      }
      // PDF无异常再保存
      let urlApi = isEditing.value ? '/publication/update' : '/publication/add'
      //console.log(payload)
      return savePublication(urlApi, payload)
    })
    .then(() => {
      if (isEditing.value) ElMessage.success('更新成功')
      else ElMessage.success('添加成功')
      submitSuccess()
    })
    .catch(err => {
      let msg: string
      if (err && typeof err === 'object') {
        const keys = Object.keys(err)
        if (keys.length === 1 && Array.isArray(err[keys[0]])) {
          msg = err[keys[0]][0].message
        } else if ('message' in err) {
          msg = err.message
        } else {
          msg = JSON.stringify(err)
        }
      } else {
        msg = String(err)
      }
      ElMessage.error(`保存失败：${msg}`)
    })
    .finally(() => {
      saving.value = false
    })
}

function onShowInfo(row: PublicationDetail) {
  shownPublication.value = row
  showInfo.value = true
}

const closeDialog = () => {
  showAddDialog.value = false
}

const agreePrivacyCallback = ref<() => void>(() => {})
const rejectPrivacyCallback = ref<() => void>(() => {})

const onAgreePrivacy = () => {
  agreePrivacyCallback.value()
}
const onCancelPrivacy = () => {
  rejectPrivacyCallback.value()
}

// 成果认领相关方法
const loadClaimResults = async () => {
  if (!userStore.user?.name) {
    ElMessage.warning('用户信息获取失败')
    return
  }

  claimLoading.value = true
  try {
    const response = await getProbablePublicationsByName(userStore.user.name)
    if (response.data && Array.isArray(response.data)) {
      claimResults.value = response.data.filter(
        item => item.publication.uploaderId !== userStore.user?.id
      )
    } else {
      claimResults.value = []
    }
  } catch (error) {
    ElMessage.error('获取推荐成果失败')
    claimResults.value = []
  } finally {
    claimLoading.value = false
  }
}

const refreshClaimResults = () => {
  loadClaimResults()
}

const claimPublication = (publication: Publication | PublicationDetail) => {
  const title = 'publication' in publication ? publication.publication.title : publication.title
  const id = 'publication' in publication ? publication.publication.id : publication.id

  ElMessageBox.confirm(`确定要认领成果"${title}"吗？`, '确认认领', {
    confirmButtonText: '确定认领',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await claimPublicationApi(id)
        ElMessage.success('认领申请已提交')
        showClaimDialog.value = false
        // 从列表中移除已认领的成果
        claimResults.value = claimResults.value.filter(pub => pub.publication.id !== id)
      } catch (error) {
        ElMessage.error('认领失败，请稍后重试')
      }
    })
    .catch(() => {
      // 用户取消
    })
}

// 监听认领对话框打开，自动加载数据
watch(showClaimDialog, newVal => {
  if (newVal) {
    loadClaimResults()
  }
})

const viewClaimDetail = (publication: Publication) => {
  selectedClaimPublication.value = convertToPublicationDetail(publication)
  showClaimDetailDialog.value = true
}

const formatAuthors = (authors: Author[] | string): string => {
  if (!authors) {
    return '暂无数据'
  }

  // 如果authors是字符串，直接返回
  if (typeof authors === 'string') {
    return authors
  }

  // 如果authors是数组，提取authorName字段
  if (Array.isArray(authors)) {
    return authors
      .map((author: Author) => author.authorName)
      .filter(Boolean)
      .join(', ')
  }

  return '暂无数据'
}
</script>

<style scoped>
svg path {
  fill: none;
}

/* 悬停按钮组样式 */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:translate-x-0 {
  transform: translateX(0);
}

/* 确保按钮组在悬停时有正确的层级 */
.relative.group {
  z-index: 10;
}

.absolute.right-full {
  z-index: 20;
}
@keyframes fadePulse {
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.06; }
}

@keyframes fadePulseDelay {
  0%, 100% { opacity: 0.015; }
  50% { opacity: 0.04; }
}

@keyframes fadePulseSlow {
  0%, 100% { opacity: 0.025; }
  50% { opacity: 0.055; }
}

@keyframes fadePulseFast {
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.045; }
}

@keyframes fadePulseMedium {
  0%, 100% { opacity: 0.015; }
  50% { opacity: 0.035; }
}

@keyframes fadePulseUltraSlow {
  0%, 100% { opacity: 0.025; }
  50% { opacity: 0.065; }
}

@keyframes fadePulseDna {
  0%, 100% { opacity: 0.01; }
  50% { opacity: 0.035; }
}

/* 缓慢旋转动画 */
@keyframes spinGentle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 应用动画 */
.animate-fade-pulse {
  animation: fadePulse 8s ease-in-out infinite;
}

.animate-fade-pulse-delay {
  animation: fadePulseDelay 10s ease-in-out infinite 2s;
}

.animate-fade-pulse-slow {
  animation: fadePulseSlow 12s ease-in-out infinite 1s;
}

.animate-fade-pulse-fast {
  animation: fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-fade-pulse-medium {
  animation: fadePulseMedium 9s ease-in-out infinite 3s;
}

.animate-fade-pulse-ultra-slow {
  animation: fadePulseUltraSlow 15s ease-in-out infinite 4s;
}

.animate-fade-pulse-dna {
  animation: fadePulseDna 7s ease-in-out infinite 1.5s;
}

.animate-spin-gentle {
  animation: spinGentle 40s linear infinite;
}

.animate-spin-clockwise {
  animation: spinClockwise 35s linear infinite;
}

/* 组合动画 */
.animate-spin-gentle.animate-fade-pulse-fast {
  animation: spinGentle 40s linear infinite, fadePulseFast 6s ease-in-out infinite 0.5s;
}

.animate-spin-clockwise.animate-fade-pulse-medium {
  animation: spinClockwise 35s linear infinite, fadePulseMedium 9s ease-in-out infinite 3s;
}
</style>
