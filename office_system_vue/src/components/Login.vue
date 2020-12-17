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
                <b-button variant="primary" @click="sendVerificationCode">发送</b-button>
              </b-input-group>
            </div>
          </b-card-body>
          <b-button variant="primary" @click="loginByVerificationCode">登录</b-button>
        </b-tab>
      </b-tabs>
      <router-link to="/register">没有账号？去注册</router-link>
    </b-card>


    <!--要求用户填写企业邀请码-->
    <b-modal ref="modal-1" title="检测到您尚未加入企业，请填写企业邀请码或者创建企业，否则将无法使用我们的产品" hide-footer>
      <b-card>
        <b-tabs pills card vertical>
          <b-tab title="加入企业" active>
            <b-input-group class="mt-3" >
              <template v-slot:prepend>
                <b-input-group-text style="width: 90px">
                  <span style="margin: auto">邀请码</span>
                </b-input-group-text>
              </template>
              <b-form-input
                v-model="companyInvitingCode"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="请输入企业邀请码"
                trim
              ></b-form-input>
            </b-input-group>
            <br>
            <b-button variant="outline-primary" style="margin-left: 100px" @click="joinCompany">
              确认
            </b-button>
          </b-tab>
          <b-tab title="创建企业">
            <b-input-group class="mt-3" >
              <template v-slot:prepend>
                <b-input-group-text style="width: 90px">
                  <span style="margin: auto">企业名</span>
                </b-input-group-text>
              </template>
              <b-form-input
                v-model="companyName"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="请输入您的企业名"
                trim
              ></b-form-input>
            </b-input-group>
            <br>
            <b-button variant="outline-primary" style="margin-left: 100px" @click="createCompany">
              确认
            </b-button>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-modal>


  </div>
</template>

<script>
import {loginByPassword,login} from "../api/login";
import {getMyPersonalInfo} from "../api/user";
import {addCompany, joinCompany as join_company} from "../api/company";
import {verificationCode} from "../api/register";

export default {
  name: "Login",
  data() {
    return {
      'phoneNumber': '',
      'password':'',
      'verificationCode':'',

      companyInvitingCode:"",
      companyName:"",
    }
  },
  methods: {
    loginByPassword() {
      console.log(this)
      let password = this.md5(this.password)
      loginByPassword(this.phoneNumber,password).then(res => {
        if(res.data.status === 'success') {
          getMyPersonalInfo().then(res =>  {
            let jsonObj = JSON.parse(JSON.stringify(res.data.data));
            //console.log(jsonObj)
            //console.log(jsonObj.companyName==="无公司")
            if(jsonObj.companyName==="无公司"){
              this.$refs['modal-1'].show()
            }
            else{
              this.$router.push('/home')
            }
          })
        }
        else {
          console.log(res.data)
          alert('登录失败，'+res.data.data.errMsg)
        }
      })
    },
    joinCompany(){
      let _this = this
      //console.log(this.companyInvitingCode)
      join_company(this.companyInvitingCode).then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data));
        if(jsonObj.status==="success"){
          this.$router.push('/home');
          alert("成功加入企业");
        }else{
          alert(jsonObj.data.errMsg);
        }
      })
    },
    createCompany(){
      let _this = this
      addCompany(this.companyName).then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data));
        if(jsonObj.status==="success"){
          this.$router.push('/home');
          alert("成功创建企业");
        }else{
          alert(jsonObj.data.errMsg);
        }
      })
    },
    sendVerificationCode(){//验证码登录--发送验证码
      verificationCode(this.phoneNumber,"login").then(res =>  {
        alert("验证码已发送!")
      }).catch(err => {
        alert("发送验证码失败!")
        console.log(err)
      })
    },
    loginByVerificationCode(){
      login(this.phoneNumber,this.verificationCode).then(res => {
        console.log(res.data.status )
        if(res.data.status === 'success') {
          getMyPersonalInfo().then(res =>  {
            let jsonObj = JSON.parse(JSON.stringify(res.data.data));
            //console.log(jsonObj)
            //console.log(jsonObj.companyName==="无公司")
            if(jsonObj.companyName==="无公司"){
              this.$refs['modal-1'].show()
            }
            else{
              this.$router.push('/home')
            }
          })
        }
        else {
          console.log(res.data)
          alert('登录失败，'+res.data.data.errMsg)
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
@import '../assets/css/myCard.css';
</style>
