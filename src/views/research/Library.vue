<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            文献库
          </h1>
          <p class="text-gray-600 mt-2">管理和组织您的研究文献资料</p>
        </div>
        <div class="flex space-x-3">
          <el-button @click="showUploadDialog = true">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            上传文献
          </el-button>
          <el-button type="primary" @click="showFolderDialog = true">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            新建分类
          </el-button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类树 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0H8v0z"
                />
              </svg>
              文献分类
            </h3>

            <div class="space-y-2">
              <div
                v-for="folder in folders"
                :key="folder.id"
                :class="[
                  'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 group',
                  selectedFolder === folder.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700',
                ]"
                @click="selectFolder(folder.id)"
                @drop="handleDrop($event, folder.id)"
                @dragover.prevent
                @dragenter.prevent
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ folder.name }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {{ folder.count }}
                  </span>
                  <el-dropdown trigger="click" @command="handleFolderAction">
                    <button class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`edit-${folder.id}`">重命名</el-dropdown-item>
                        <el-dropdown-item :command="`delete-${folder.id}`" divided>删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>

            <!-- 标签云 -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">热门标签</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in popularTags"
                  :key="tag.name"
                  :class="[
                    'px-2 py-1 text-xs rounded-full cursor-pointer transition-colors',
                    selectedTags.includes(tag.name)
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                  @click="toggleTag(tag.name)"
                >
                  {{ tag.name }} ({{ tag.count }})
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧文献列表 -->
        <div class="lg:w-3/4">
          <!-- 搜索和筛选 -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <el-input
                  v-model="searchQuery"
                  placeholder="搜索文献标题、作者或关键词..."
                  prefix-icon="Search"
                  size="large"
                />
              </div>
              <el-select v-model="sortBy" placeholder="排序方式" size="large" style="width: 150px">
                <el-option label="添加时间" value="date" />
                <el-option label="标题" value="title" />
                <el-option label="作者" value="author" />
                <el-option label="引用数" value="citations" />
              </el-select>
              <el-select v-model="viewMode" size="large" style="width: 120px">
                <el-option label="列表视图" value="list" />
                <el-option label="卡片视图" value="card" />
              </el-select>
            </div>
          </div>

          <!-- 文献列表 -->
          <div v-if="viewMode === 'list'" class="bg-white rounded-lg shadow">
            <div
              v-for="paper in filteredPapers"
              :key="paper.id"
              :class="[
                'p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer',
                selectedPapers.includes(paper.id) ? 'bg-blue-50' : '',
              ]"
              :draggable="true"
              @dragstart="handleDragStart($event, paper)"
              @click="togglePaperSelection(paper.id)"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-16 bg-red-100 rounded flex items-center justify-center">
                    <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3
                    class="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {{ paper.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ paper.authors.join(', ') }}
                  </p>
                  <!-- <p class="text-sm text-gray-500 mt-1">{{ paper.journal }} • {{ paper.year }}</p> -->

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="tag in paper.tags"
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="mt-3 flex items-center text-sm text-gray-500 space-x-4">
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h3z"
                        />
                      </svg>
                      引用: {{ paper.citations }}
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      阅读: {{ paper.readCount }}
                    </span>
                    <span class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ formatDate(paper.publishDate) }}
                    </span>
                  </div>
                </div>

                <div class="flex-shrink-0">
                  <el-dropdown trigger="click" @command="handlePaperAction">
                    <button class="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`read-${paper.id}`">
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          阅读
                        </el-dropdown-item>
                        <el-dropdown-item :command="`download-${paper.id}`">
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          下载
                        </el-dropdown-item>
                        <el-dropdown-item :command="`edit-${paper.id}`">
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                            />
                          </svg>
                          编辑
                        </el-dropdown-item>
                        <el-dropdown-item :command="`delete-${paper.id}`" divided>
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>

          <!-- 卡片视图 -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="paper in filteredPapers"
              :key="paper.id"
              class="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
              :draggable="true"
              @dragstart="handleDragStart($event, paper)"
              @click="togglePaperSelection(paper.id)"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div
                    class="w-10 h-12 bg-red-100 rounded flex items-center justify-center flex-shrink-0"
                  >
                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <el-checkbox
                    :model-value="selectedPapers.includes(paper.id)"
                    @change="togglePaperSelection(paper.id)"
                  />
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ paper.title }}
                </h3>

                <p class="text-sm text-gray-600 mb-2">
                  {{ paper.authors.slice(0, 2).join(', ') }}
                  <span v-if="paper.authors.length > 2">等</span>
                </p>

                <!-- <p class="text-sm text-gray-500 mb-3">{{ paper.journal }} • {{ paper.year }}</p> -->

                <div class="flex flex-wrap gap-1 mb-4">
                  <span
                    v-for="tag in paper.tags.slice(0, 3)"
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>引用 {{ paper.citations }}</span>
                  <span>{{ formatDate(paper.publishDate) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="filteredPapers.length"
              layout="prev, pager, next"
              background
            />
          </div>
        </div>
      </div>

      <!-- 上传文献对话框 -->
      <el-dialog v-model="showUploadDialog" title="上传文献" width="50%">
        <!-- <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          :auto-upload="false"
          :on-change="handleFileChange"
          accept=".pdf"
          multiple
        >
          <div class="el-upload__text">
            <svg
              class="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">支持 PDF 格式，单文件大小不超过50MB</div>
          </template>
        </el-upload> -->
        <div class="upload-section">
          <el-upload
            class="upload-demo"
            drag
            :auto-upload="false"
            :on-change="handleFileChange"
            :show-file-list="false"
            accept=".pdf,.doc,.docx"
            :limit="1"
            :on-exceed="handleExceed"
            ref="uploadRef"
            v-show="!currentFile"
          >
            <div class="upload-area">
              <div class="upload-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#4299e1">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
              </div>
              <div class="upload-text">将文件拖到此处，或<span>点击上传</span></div>
              <div class="upload-tip">支持 PDF、DOC、DOCX 格式，单文件大小不超过50MB</div>
            </div>
          </el-upload>

          <div v-if="currentFile" class="file-info">
            <i class="el-icon-document"></i>
            <div class="file-info-content">
              <div><strong>文件名：</strong> {{ currentFile.name }}</div>
            </div>
            <span class="file-delete-btn" @click="removeFile">
              <i class="el-icon-delete"></i>
            </span>
            
            <div class="file-actions" v-if="currentFile">
              <button class="action-btn delete" @click="removeFile">
                <i class="el-icon-delete"></i> 删除文件
              </button>
            </div>
          </div>
          
        </div>
        
        <div class="form-section">
          <el-form ref="paperForm" :model="newPaper" label-width="120px">
            <el-form-item label="文献标题" required>
              <el-input v-model="newPaper.title" placeholder="请输入文献标题" />
            </el-form-item>
            <el-form-item label="期刊" required>
              <el-input v-model="newPaper.journal" placeholder="请输入期刊名称" />
            </el-form-item>

            <el-form-item label="作者" required>
              <el-input 
                v-model="authorInput" 
                placeholder="输入作者姓名后按回车添加"
                @keyup.enter="newPaper.authors.push(authorInput); authorInput=''"
                clearable
              ></el-input>
              <div class="tag-container">
                <div v-for="(author, index) in newPaper.authors" :key="index" class="tag">
                  {{ author }}
                  <span class="tag-remove" @click="removeAuthor(index)">×</span>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="发表日期" required>
              <el-date-picker
                v-model="newPaper.publishDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="引用次数" required>
              <el-input-number 
                v-model="newPaper.citations" 
                :min="0" 
                :precision="0" 
                controls-position="right"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="阅读次数" required>
              <el-input-number 
                v-model="newPaper.readCount" 
                :min="0" 
                :precision="0" 
                controls-position="right"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="标签">
              <el-input 
                v-model="tagInput" 
                placeholder="输入标签后按回车添加"
                @keyup.enter="newPaper.tags.push(tagInput); tagInput=''"
                clearable
              ></el-input>
              <div class="tag-container">
                <div v-for="(tag, index) in newPaper.tags" :key="index" class="tag">
                  {{ tag }}
                  <span class="tag-remove" @click="removeTag(index)">×</span>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="所属分类" required>
            <el-select v-model="newPaper.folderName" placeholder="请选择分类" style="width:100%">
              <el-option 
                v-for="folder in folders" 
                :key="folder.id" 
                :label="folder.name" 
                :value="folder.name"
              >
                <div style="display: flex; justify-content: space-between;">
                  <span>{{ folder.name }}</span>
                  <span style="color: #718096; font-size: 13px;">{{ folder.count }} 篇</span>
                </div>
              </el-option>
            </el-select>
            </el-form-item>

            <label class="required">文献链接</label>
              <div class="url-container">
                <div class="url-display">{{ newPaper.url || '文件上传后自动生成URL' }}</div>
              </div>
          </el-form>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showUploadDialog = false; resetNewPaper()">取消</el-button>
            <el-button type="primary" @click="handleUpload">上传</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 新建分类对话框 -->
      <el-dialog v-model="showFolderDialog" title="新建分类" width="30%">
        <el-form :model="newFolder" label-width="80px">
          <el-form-item label="分类名称" required>
            <el-input v-model="newFolder.name" placeholder="请输入分类名称" />
          </el-form-item>
          <!-- <el-form-item label="描述">
            <el-input
              v-model="newFolder.description"
              type="textarea"
              placeholder="请输入分类描述"
            />
          </el-form-item> -->
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showFolderDialog = false; newFolder.name = ''">取消</el-button>
            <el-button type="primary" @click="createFolder">创建</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 重命名分类对话框 -->
      <el-dialog v-model="showFolderRenameDialog" title="重命名分类" width="30%">
        <el-form :model="newFolder" label-width="80px">
          <el-form-item label="分类名称" required>
            <el-input v-model="newFolder.name" placeholder="请输入分类名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showFolderRenameDialog = false; newFolder.name = ''">取消</el-button>
            <el-button type="primary" @click="renameFolder">重命名</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

const searchQuery = ref('')
const selectedFolder = ref('all')
const selectedTags = ref<string[]>([])
const selectedPapers = ref<number[]>([])
const sortBy = ref('date')
const viewMode = ref('list')
const currentPage = ref(1)
const pageSize = 20
const showUploadDialog = ref(false)
const showFolderDialog = ref(false)
const showFolderRenameDialog = ref(false)

const userStore = useUserStore()
const userId = computed(() => userStore.user?.id)

const folders = ref([
  { id: 'all', name: '全部文献', count: 156 },
  { id: 'ai', name: '人工智能', count: 45 },
  { id: 'ml', name: '机器学习', count: 32 },
  { id: 'cv', name: '计算机视觉', count: 28 },
  { id: 'nlp', name: '自然语言处理', count: 21 },
  { id: 'reading', name: '待阅读', count: 18 },
  { id: 'favorites', name: '收藏夹', count: 12 },
])

const popularTags = ref([
  { name: '深度学习', count: 68 },
  { name: '神经网络', count: 45 },
  { name: '卷积神经网络', count: 32 },
  { name: 'Transformer', count: 28 },
  { name: '注意力机制', count: 24 },
  { name: '图神经网络', count: 19 },
  { name: '强化学习', count: 16 },
])

const papers = ref([
  {
    id: 1,
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
    journal: 'NIPS',
    citations: 50000,
    readCount: 1250,
    tags: ['Transformer', '注意力机制', '自然语言处理'],
    folderId: 'nlp',
    publishDate: new Date('2024-01-15'),
    url: 'https://example.com/paper1.pdf',
  },
  {
    id: 2,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee'],
    journal: 'NAACL',
    citations: 35000,
    readCount: 980,
    tags: ['BERT', 'Transformer', '预训练'],
    folderId: 'nlp',
    publishDate: new Date('2024-01-20'),
    url: 'https://example.com/paper2.pdf',
  },
  // 更多模拟数据...
])

const newFolder = reactive({
  name: '',
  // description: '',
})

let renameFolderId = ''

const currentFile = ref(null);
const uploadRef = ref(null);

const newPaper = reactive({
  title: '',
  authors: [] as string[], 
  journal: '',
  citations: 0,
  readCount: 0,
  tags: [] as string[], 
  folderName: '',
  publishDate: new Date(),
  url: '',
})
const authorInput = ref('');
const tagInput = ref('');

const filteredPapers = computed(() => {
  let result = papers.value

  if (selectedFolder.value !== 'all') {
    result = result.filter(paper => paper.folderId === selectedFolder.value)
  }

  if (searchQuery.value) {
    result = result.filter(
      paper =>
        paper.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        paper.authors.some(author =>
          author.toLowerCase().includes(searchQuery.value.toLowerCase())
        ) ||
        paper.tags.some(tag => tag.includes(searchQuery.value))
    )
  }

  if (selectedTags.value.length > 0) {
    result = result.filter(paper => selectedTags.value.some(tag => paper.tags.includes(tag)))
  }

  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'author':
        return a.authors[0].localeCompare(b.authors[0])
      case 'citations':
        return b.citations - a.citations
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    }
  })

  return result
})

