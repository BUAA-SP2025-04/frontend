import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const showAuthDialog = ref(false)
  return { showAuthDialog }
})
