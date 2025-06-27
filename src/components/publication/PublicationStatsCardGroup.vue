<script setup lang="ts">
import { defineProps } from 'vue'
import type { PublicationStats } from '@/api/types/publication'

const props = defineProps<{
  stats: PublicationStats
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-100">
          <svg class="w-6 h-6 text-blue-600" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ props.stats.totalPublicationNum }}</h3>
          <p class="text-gray-600">发表论文</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-green-100">
          <svg class="w-6 h-6 text-green-600" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ props.stats.totalReaderNum }}</h3>
          <p class="text-gray-600">总阅读量</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-purple-100">
          <svg class="w-6 h-6 text-purple-600" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ props.stats.totalLikeNum }}</h3>
          <p class="text-gray-600">总点赞数</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-yellow-100">
          <svg class="w-6 h-6 text-yellow-600" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17v-2a4 4 0 018 0v2M12 7a4 4 0 110 8 4 4 0 010-8z"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ props.stats.totalProjectNum }}</h3>
          <p class="text-gray-600">总项目数</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
svg path {
  fill: none;
}
</style>
