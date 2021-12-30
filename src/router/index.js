import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/section1'
    },
    {
        path: '/section1',
        component: () => import('@/components/index/section1')
    },
    {
        path: '/section2',
        component: () => import('@/components/index/section2')
    },
    {
        path: '/section3',
        component: () => import('@/components/index/section3')
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router