const selectFolder = (folderId: string) => {
  selectedFolder.value = folderId
  currentPage.value = 1
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const togglePaperSelection = (paperId: number) => {
  const index = selectedPapers.value.indexOf(paperId)
  if (index > -1) {
    selectedPapers.value.splice(index, 1)
  } else {
    selectedPapers.value.push(paperId)
  }
}

const handleDragStart = (event: DragEvent, paper: any) => {
  event.dataTransfer?.setData('application/json', JSON.stringify(paper))
}

const handleDrop = (event: DragEvent, folderId: string) => {
  event.preventDefault()
  const paperData = event.dataTransfer?.getData('application/json')
  if (paperData) {
    const paper = JSON.parse(paperData)
    movePaperToFolder(paper.id, folderId)
  }
}

const movePaperToFolder = (paperId: number, folderId: string) => {
  const paper = papers.value.find(p => p.id === paperId)
  if (paper) {
    paper.folderId = folderId
    ElMessage.success('文献已移动到新分类')
  }
}

const handlePaperAction = (command: string) => {
  const [action, id] = command.split('-')
  const paperId = parseInt(id)

  switch (action) {
    case 'read':
      window.open(`/pdf-reader?id=${paperId}`, '_blank')
      break
    case 'download':
      downloadPaper(paperId)
      break
    case 'edit':
      editPaper(paperId)
      break
    case 'delete':
      deletePaper(paperId)
      break
  }
}

const handleFolderAction = (command: string) => {
  const [action, id] = command.split('-')

  switch (action) {
    case 'edit':
      editFolder(id)
      break
    case 'delete':
      deleteFolder(id)
      break
  }
}

const downloadPaper = (paperId: number) => {
  const paper = papers.value.find(p => p.id === paperId)
  if (paper?.url) {
    window.open(paper.url, '_blank')
    ElMessage.success('开始下载文献')
  }
}

const editPaper = (paperId: number) => {
  ElMessage.info('编辑功能开发中...')
}

const deletePaper = async (paperId: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文献吗？', '确认删除', {
      type: 'warning',
    })
    papers.value = papers.value.filter(p => p.id !== paperId)
    ElMessage.success('删除成功')
  } catch {
    // 用户取消
  }
}

