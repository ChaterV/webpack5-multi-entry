import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/aaa',
        component: () => import('@/components/index/section1')
    },
    {
        path: '/bbb',
        component: () => import('@/components/index/section2')
    },
    {
        path: '/ccc',
        component: () => import('@/components/index/section3')
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router