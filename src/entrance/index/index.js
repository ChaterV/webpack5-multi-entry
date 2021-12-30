import { createApp } from 'vue'
import Index from '@/components/index/index'
import router from '@/router/index'
import '@/css/common.scss'
import '@/css/tw.scss'

const app = createApp(Index)
app.use(router)
app.mount('#app')