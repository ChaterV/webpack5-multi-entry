import Vue from 'vue'
import Index from '@/components/index/index'
import './index.scss'

import router from '@/router/index'

new Vue({
    router,
    render: h => h(Index)
}).$mount('#index')