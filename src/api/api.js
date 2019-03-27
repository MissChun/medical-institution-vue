/**
 * @description 接口文档API,用于后端接口查询
 * @param
 *   url:后端接口url（必需）
 *   method:后端接口方法（必需）
 *   desc:后端接口描述 （可选）
 *   param:接口参数 （可选）
 *     desc:参数描述（可选）
 */

const api = {
  questionnaireList: {
    url: '/api/v1/question',
    method: 'get',
    desc: '问卷调查列表',
    param: {}
  },
  physicalDetail: {
    url: '/api/v1/report-detail/:id',
    method: 'get',
    desc: '体检报告详情',
    param: {}
  },
  physicalList: {
    url: '/api/v1/report-detail',
    method: 'get',
    desc: '体检报告列表',
    param: {}
  },
  addSigning: {
    url: '/api/v1/consumers',
    method: 'post',
    desc: '签约服务包',
    param: {}
  },
  consumersDetail: {
    url: '/api/v1/consumers/:id',
    method: 'get',
    desc: '客户详情',
    param: {}
  },
  consumersList: {
    url: '/api/v1/consumers',
    method: 'get',
    desc: '客户列表',
    param: {}
  },
  orderDetail: {
    url: '/api/v1/business-orders/:id',
    method: 'get',
    desc: '订单详情',
    param: {}
  },
  updateOrderStatus: {
    url: '/api/v1/order-status',
    method: 'patch',
    desc: '修改订单状态',
    param: {}
  },
  updateOrder: {
    url: '/api/v1/business-orders/:id',
    method: 'patch',
    desc: '修改订单',
    param: {}
  },
  orderStatusList: {
    url: '/api/v1/order-status',
    method: 'get',
    desc: '订单状态列表',
    param: {}
  },
  addOrder: {
    url: '/api/v1/business-orders',
    method: 'post',
    desc: '创建订单',
    param: {}
  },
  usersList: {
    url: '/api/v1/users',
    method: 'get',
    desc: '客户列表',
    param: {}
  },
  physicalOrderList: {
    url: '/api/v1/business-orders',
    method: 'get',
    desc: '体检订单列表',
    param: {}
  },
  servicePackDetail: {
    url: '/api/v1/service-packages/:id',
    method: 'get',
    desc: '服务包详情',
    param: {}
  },
  deleteServicePack: {
    url: '/api/v1/service-packages/:id',
    method: 'delete',
    desc: '删除服务包',
    param: {}
  },
  updateServicePack: {
    url: '/api/v1/service-packages/:id',
    method: 'patch',
    desc: '编辑服务包',
    param: {}
  },
  addServicePack: {
    url: '/api/v1/service-packages',
    method: 'post',
    desc: '新增服务包',
    param: {}
  },
  servicePackList: {
    url: '/api/v1/service-packages',
    method: 'get',
    desc: '服务包列表',
    param: {}
  },
  servicePackTypeList: {
    url: '/api/v1/package-types',
    method: 'get',
    desc: '服务包类型',
    param: {}
  },
  deleteProjectPrice: {
    url: '/api/v1/modify-price/:sub_project',
    method: 'delete',
    desc: '删除检查项价格',
    param: {}
  },
  updateProjectPrice: {
    url: '/api/v1/modify-price',
    method: 'patch',
    desc: '编辑检查项价格',
    param: {}
  },
  addProjectPrice: {
    url: '/api/v1/sub-projects/:id',
    method: 'post',
    desc: '新增检查项价格',
    param: {}
  },
  deleteProject: {
    url: '/api/v1/sub-projects/:id',
    method: 'delete',
    desc: '删除类别、小项',
    param: {}
  },
  getProjectDetail: {
    url: '/api/v1/sub-projects/:id',
    method: 'get',
    desc: '检查项详情',
    param: {}
  },
  getProjectList: {
    url: '/api/v1/sub-projects',
    method: 'get',
    desc: '检查项列表',
    param: {}
  },
  updateCategory: {
    url: '/api/v1/sub-projects/:id',
    method: 'patch',
    desc: '更新检查项类别',
    param: {}
  },
  addCategory: {
    url: '/api/v1/sub-projects',
    method: 'post',
    desc: '新增检查项类别',
    param: {}
  },
  associatedPartnersDetail: {
    url: '/api/v1/enterprises/:id',
    method: 'get',
    desc: '合作方详情',
    param: {}
  },
  associatedPartnersList: {
    url: '/api/v1/enterprise-partner/:enterpriseId',
    method: 'get',
    desc: '关联合作方列表',
    param: {}
  },
  associatedPartners: {
    url: '/api/v1/enterprise-partner/:enterpriseId',
    method: 'post',
    desc: '关联合作方',
    param: {}
  },
  updatePartner: {
    url: '/api/v1/enterprises/:id',
    method: 'patch',
    desc: '更新合作方',
    param: {}
  },
  addPartner: {
    url: '/api/v1/enterprises',
    method: 'post',
    desc: '新增合作方',
    param: {}
  },
  partnerTypeList: {
    url: '/api/v1/enterprise-types',
    method: 'get',
    desc: '合作方类型列表',
    param: {}
  },
  login: {
    url: '/api/v1/auth',
    method: 'post',
    notNeedToken: true,
    desc: '登录',
    param: {
      username: '用户名',
      password: '密码'
    }
  },
  register: {
    url: '/api/v1/register',
    method: 'post',
    notNeedToken: true,
    desc: '注册',
    param: {
      username: '用户名',
      password: '密码'
    }
  }
}

export default api
