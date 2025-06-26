import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import Markdown from 'vue3-markdown-it'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Markdown) 

app.mount('#app')
