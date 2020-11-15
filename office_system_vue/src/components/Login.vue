<template>
  <div class="login">
    <h1 style="text-align: center">登录</h1>
    <hr>
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="密码登录" active>
          <b-card-body>
            <div role="group">
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">电话号码</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="phoneNumber"
                  :state="phoneNumberState"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="请输入电话号码"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">密码</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="password"
                  type="password"
                  :state="passwordState"
                  placeholder="请输入密码"
                  trim
                ></b-form-input>
              </b-input-group>
            </div>
          </b-card-body>
          <b-button variant="primary" @click="loginByPassword">登录</b-button>
        </b-tab>
        <b-tab title="验证码登录">
          <b-card-body>
            <div role="group">
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">电话号码</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="phoneNumber"
                  :state="phoneNumberState"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="请输入电话号码"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">验证码</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="verificationCode"
                  placeholder="请输入验证码"
                  trim
                ></b-form-input>
                <b-button variant="primary">发送</b-button>
              </b-input-group>
            </div>
          </b-card-body>
          <b-button variant="primary">登录</b-button>
        </b-tab>
      </b-tabs>
      <router-link to="/register">没有账号？去注册</router-link>
    </b-card>
  </div>
</template>

<script>
import {loginByPassword} from "../api/login";

export default {
  name: "Login",
  data() {
    return {
      'phoneNumber': '',
      'password':'',
      'verificationCode':''
    }
  },
  methods: {
    loginByPassword() {
      loginByPassword(this.phoneNumber,this.password).then(res => {
        if(res.data.status === 'success') {
          this.$router.push('/message')
        }
        else {
          console.log(res.data)
          alert('登录失败'+res.data.errMsg)
        }
      })
    }
  },
  computed: {
    phoneNumberState() {
      let phoneNumberRegex = /1[0-9]{10}$/
      return phoneNumberRegex.test(this.phoneNumber)
    },
    passwordState() {
      return this.password !== ''
    }
  }
}
</script>

<style scoped>
.myCard {
  width: 50%;
  margin: auto;
}
</style>
