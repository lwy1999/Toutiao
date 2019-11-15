<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form status-icon ref="myForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <!-- 手机号码 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:65%"></el-input>
          <el-button style="float:right" >发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <!-- 同意霸王条款 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    let validator = function (rule, value, callBack) {
      // rule  当前规则
      // value 当前表单项的值
      // callBack  回调函数
      if (value) {
        // 正确 勾选协议
        callBack()
      } else {
        // 不对 没勾选协议
        callBack(new Error('你必须同意协议内容'))
      }
      // value?callBack():callBack(new Error('你必须同意协议内容'))
    }

    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          }).then(res => {
            // console.log(res.data)
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/layout') // 页面跳转
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  background: url("../../assets/img/login_bg.jpg") no-repeat;
  background-size:cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    background-color: #fff;
    width: 440px;
    height: 340px;
    .title{
      text-align: center;
      margin-bottom: 20px;
      img{
        height: 45px;
      }
    }
  }
}
</style>
