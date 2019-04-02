import orderManage from './orderManage' // 订单管理
import partnerManage from './partnerManage' // 合作方管理
import businessData from './businessData' // 业务数据

export default [
  {
    path: '',
    name: 'index',
    redirect: '/orderManage',
    component: resolve => require(['../page/MainFirst'], resolve),
    meta: {
      title: '首页'
    },
    children: [orderManage, businessData, partnerManage]
  }
]
