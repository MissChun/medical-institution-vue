export default {
  path: 'servicePackageManage',
  name: 'servicePackageManage',
  meta: {
    isVerificationL: true,
    title: '服务包管理',
    iconName: 'icon-setting'
  },
  component: (resolve) => require(['../page/servicePackageManage/servicePackageManage'], resolve),
  children: [{
    path: 'healthServicePackage',
    name: 'healthServicePackage',
    meta: {
      title: '健康服务包',
      isVerificationL: false
    },
    redirect: '/servicePackageManage/healthServicePackage/servicePackList',
    component: (resolve) => require(['../page/servicePackageManage/healthServicePackage/healthServicePackage'], resolve),
    children: [{
      path: 'servicePackList',
      name: 'servicePackList',
      meta: {
        title: '健康服务包列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/servicePackageManage/healthServicePackage/servicePackList'], resolve)
    }, {
      path: 'servicePackEdit/:type/:typeId',
      name: 'servicePackEdit',
      meta: {
        title: '编辑健康服务包',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/servicePackageManage/healthServicePackage/servicePackEdit'], resolve)
    }, {
      path: 'servicePackDetail/:id',
      name: 'servicePackDetail',
      meta: {
        title: '健康服务包详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/servicePackageManage/healthServicePackage/servicePackDetail'], resolve)
    }]
  }, {
    path: 'experienceProjectManage',
    name: 'experienceProjectManage',
    meta: {
      title: '体检项目管理',
      isVerificationL: false
    },
    redirect: '/servicePackageManage/experienceProjectManage/experienceProjectList',
    component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/experienceProjectManage'], resolve),
    children: [{
      path: 'experienceProjectList',
      name: 'experienceProjectList',
      meta: {
        title: '体检项目管理列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/experienceProjectList'], resolve)
    }, {
      path: 'settlementPriceEdit/:id',
      name: 'settlementPriceEdit',
      meta: {
        title: '设置结算价',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/settlementPriceEdit'], resolve)
    }]
  }]
}
