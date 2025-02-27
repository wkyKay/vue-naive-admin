export const basicRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页',
      layout: 'empty',
    },
  },

  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/prune/index.vue'),
    meta: {
      title: '首页',
    },
  },

  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '页面飞走了',
      layout: 'empty',
    },
  },

  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      title: '没有权限',
      layout: 'empty',
    },
  },
//我加的compression


  {
    name: 'compression',
    path: '/prune/setting/compression',
    component:() => import('@/views/prune/compression/compression.vue'),
    meta: {
      title: '压缩',
      layout: 'normal',
    }
  },

  {
    name: 'analysis',
    path: '/prune/setting/analysis',
    component:() => import('@/views/prune/components/analysis.vue'),
    meta: {
      title: '结果分析',
      layout: 'normal',
    }
  }
]
