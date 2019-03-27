<style scoped lang="less">
.index-header-He {
  height: 60px;
}
</style>
<template>
  <div v-if="type==='loginAfter'">
    <login-after-header :users="users" :logout="logout" :is-collapse="isCollapse"></login-after-header>
  </div>
  <div v-else-if="type==='index'" class="index-header-He">
    <index-header :users="users" :logout="logout" :login-link="loginLink" :app-url="appUrl"></index-header>
  </div>
  <div v-else-if="type==='error'">
    <public-header :users="users" :logout="logout"></public-header>
  </div>
</template>
<script>
import loginAfterHeader from '@/components/common/loginAfterHeader'
import indexHeader from '@/components/indexHeader'
import publicHeader from '@/components/publicHeader'
// import { getDomainUrl } from '@/api/index'
export default {
  name: 'commonHeader',
  props: {
    type: String,
    appUrl: Object,
    loginLink: Function,
    isCollapse: Boolean
  },
  components: {
    loginAfterHeader: loginAfterHeader,
    indexHeader: indexHeader,
    publicHeader: publicHeader
  },
  computed: {
    users: function() {
      return this.pbFunc.getLocalData('users', true)
    }
  },
  created() {
    // let vm = this;
    // let currentUrl = document.location.href.toString();
    // let domainUrl = getDomainUrl();
    // if (this.users && this.users.id) {
    //   this.wsMsg = new WebSocket('ws://' + domainUrl + '/ws/web/notifications/' + this.users.id + '/');
    // }
  },
  data: function() {
    return {
      wsMsg: null
    }
  },

  methods: {
    isLogin() {
      if (this.users && this.users.nick_name) {
        // this.$router.push({ path: '/dashboard/dispatchDashboard' });
        this.loginLink()
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    logout: function() {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.wsMsg.close()
          this.$$http('signOut', {})
            .then(results => {
              if (results.data && results.data.code === 0) {
                this.$message({
                  message: '退出成功',
                  type: 'success'
                })

                // growingio 发送用户name
                let currentUrl = document.location.href.toString()
                if (
                  currentUrl.match(`tms.91lng.cn`) &&
                  !currentUrl.match(`ptms.91lng.cn`) &&
                  !currentUrl.match(`testtms.91lng.cn`)
                ) {
                  // 正式环境
                  // eslint-disable-next-line
                  gio('clearUserId')
                }
              }
            })
            // eslint-disable-next-line
            .catch(err => {
              // this.$message.error('退出失败');
            })

          localStorage.clear()
          this.$router.push({ path: '/login' })
        })
        .catch(() => {})
    }
  }
}
</script>
