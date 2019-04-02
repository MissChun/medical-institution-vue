export default {
  path: 'businessData',
  name: 'businessData',
  meta: {
    isVerificationL: true,
    title: '业务数据',
    iconName: 'icon-date'
  },
  component: resolve => require(['../page/businessData/businessData'], resolve),
  children: [
    {
      path: 'physicalSales',
      name: 'physicalSales',
      meta: {
        title: '体检销售',
        isVerificationL: false
      },
      redirect: '/businessData/physicalSales/physicalSalesList',
      component: resolve =>
        require(['../page/businessData/physicalSales/physicalSales'], resolve),
      children: [
        {
          path: 'physicalSalesList',
          name: 'physicalSalesList',
          meta: {
            title: '体检销售业务',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/businessData/physicalSales/physicalSalesList'
            ], resolve)
        }
      ]
    },
    {
      path: 'healthOutsource',
      name: 'healthOutsource',
      meta: {
        title: '健康管理服务外包',
        isVerificationL: false
      },
      redirect: '/businessData/healthOutsource/healthOutsourceList',
      component: resolve =>
        require([
          '../page/businessData/healthOutsource/healthOutsource'
        ], resolve),
      children: [
        {
          path: 'healthOutsourceList',
          name: 'healthOutsourceList',
          meta: {
            title: '健康管理外包业务',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/businessData/healthOutsource/healthOutsourceList'
            ], resolve)
        }
      ]
    }
  ]
}
