<template>

  <div class="personInfo">

    <div>
      <br>
      <h2><p class="text-center" style="color:black">个人信息</p></h2>
      <br><br><br>
    </div>

    <div>
      <b-form-group
        id="name"
        label-cols-sm="4"
        label-cols-lg="3"
        label="姓名"
        label-for="input-horizontal"
      >
        <b-form-input id="input1" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        id="sex"
        label-cols-sm="4"
        label-cols-lg="3"
        label="性别"
        label-for="input-horizontal"
      >
        <b-form-input id="input2" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        id="company"
        label-cols-sm="4"
        label-cols-lg="3"
        label="企业"
        label-for="input-horizontal"
      >
        <b-form-input id="input3" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        id="inviteCode"
        label-cols-sm="4"
        label-cols-lg="3"
        label="企业邀请码"
        label-for="input-horizontal"
      >
        <b-form-input id="input4" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        id="department"
        label-cols-sm="4"
        label-cols-lg="3"
        label="部门"
        label-for="input-horizontal"
      >
        <b-form-input id="input5" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-form-group
        id="phone"
        label-cols-sm="4"
        label-cols-lg="3"
        label="手机号"
        label-for="input-horizontal"
      >
        <b-form-input id="input6" :disabled="edit" v-model="name"></b-form-input>
      </b-form-group>
    </div>

    <div>
      <b-button variant="link">发送验证码</b-button>
    </div>
    <div>
      <b-form-group
        id="captcha"
        description="输入验证码."
      >
        <b-form-input id="input-horizontal"></b-form-input>
      </b-form-group>
    </div>


    <div>
      <b-button-group>
        <b-button variant="outline-primary" @click="doEdit">{{edit?"修改个人信息":"保存个人信息"}}</b-button>
        <b-button variant="outline-primary" v-b-modal.modal-1>修改密码</b-button>
        <b-modal id="modal-1" title="修改密码">
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
      </b-modal>
      </b-button-group>
    </div>

  </div>


</template>

<script>
export default {
  computed: {
    state() {
      return this.psw1==this.psw2
    },
    invalidFeedback() {
      return "两次输入密码不一致"
    }
  },
  data() {
    return {
      edit:true,
      name:"",
      psw1:"",
      psw2:""
    }
  },
  methods:{
    doEdit(){
      this.edit=!this.edit
    }
  }
}
</script>
