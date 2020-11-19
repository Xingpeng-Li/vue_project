<template>

  <div class="registration">
    <div>
      <h1 style="text-align: center" @click="register">注册</h1>
      <hr>
    </div>
    <b-card class="myCard" no-body align="center">
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
              <span style="margin: auto">姓名</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="name"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入姓名"
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
        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">确认密码</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="confirmPassword"
            type="password"
            :state="confirmState"
            placeholder="请再次输入密码"
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
          <b-button variant="primary" @click="sendVerificationCode">发送</b-button>
        </b-input-group>
      </div>
    </b-card>

    <div style="margin-top: 10px">
      <b-button variant="primary" style="display:block;margin:0 auto" @click="register">注册</b-button>
    </div>
  </div>
</template>

<script>
import {register, verificationCode} from "../api/register";

export default {
  data() {
    return {
      'phoneNumber': '',
      'password':'',
      'confirmPassword':'',
      'verificationCode':'',
      'name':''
    }
  },
  methods: {
    //发送注册验证码
    sendVerificationCode() {
      verificationCode(this.phoneNumber, 'register').then(res => {
        if (res.data.status === "success") {
          alert("验证码发送成功");
        } else {
          console.log(res.data);
          alert("发送失败," + res.data.errMsg);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    register() {
      let password = this.md5(this.password)
      register(this.name, password, this.phoneNumber, this.verificationCode).then(res => {
        if (res.data.status === "success") {
          alert("注册成功！点击返回登录界面");
          this.$router.push('/')
        } else {
          alert("注册失败" + res.data.errMsg);
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
    },
    confirmState() {
      return this.password === this.confirmPassword
    }
  }
}
</script>
<style scoped>
@import '../assets/css/myCard.css';
</style>
