import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

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