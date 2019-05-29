import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Util from './../utils/api'


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
      path: '/verify/:id',
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

  console.log(from);
  console.log('ssss');
  // localStorage.setItem("openid","o-FbYjtm-uxOe9SkiGjrf4DoGG20");
    var openid = localStorage.getItem("openid");
    var reg = new RegExp("(^|&)openid=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    if(!openid && (r && decodeURIComponent(r[2]) == openid)){
      // localStorage.setItem("openid",decodeURIComponent(r[2]));
      next();
    }else {
      axios.get(Util.baseUrl+"laxin/checklogin?wx_openid="+(openid?openid:""))
          .then((res)=>{
            console.log(res);
            console.log('dddddd');
            if(res.data.code == 1){
              localStorage.setItem("openid",res.data.data);
              if (to.meta.title) {
                document.title = to.meta.title
              }
              next();
            }else if (res.data.code == 2) {
              location.href = res.data.data;
            }
          })
          .catch((err)=>{
            console.log(err)
          });
    }

  return false;




  // next();
});

export default router;
