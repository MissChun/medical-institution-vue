export default {
  path: 'userHealthManage',
  name: 'userHealthManage',
  meta: {
    isVerificationL: true,
    title: '用户健康管理',
    iconName: 'icon-date'
  },
  component: resolve =>
    require(['../page/userHealthManage/userHealthManage'], resolve),
  children: [
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '用户列表',
        isVerificationL: false
      },
      redirect: '/userHealthManage/user/userList',
      component: resolve =>
        require(['../page/userHealthManage/user/user'], resolve),
      children: [
        {
          path: 'userList',
          name: 'userList',
          meta: {
            title: '用户列表',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/userHealthManage/user/userList'], resolve)
        }
      ]
    }
  ]
}
