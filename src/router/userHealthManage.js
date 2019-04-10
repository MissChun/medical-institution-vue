export default {
  path: 'userHealthManage',
  name: 'userHealthManage',
  meta: {
    isVerificationL: true,
    title: '用户健康管理',
    iconName: 'icon-manage'
  },
  component: resolve =>
    require(['../page/userHealthManage/userHealthManage'], resolve),
  children: [
    {
      path: 'report',
      name: 'report',
      meta: {
        title: '体检数据',
        isVerificationL: false
      },
      redirect: '/userHealthManage/report/reportList',
      component: resolve =>
        require(['../page/userHealthManage/report/report'], resolve),
      children: [
        {
          path: 'reportList',
          name: 'reportList',
          meta: {
            title: '体检报告列表',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/userHealthManage/report/reportList'], resolve)
        },
        {
          path: 'reportDetail/:id',
          name: 'reportDetail',
          meta: {
            title: '体检报告详情',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/userHealthManage/report/reportDetail'], resolve)
        }
      ]
    }
  ]
}
