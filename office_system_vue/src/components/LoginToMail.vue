<template>
  <div class="loginToMail">
    <h1 style="text-align: center">邮箱登录</h1>
    <hr>
    <b-card class="myCard" no-body align="center">
      <div role="group">
        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">邮箱账号：</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="userMail"
            :state="mailState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="邮箱："
            trim
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">授权码：</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="mailPassword"
            type="password"
            :state="passwordState"
            placeholder="授权码："
            trim
          ></b-form-input>
        </b-input-group>
      </div>
      <br>
      <div style="margin: auto">
        <b-button variant="primary" @click="mailLogin" >登录</b-button>
        <br>
        <a href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/help.pdf">如何获取授权码？</a>
      </div>
    </b-card>
  </div>
</template>

<script>
import {mailAlready, mailLogin} from "../api/mail";

export default {
  name: "LoginToMail",
  data() {
    return {
      userMail: '',
      mailPassword:'',
    }
  },
  methods:{
    mailLogin(){
      mailLogin(this.userMail,this.mailPassword).then(res=>{
        if(res.data.status === 'success') {
          this.$router.push('/mail')
        }
        else {
          console.log(res.data)
          alert('登录失败，'+res.data.data.errMsg)
        }
      })
    },
    mailAlready(){
      mailAlready().then(res=>{
        if(res.data.status === 'success'){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          this.userMail=jsonObj['userMail'];
          this.mailPassword=jsonObj['mailPassword'];
        }
      })
    }
  },
  computed:{
    mailState() {
      let mailRegex =  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return mailRegex.test(this.phoneNumber)
    },
    passwordState() {
      return this.password !== ''
    }
  },
  mounted() {
    this.mailAlready();
  }
}
</script>

<style scoped>
@import '../assets/css/myCard.css';
</style>
