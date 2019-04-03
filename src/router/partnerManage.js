export default {
  path: 'partnerManage',
  name: 'partnerManage',
  meta: {
    isVerificationL: true,
    title: '合作方管理',
    iconName: 'icon-partner'
  },
  component: resolve =>
    require(['../page/partnerManage/partnerManage'], resolve),
  children: [
    {
      path: 'partner',
      name: 'partner',
      meta: {
        title: '合作方管理',
        isVerificationL: false
      },
      redirect: '/partnerManage/partner/partnerList',
      component: resolve =>
        require(['../page/partnerManage/partner/partner'], resolve),
      children: [
        {
          path: 'partnerList',
          name: 'partnerList',
          meta: {
            title: '合作方管理列表',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/partnerManage/partner/partnerList'], resolve)
        },
        {
          path: 'partnerEdit',
          name: 'partnerEdit',
          meta: {
            title: '合作方管理编辑',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/partnerManage/partner/partnerEdit'], resolve)
        },
        {
          path: 'partnerDetail/:id',
          name: 'partnerDetail',
          meta: {
            title: '合作方管理详情',
            isVerificationL: false
          },
          component: resolve =>
            require(['../page/partnerManage/partner/partnerDetail'], resolve)
        }
      ]
    },
    {
      path: 'partnerRating',
      name: 'partnerRating',
      meta: {
        title: '合作方评级',
        isVerificationL: false
      },
      redirect: '/partnerManage/partnerRating/partnerRatingList',
      component: resolve =>
        require(['../page/partnerManage/partnerRating/partnerRating'], resolve),
      children: [
        {
          path: 'partnerRatingList',
          name: 'partnerRatingList',
          meta: {
            title: '合作方评级列表',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/partnerManage/partnerRating/partnerRatingList'
            ], resolve)
        },
        {
          path: 'partnerRatingEdit/:id',
          name: 'partnerRatingEdit',
          meta: {
            title: '编辑合作方评级',
            isVerificationL: false
          },
          component: resolve =>
            require([
              '../page/partnerManage/partnerRating/partnerRatingEdit'
            ], resolve)
        }
      ]
    }
  ]
}
