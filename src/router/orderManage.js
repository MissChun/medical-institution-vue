export default {
  path: 'orderManage',
  name: 'orderManage',
  // title:'订单管理',
  meta: {
    isVerificationL: true,
    title: '订单管理',
    iconName: 'icon-setting'
  },
  component: (resolve) => require(['../page/orderManage/orderManage'], resolve),
  children: [{
    path: 'physicalOrder',
    name: 'physicalOrder',
    meta: {
      title: '体检订单',
      isVerificationL: false
    },
    redirect: '/orderManage/physicalOrder/physicalOrderList',
    component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrder'], resolve),
    children: [{
      path: 'physicalOrderList',
      name: 'physicalOrderList',
      meta: {
        title: '体检订单列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrderList'], resolve)
    }, {
      path: 'physicalOrderEdit',
      name: 'physicalOrderEdit',
      meta: {
        title: '体检订单编辑',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrderEdit'], resolve)
    }, {
      path: 'physicalOrderDetail/:id',
      name: 'physicalOrderDetail',
      meta: {
        title: '体检订单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrderDetail'], resolve)
    }]
  }, {
    path: 'healthOrder',
    name: 'healthOrder',
    meta: {
      title: '健康管理订单',
      isVerificationL: false
    },
    redirect: '/orderManage/healthOrder/healthOrderList',
    component: (resolve) => require(['../page/orderManage/healthOrder/healthOrder'], resolve),
    children: [{
      path: 'healthOrderList',
      name: 'healthOrderList',
      meta: {
        title: '健康管理订单列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/healthOrder/healthOrderList'], resolve)
    }, {
      path: 'healthOrderEdit',
      name: 'healthOrderEdit',
      meta: {
        title: '健康管理订单编辑',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/healthOrder/healthOrderEdit'], resolve)
    }, {
      path: 'healthOrderDetail/:id',
      name: 'healthOrderDetail',
      meta: {
        title: '健康管理订单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/orderManage/healthOrder/healthOrderDetail'], resolve)
    }]
  }]
}
