import orderManage from './orderManage' // 订单管理
import partnerManage from './partnerManage' // 合作方管理
import businessData from './businessData' // 业务数据
import userHealthManage from './userHealthManage' // 用户健康管理

export default [
  {
    path: '',
    name: 'index',
    redirect: '/orderManage',
    component: resolve => require(['../page/MainFirst'], resolve),
    meta: {
      title: '首页'
    },
    children: [orderManage, userHealthManage, businessData, partnerManage]
  }
]