const editFolder = async (folderId: string) => {
  if (folderId == 'all') {
    ElMessage.error('"全部文献"分类无法重命名')
  } else {
    renameFolderId = folderId
    showFolderRenameDialog.value = true
  }
}

const renameFolder = async() => {
  if (!newFolder.name.trim()) {
    ElMessage.error('请输入分类名称')
    return
  } else {
    let containsName = false
    folders.value.forEach(folder => {
      if (folder.name == newFolder.name && folder.id != renameFolderId) {
        containsName = true
      }
    })
    if (containsName) {
      ElMessage.error('分类名称重复')
      return
    }
  }

  folders.value.forEach(folder => {
    if (folder.id == renameFolderId) {
      folder.name = newFolder.name
    }
  })

  newFolder.name = ''
  showFolderRenameDialog.value = false
  ElMessage.success('分类重命名成功')
}

const deleteFolder = async (folderId: string) => {
  if (folderId == 'all') {
    ElMessage.error('"全部文献"分类无法删除')
  } else try {
    await ElMessageBox.confirm('确定要删除这个分类吗？文献将移动到"全部文献"分类。', '确认删除', {
      type: 'warning',
    })
    folders.value = folders.value.filter(f => f.id !== folderId)
    // 将文献移动到"全部文献"
    papers.value.forEach(paper => {
      if (paper.folderId === folderId) {
        paper.folderId = 'all'
      }
    })
    ElMessage.success('删除成功')
  } catch {
    // 用户取消
  }
}

