<style scoped lang="less">
</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page" @keyup.enter="onSubmit">
      <div class="user-page-title">注册</div>
      <el-form
        :model="registerForm"
        ref="registerForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="user-form"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model.trim="registerForm.username" type="text" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm_password">
          <el-input v-model="registerForm.confirm_password" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号码：" prop="phone">
          <el-input v-model.trim="registerForm.phone" type="text" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>-->
        <el-form-item label="验证码：" prop="verify_code">
          <el-row>
            <el-col :span="14">
              <el-input v-model.trim="registerForm.verify_code" type="text" placeholder="请输入验证码"></el-input>
            </el-col>
            <!-- <el-col :span="9" :offset="1"><img :src="verifyCodeData.image_code_path" width="100%" height="32" v-on:click="refreshVaImg"></el-col> -->
          </el-row>
        </el-form-item>
        <!-- <el-form-item label="短信验证码：" prop="message_verify_code">
          <el-row>
            <el-col :span="14">
              <el-input v-model.trim="registerForm.message_verify_code" type="text" placeholder="请输入验证码" class="verify-code-input"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button class="get-code-btn" type="primary" @click="getMsgCode" :loading="msgBtn.isLoading" :disabled="msgBtn.isDisabled">{{msgBtn.getCodeText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>-->
        <div class="user-page-btn">
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :loading="submitBtn.isLoading"
              :disabled="submitBtn.isDisabled"
              class="float-right"
            >{{submitBtn.btnText}}</el-button>
          </el-form-item>
          <el-form-item>
            已有账号，请
            <span class="text-blue cursor-pointer" v-on:click="toLoginPage">登录</span>
          </el-form-item>
        </div>
        <div class="user-page-img">
          <img src="../assets/img/user_6.png">
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import publicHeader from '../components/publicHeader'
export default {
  components: {
    publicHeader: publicHeader
  },
  data() {
    // const checkPhone = (rule, value, callback) => {
    //   if (this.registerForm.phone) {
    //     callback()
    //   } else {
    //     callback(new Error('请输入手机号码'))
    //   }
    // }
    const checkRepassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致，请重新输入'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback()
      }
    }
    const isSpace = (rule, value, callback) => {
      if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback()
      }
    }
    // const checkImgCode = (rule, value, callback) => {
    //   if (value.toUpperCase() != this.verifyCodeData.verify_code) {
    //     callback(new Error('验证码错误，请重新输入'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      times: 60, // 短信验证码时间
      registerForm: {
        username: '',
        password: '',
        // phone: '',
        confirm_password: '',
        verify_code: ''
        // verify_key: '',
        // message_verify_code: '',
      },
      verifyCodeData: {
        verify_code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{4,20})$/, message: '用户名为4-20个字符，支持中文、字母、数字', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请设置登录密码', trigger: 'blur' },
          {
            pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
            message:
              '密码长度6-16位，支持数字、字母、字符（除空格）,至少包含2种',
            trigger: 'blur'
          },
          { validator: isSpace, trigger: 'blur' }
        ],
        // phone: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   { pattern: /^1\d{10}$/, message: '手机号码格式不正确，请重新输入', trigger: 'blur' }
        // ],
        confirm_password: [
          { required: true, message: '请再次输入你的密码', trigger: 'blur' },
          {
            pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
            message: '密码长度6-16位，支持数字、字母、字符（除空格）',
            trigger: 'blur'
          },
          { validator: checkRepassword, trigger: 'blur' }
        ],
        verify_code: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '输入4位验证码', trigger: 'blur' }
          // { validator: checkImgCode, trigger: 'blur' }
        ]
        // message_verify_code: [
        //   { required: true, message: '请输入短信验证码', trigger: 'blur' }
        // ]
      },
      msgBtn: {
        getCodeText: '获取验证码',
        isLoading: false,
        isDisabled: false
      },
      submitBtn: {
        btnText: '注册',
        isLoading: false,
        isDisabled: false
      }
    }
  },
  computed: {},
  created() {
    // this.refreshVaImg();
  },
  methods: {
    refreshVaImg() {
      this.$$http('imageVerifyCode', {})
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.verifyCodeData = results.data.data
          }
        })
        // eslint-disable-next-line
        .catch(err => {})
    },
    linkEnd: function(userId) {},
    toLoginPage() {
      this.$router.push({ path: '/login' })
    },
    onSubmit() {
      let postData = this.registerForm
      this.submitBtn.isDisabled = true
      // this.registerForm.verify_key = this.verifyCodeData.verify_key;
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          this.submitBtn.btnText = '提交中'
          this.submitBtn.isLoading = true
          console.log('data', postData)
          this.$$http('register', postData)
            .then(results => {
              this.submitBtn = {
                btnText: '注册',
                isLoading: false,
                isDisabled: false
              }
              if (results.data && results.data.code === 0) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push({ path: '/login' })
                }, 1000)
              }
            })
            .catch(err => {
              console.log('err', err)
              this.submitBtn = {
                btnText: '注册',
                isLoading: false,
                isDisabled: false
              }
            })
        } else {
          this.submitBtn.isDisabled = false
        }
      })
    },
    getMsgCode(event) {
      let times = this.times
      let intCountdown
      if (this.registerForm.phone) {
        const countdown = () => {
          this.msgBtn.getCodeText = times + 's'
          if (times >= 1) {
            times--
          } else {
            this.msgBtn.getCodeText = '获取验证码'
            this.msgBtn.isDisabled = false
            clearInterval(intCountdown)
          }
        }
        this.msgBtn.isLoading = true
        this.msgBtn.isDisabled = true
        this.msgBtn.getCodeText = '正在发送'
        this.$$http('messageVerifyCode', { phone: this.registerForm.phone })
          .then(results => {
            if (results.data && results.data.code === 0) {
              setTimeout(() => {
                this.msgBtn.isLoading = false
                this.msgBtn.getCodeText = times + 's'
                this.$message({
                  message: '短信发送成功，请查看',
                  type: 'success'
                })
                intCountdown = setInterval(countdown, 1000)
              }, 1000)
            }
          })
          // eslint-disable-next-line
          .catch(err => {
            // this.pageLoading = false;
          })
      } else {
        this.$message.error('请输入手机号码')
      }
    }
  }
  // created() {

  // }
}
</script>
