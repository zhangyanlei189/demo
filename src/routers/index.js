import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('@/views/Wallet'),
      meta: {
        title: '钱包'
      }
    },
    {
      path: '/cash',
      name: 'cash',
      component: () => import('@/views/Cash'),
      meta: {
        title: '提现',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('@/views/Verify'),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/auth/:id',
      name: 'auth',
      component: () => import('@/views/Auth'),
      meta: {
        title: '上传截图'
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/Upload'),
      meta: {
        title: '上传截图'
      }
    },
    {
      path: '/rewardrecord',
      name: 'rewardrecord',
      component: () => import('@/views/Record'),
      meta: {
        title: '奖励记录'
      }
    },
    {
      path: '/authstatus',
      name: 'authstatus',
      component: () => import('@/views/Record'),
      meta: {
        title: '审核状态'
      }
    },
    {
      path: '/cashrecord',
      name: 'cashrecord',
      component: () => import('@/views/Record'),
      meta: {
        title: '提现记录'
      }
    },
    {
      path:'/*',
      redirect:'/wallet'
    },

  ]
});

router.beforeEach((to,from,next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

export default router;