const createFolder = () => {
  if (!newFolder.name.trim()) {
    ElMessage.error('请输入分类名称')
    return
  }

  folders.value.push({
    id: Date.now().toString(),
    name: newFolder.name,
    count: 0,
  })

  newFolder.name = ''
  // newFolder.description = ''
  showFolderDialog.value = false
  ElMessage.success('分类创建成功')
}

const handleFileChange = (file: any) => {
  if (file && file.raw) {
    currentFile.value = file.raw;
    
    // 自动填充标题（去除扩展名）
    const fileName = file.name;
    const dotIndex = fileName.lastIndexOf('.');
    newPaper.title = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;
    
    // 生成文件URL并填充
    const fileUrl = URL.createObjectURL(file.raw);
    newPaper.url = fileUrl;
  }
}

const handleUpload = async () => {
  if(!newPaper.title.trim() && newPaper.authors.length>0 && !newPaper.journal.trim() && !newPaper.url.trim() 
        && !newPaper.folderName.trim() && !newPaper.publishDate && !newPaper.citations && !newPaper.readCount) {
      try {
        await ElMessageBox.confirm('确定要上传这些信息？', '确认上传', {
          type: 'warning',
        })
        let folderId = '';
        folders.value.forEach(folder => {
          if (folder.name === newPaper.folderName) {
            folderId = folder.id
          }
        })
        papers.value.push({
          id: Date.now(),
          title: newPaper.title,
          authors: [...newPaper.authors],
          journal: newPaper.journal,
          citations: newPaper.citations,
          readCount: newPaper.readCount,
          tags: [...newPaper.tags],
          folderId: folderId,
          publishDate: newPaper.publishDate,
          url: newPaper.url,
        })
        ElMessage.success('文献上传成功')
        showUploadDialog.value = false
        resetNewPaper()
      } catch {
        // 用户取消
      }
  } else {
    ElMessage.error('请填写所有必填信息')
  }
}

