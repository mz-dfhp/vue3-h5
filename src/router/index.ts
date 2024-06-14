import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'
import { modulesRoutes } from './moduleRoutes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/slide-demo2',
  },
  ...modulesRoutes,
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
