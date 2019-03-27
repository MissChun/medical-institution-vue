<style scoped lang="less">
</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page" @keyup.enter="login">
      <div v-if="isResetSuccess">
        <div class="user-page-title">找回密码</div>
        <el-form
          class="user-form"
          label-width="95px"
          :rules="resetRules"
          :model="ruleForm"
          ref="ruleForm"
          status-icon
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              :autofocus="true"
              placeholder="请输入注册手机号"
              v-model.trim="ruleForm.phone"
              name="email"
            ></el-input>
          </el-form-item>
          <el-form-item label="短信验证码" prop="message_verify_code">
            <el-row>
              <el-col :span="14">
                <el-input
                  placeholder="请输入验证码"
                  type="text"
                  v-model.trim="ruleForm.message_verify_code"
                  class="vaInput"
                ></el-input>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-button
                  class="get-code-btn"
                  style
                  v-on:click="getMsgCode"
                  type="primary"
                  :loading="msgBtn.isLoading"
                  :disabled="msgBtn.isDisabled"
                >{{msgBtn.getCodeText}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input placeholder="请输入密码" type="password" v-model.trim="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input
              placeholder="请再次输入密码"
              type="password"
              v-model.trim="ruleForm.confirm_password"
            ></el-input>
          </el-form-item>
          <div class="user-page-btn">
            <el-form-item>
              <el-button
                @click="resetPassword"
                type="success"
                :loading="submitBtn.isLoading"
                :disabled="submitBtn.isDisabled"
              >{{submitBtn.btnText}}</el-button>
            </el-form-item>
            <el-form-item>
              已有账号，请
              <span v-on:click="toLoginPage" class="text-blue cursor-pointer">登录</span>
            </el-form-item>
          </div>
          <div class="user-page-img">
            <img class="img-left" src="../assets/img/user_6.png">
          </div>
        </el-form>
      </div>
      <div v-if="!isResetSuccess">
        <div class="user-page-title">找回密码</div>
        <div class="user-register-notice password">
          您的密码已重置成功，请使用新密码登录！
          <br>
          <span class="text-blue time">{{loginTime}}</span>S 后自动返回登录页面
          <br>如没有自动跳转，请点击
          <span class="text-blue" v-on:click="toLoginPage">登录</span>
          <br>
        </div>
        <div class="btn-link">
          <el-button type="success" @click="toLoginPage">登录</el-button>
        </div>
        <div class="user-page-img text-center">
          <img src="../assets/img/user_3.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHeader from '../components/publicHeader'
// 登录
export default {
  components: {
    publicHeader: publicHeader
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/)) {
        callback()
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback(
          new Error(
            '密码长度6-16位，支持数字、字母、字符（除空格）,至少包含2种'
          )
        )
      }
    }
    // var validateNum = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('验证码不能为空'))
    //   } else {
    //     if (value !== this.vaPhoneNum) {
    //       callback(new Error('验证码错误，请重新输入'))
    //     }
    //   }
    // }
    var validateConfirmPass = (rule, value, callback) => {
      if (value === this.ruleForm.password) {
        callback()
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback(new Error('两次输入的密码不一致，请重新输入'))
      }
    }
    return {
      ruleForm: {
        phone: '',
        message_verify_code: '',
        password: '',
        confirm_password: ''
      },
      loginTime: 5,
      times: 60,
      isResetSuccess: true,
      resetRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号码不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置新登录密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请再次输入你的密码', trigger: 'blur' },
          { validator: validateConfirmPass, trigger: 'blur' }
        ],
        message_verify_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '输入4位验证码', trigger: 'blur' }
          // { validator: validateNum, trigger: 'blur' },
        ]
      },
      msgBtn: {
        getCodeText: '获取验证码',
        isLoading: false,
        isDisabled: false
      },
      submitBtn: {
        btnText: '重置密码',
        isLoading: false,
        isDisabled: false
      }
    }
  },
  computed: {},
  methods: {
    resetbBtnText() {
      if (this.submitBtn.isLoading) {
        return '重置中...'
      } else {
        return '重置密码'
      }
    },
    loginLink() {
      let times = this.loginTime
      let intCountdown
      const countdown = () => {
        this.loginTime = times
        if (times >= 1) {
          times--
        } else {
          this.$router.push({ path: '/login' })
          clearInterval(intCountdown)
        }
      }
      intCountdown = setInterval(countdown, 1000)
    },
    resetPassword() {
      this.submitBtn.isDisabled = true
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.submitBtn.isLoading = true
          this.submitBtn.btnText = this.resetbBtnText()
          this.$$http('forgetPassword', this.ruleForm)
            .then(results => {
              this.submitBtn.isLoading = false
              this.submitBtn.isDisabled = false
              this.submitBtn.btnText = this.resetbBtnText()
              if (results.data && results.data.code === 0) {
                this.$message({
                  message: '修改密码成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.loginLink()
                  this.isResetSuccess = false
                }, 3000)
              }
            })
            // eslint-disable-next-line
            .catch(err => {
              this.submitBtn.isLoading = true
            })
        } else {
          this.submitBtn.isDisabled = false
        }
      })
    },
    toForgetPassword() {},
    toLoginPage() {
      this.$router.push({ path: '/login' })
    },
    getMsgCode() {
      let times = this.times
      let intCountdown
      if (this.ruleForm.phone) {
        const countdown = () => {
          this.msgBtn.getCodeText = times + 's'
          if (times >= 1) {
            times--
          } else {
            this.msgBtn.getCodeText = '发送验证码'
            this.msgBtn.isDisabled = false
            clearInterval(intCountdown)
          }
        }
        this.msgBtn.isLoading = true
        this.msgBtn.isDisabled = true
        this.msgBtn.getCodeText = '发送中...'
        this.$$http('messageVerifyCode', {
          phone: this.ruleForm.phone,
          method_type: 'reset_password'
        })
          .then(results => {
            if (results.data && results.data.code === 0) {
              setTimeout(() => {
                this.msgBtn.getCodeText = times + 's'
                this.$message({
                  message: '短信发送成功，请查看',
                  type: 'success'
                })
                intCountdown = setInterval(countdown, 1000)
              }, 1000)
            } else {
              this.msgBtn.isDisabled = false
            }
            this.msgBtn.isLoading = false
          })
          // eslint-disable-next-line
          .catch(err => {
            this.msgBtn.isLoading = false
            this.msgBtn.isDisabled = false
          })
      } else {
        this.$message.error('请输入手机号码')
      }
    }
  },

  created() {
    sessionStorage.clear()
  }
}
</script>
