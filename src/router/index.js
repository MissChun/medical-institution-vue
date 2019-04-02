import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let baseRoute = [
  {
    path: '/',
    name: '首页',
    component: resolve => require(['../page/login.vue'], resolve)
  },
  {
    path: '/login',
    name: '登录',
    component: resolve => require(['../page/login.vue'], resolve)
  },
  {
    path: '/register',
    name: '注册',
    component: resolve => require(['../page/register.vue'], resolve)
  },
  // {
  //   path: '/registerCompany',
  //   name: '企业信息',
  //   component: (resolve) => require(['../page/registerCompany.vue'], resolve)
  // },{
  //   path: '/registerSuccess',
  //   name: '待审核',
  //   component: (resolve) => require(['../page/registerSuccess.vue'], resolve)
  // },
  {
    path: '/forgetPassword',
    name: '找回密码',
    component: resolve => require(['../page/forgetPassword.vue'], resolve)
  },
  {
    path: '/401',
    name: '无权访问',
    component: resolve => require(['../page/common/401.vue'], resolve)
  },
  {
    path: '/404',
    name: '找不到页面',
    component: resolve => require(['../page/common/404.vue'], resolve)
  },
  {
    path: '/imgReview',
    name: '图片预览',
    component: resolve => require(['../page/common/imgReview.vue'], resolve)
  }
]
let router = new Router({
  routes: baseRoute
})
router.beforeEach((to, from, next) => {
  let routeName = to.meta.title || to.name
  window.document.title = routeName || ''
  next()
})

export default router
