import { createRouter, createWebHistory } from "vue-router"

// 定义路由
const routes = [
  {
    path: "/",
    name: "index",
    component: () => import('@/page/index.vue'),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import('@/page/dashboard.vue')
      },
      {
        path: "/site-manage",
        name: "site-manage",
        component: () => import('@/page/site-manage.vue')
      },
      {
        path: "/system-manage",
        name: "system-manage",
        component: () => import('@/page/system/system-manage.vue')
      },
      {
        path: "/site-meta-manage",
        name: "site-meta-manage",
        component: () => import('@/page/system/site-meta-manage.vue')
      },
    ]
  },
]

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(), // history 模式
  routes,
})

export default router
