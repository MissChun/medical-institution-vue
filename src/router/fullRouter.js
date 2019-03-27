import orderManage from './orderManage' // 订单管理
import customerManage from './customerManage' // 健康客户管理
import partnerManage from './partnerManage' // 合作方管理
import servicePackageManage from './servicePackageManage' // 服务包管理

export default [{
  path: '',
  name: 'index',
  redirect: '/orderManage',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [
    orderManage,
    customerManage,
    partnerManage,
    servicePackageManage
  ]
}]