const handleExceed = () => {
  ElMessage.warning('一次只能上传一个文件');
};
const removeFile = () => {
  if (uploadRef.value) {
    uploadRef.value.clearFiles();
  }
  currentFile.value = null;
  newPaper.url = '';
  newPaper.title = '';
  ElMessage.info('已移除上传的文件');
};

const removeAuthor = (index: number) => {
  newPaper.authors.splice(index, 1);
};
const removeTag = (index: number) => {
  newPaper.tags.splice(index, 1);
};

const resetNewPaper = () => {
  newPaper.title = ''
  newPaper.authors = []
  newPaper.journal = ''
  newPaper.citations = 0
  newPaper.readCount = 0
  newPaper.tags = []
  newPaper.folderName = ''
  newPaper.publishDate = new Date()
  currentFile.value = null;
  newPaper.url = '';
  newPaper.title = '';
  authorInput.value = '';
  tagInput.value = '';
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

onMounted(() => {
  // 初始化数据
})
</script>


<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tag {
  background: #4299e1;
  color: white;
  padding: 2px 8px;
  border-radius: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.tag:hover {
  background: #3182ce;
  transform: translateY(-1px);
}
.tag-remove {
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.file-info {
  margin-bottom: 15px;
  padding: 15px;
  background: #ebf8ff;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.file-info-content {
  flex-grow: 1;
}
.action-btn.delete {
  position: central;
  top: 8px;
  right: 8px;
  cursor: pointer;
  color: #e53e3e;
  font-size: 18px;
  transition: transform 0.2s;
}
.file-delete-btn:hover {
  transform: scale(1.2);
}

.upload-demo {
  padding: 0;
  margin: 20px 0;
}
.upload-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ebf8ff;
  border-radius: 50%;
  color: #4299e1;
}
.upload-area {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  background: #f7fafc;
}
.upload-text {
  margin: 15px 0;
  color: #4a5568;
  font-size: 16px;
}
.upload-text em {
  color: #4299e1;
  font-style: normal;
  font-weight: 600;
}
.upload-tip {
  color: #718096;
  font-size: 14px;
  margin-top: 8px;
}

</style>
