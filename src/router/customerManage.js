export default {
  path: 'customerManage',
  name: 'customerManage',
  meta: {
    isVerificationL: true,
    title: '客户健康管理',
    iconName: 'icon-setting'
  },
  component: resolve =>
    require(['../page/customerManage/customerManage'], resolve),
  children: [
    {
      path: 'customerList',
      name: 'customerList',
      meta: {
        title: '客户列表',
        isVerificationL: false
      },
      redirect: '/customerManage/customerList/customerList',
      component: resolve =>
        require(['../page/customerManage/customerList/customer'], resolve),
      children: [
        {
          path: 'customerList',
          name: 'customerList',
          meta: {
            title: '签约列表',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/customerManage/customerList/customerList'
            ], resolve)
        },
        {
          path: 'customerEdit/:id',
          name: 'customerEdit',
          meta: {
            title: '签约服务包',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/customerManage/customerList/customerEdit'
            ], resolve)
        }
      ]
    },
    {
      path: 'healthManage',
      name: 'healthManage',
      meta: {
        title: '健康管理列表',
        isVerificationL: false
      },
      redirect: '/customerManage/healthManage/healthManageList',
      component: resolve =>
        require(['../page/customerManage/healthManage/healthManage'], resolve),
      children: [
        {
          path: 'healthManageList',
          name: 'healthManageList',
          meta: {
            title: '用户列表',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/customerManage/healthManage/healthManageList'
            ], resolve)
        },
        {
          path: 'physical',
          name: 'physical',
          meta: {
            title: '体检',
            isVerificationL: false
          },
          redirect: '/customerManage/healthManage/physical/physicalList',
          component: resolve =>
            require([
              '../page/customerManage/healthManage/healthManage'
            ], resolve),
          children: [
            {
              path: 'physicalList/:id',
              name: 'physicalList',
              meta: {
                title: '体检列表',
                isVerificationL: false
              },
              component: resolve =>
                require([
                  '../page/customerManage/healthManage/physical/physicalList'
                ], resolve)
            },
            {
              path: 'physicalDetail/:id',
              name: 'physicalDetail',
              meta: {
                title: '体检详情',
                isVerificationL: false
              },
              component: resolve =>
                require([
                  '../page/customerManage/healthManage/physical/physicalDetail'
                ], resolve)
            }
          ]
        },
        {
          path: 'questionnaire',
          name: 'questionnaire',
          meta: {
            title: '问卷',
            isVerificationL: false
          },
          redirect:
            '/customerManage/healthManage/questionnaire/questionnaireList',
          component: resolve =>
            require([
              '../page/customerManage/healthManage/healthManage'
            ], resolve),
          children: [
            {
              path: 'questionnaireList/:id',
              name: 'questionnaireList',
              meta: {
                title: '问卷列表',
                isVerificationL: false
              },
              component: resolve =>
                require([
                  '../page/customerManage/healthManage/questionnaire/questionnaireList'
                ], resolve)
            }
          ]
        }
      ]
    }
  ]
}
