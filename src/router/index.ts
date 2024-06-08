import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/slide',
  },
  {
    path: '/slide',
    name: 'Slide',
    component: () => import('@/views/slide.vue'),
    meta: {
      title: '滑动',
    },
  },
  {
    path: '/slide-demo',
    name: 'slide-demo',
    component: () => import('@/views/slide.demo.vue'),
    meta: {
      title: '滑动',
    },
  },
  {
    path: '/waterfall',
    name: 'Waterfall',
    component: () => import('@/views/waterfall.vue'),
    meta: {
      title: '瀑布',
    },
  },
]

const router = createRouter({
  history: import.meta.env.MODE === 'github-io' ? createWebHashHistory() : createWebHistory(),
  routes,
})

createRouterPermissions(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
