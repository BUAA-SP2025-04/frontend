import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import { useUserStore } from './stores/user'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)

const userStore = useUserStore()
userStore.init()

app.mount('#app')
