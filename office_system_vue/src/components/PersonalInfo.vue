<template>

  <div class="personInfo">

    <div>
      <br>
      <h2><p class="text-center" style="color:black">个人信息
      <b-button size="sm" variant="outline-info" class="mb-2" @click="doEdit">
        <b-icon icon="pen" v-show="edit"></b-icon>
        <b-icon icon="check" v-show="!edit"></b-icon>
      </b-button>
      </p></h2>
      <br>
    </div>


    <b-card class="myCard" no-body align="center">
      <b-card-body>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">姓名</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="name"
            :disabled="edit"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入姓名"
            trim
          ></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">性别</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="sex"
            :disabled=true
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入性别"
            trim
          ></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">企业</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="company"
            :disabled=true
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入企业"
            trim
          ></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">邀请码</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="companyInvitingCode"
            :disabled=true
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入企业邀请码"
            trim
          ></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">部门</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="department"
            :disabled=true
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入部门"
            trim
          ></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <template v-slot:prepend>
            <b-input-group-text style="width: 90px">
              <span style="margin: auto">手机号</span>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="phoneNumber"
            :disabled="edit"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="请输入手机号"
            trim
          ></b-form-input>
        </b-input-group>

        <br>

        <div>
          <b-form-group
            id="captcha"
          >
            <b-form-input id="input-horizontal" style="max-width: 200px;margin-left: 350px" v-show="!edit" v-model="verificationCode"></b-form-input>
            <b-button variant="link" style="margin-left: 300px" v-show="!edit" @click="sendVerificationCode">发送验证码</b-button>
          </b-form-group>
        </div>


        <div>
          <b-button variant="outline-primary" v-b-modal.modal-1>修改密码</b-button>
          <b-modal id="modal-1" title="修改密码" hide-footer>
            <b-form-group
              id="password"
              label-cols-sm="4"
              label-cols-lg="3"
              description="Let us know your password."
              label="密码"
              label-for="input-horizontal"
            >
              <b-form-input id="input7" type="password" v-model="psw1"></b-form-input>
            </b-form-group>
            <b-form-group
              id="password2"
              label-cols-sm="4"
              label-cols-lg="3"
              description="Please re-enter your password."
              label="确认密码"
              label-for="input-horizontal"
              :invalid-feedback="invalidFeedback"
              :state="state"
            >
              <b-form-input id="input8" type="password" v-model="psw2"></b-form-input>
            </b-form-group>
            <b-button variant="outline-primary" style="margin-left: 200px" @click="changePassword">确认</b-button>
          </b-modal>
        </div>

      </b-card-body>
    </b-card>

  </div>


</template>

<script>
import {getMyPersonalInfo,updatePersonInfo} from "../api/user";
import {verificationCode} from "../api/register";

export default {
  computed: {
    state() {
      return this.psw1===this.psw2
    },
    invalidFeedback() {
      return "两次输入密码不一致"
    }
  },
  data() {
    return {

      //是否处于编辑状态
      edit:true,

      //界面显示的数据
      name:"",
      sex:"",
      company:"",
      companyInvitingCode:"",
      department:"",
      phoneNumber:"",
      verificationCode: "",

      //更改密码时前后两次输入的密码
      psw1:"",
      psw2:""
    }
  },
  methods:{
    doEdit(){
      if(!this.edit) {//处于编辑状态，点击按钮保存修改
        let _this = this
        updatePersonInfo(_this.phoneNumber,null,_this.name,_this.verificationCode).then(res =>  {
          _this.edit=true
        }).catch(err => {
          _this.edit=false
        })
      }
      this.edit=!this.edit  //编辑状态和浏览状态切换
    },
    getMyPersonalInfos(){
      let _this = this
      getMyPersonalInfo().then(res =>  {
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.name = jsonObj.userName;
        _this.sex = jsonObj.userGender;
        _this.company = jsonObj.companyName;
        _this.companyInvitingCode = jsonObj.companyInvitationCode;
        _this.department = jsonObj.deptName;
        _this.phoneNumber = jsonObj.userPhonenumber;
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    changePassword(){
      let _this = this
      updatePersonInfo(_this.phoneNumber,_this.md5(_this.psw1),_this.name,_this.verificationCode).then(res =>  {
        alert("修改密码成功!")
      }).catch(err => {
        alert("验证码错误!")
        console.log(err)
      })
    },
    sendVerificationCode(){
      let _this = this
      verificationCode(_this.phoneNumber,"otherType").then(res =>  {
        alert("验证码已发送!")
      }).catch(err => {
        alert("发送验证码失败!")
        console.log(err)
      })
    }
  },
  mounted() {
    this.getMyPersonalInfos();
  }
}
</script>
<style scoped>
@import '../assets/css/myCard.css';
</style>
