import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/aaa',
            component: () => import('@/components/index/section1')
        },
        {
            path: '/bbb',
            component: () => import('@/components/index/section2')
        }
    ]
})