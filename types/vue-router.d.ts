// types/vue-router.d.ts
import 'vue-router'

export interface Meta {
  // 通用权限控制
  requiresAuth?: boolean // 是否需登录[1,7](@ref)
  permissionCodes?: string[] // 权限码列表（支持多级权限）[7](@ref)

  // SEO 优化
  title?: string // 页面标题（自动更新 document.title）[1](@ref)
  keywords?: string // 搜索引擎关键词
  description?: string // 页面描述

  // 页面级配置
  keepAlive?: boolean // 是否启用组件缓存
  transition?: string // 路由切换动画名称[5](@ref)

  // 业务定制
  menuIcon?: string // 菜单图标（支持 FontAwesome 类名）[7](@ref)
  hideInMenu?: boolean // 是否隐藏菜单项[7](@ref)
}

declare module 'vue-router' {
  interface RouteMeta extends Meta {}
}
