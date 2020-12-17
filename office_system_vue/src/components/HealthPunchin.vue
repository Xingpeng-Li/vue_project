<template>
  <div class="healthPunchin">
    <div>
      <p>体温：</p>
      <b-form-input
        v-model="usertemperature"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="体温："
        trim
      ></b-form-input>
    </div>
    <div>
      <div class="liandong">
        <div class="display" @click="toAddress">{{selectCity}}</div>
        <v-distpicker @selected='selected' v-show="addInp" style="width: 300px;display: inline-block">
        </v-distpicker>
<!--        <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>-->
        <div class="mask" v-show="mask"></div>
      </div>
    </div>
    <br><br>
    <div>
      <b-form-group label="是否接触疑似病例：">
        <b-form-radio-group id="radio-group-1" v-model="ContactSuspectedCase" name="radio-sub-component1">
          <b-form-radio value="1">是</b-form-radio>
          <b-form-radio value="2">否</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div>
      <b-form-group label="个人健康状况：">
        <b-form-radio-group id="radio-group-2" v-model="HealthStatus" name="radio-sub-component2">
          <b-form-radio value="1">良好</b-form-radio>
          <b-form-radio value="2">不适</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div class="d-block text-center">
      <p align="left">备注：</p>
      <textarea id="content" block class="form-control"  placeholder="这里编写文本消息"
                style="height: 200px;resize:none;background-color:#eeeeee" v-model="PunchinNote"></textarea>
    </div>
    <div>
      <br>
      <b-button variant="primary" @click="health">确定</b-button>
      <b-button variant="primary" to="/statistic" v-if="haveAuthority">健康打卡统计</b-button>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {health} from "../api/healthPunchin";
import {haveAuthority} from "../api/company";

// Vue.component('v-distpicker', VDistpicker);

export default {
  name: 'HealthPunchin',
  components: { VDistpicker },
  data () {
    return {
      selectCity:'请选择地区：',
      addInp :false,
      mask:false,
      'usertemperature': '',
      'ContactSuspectedCase':'1',
      'HealthStatus':'1',
      'userprovince':'',
      'usercity':'',
      userarea:'',
      'PunchinNote':'',

      //是否为管理员
      haveAuthority:false,
    }
  },
  methods: {
// 点击弹出三级联动
    toAddress(){
      this.mask = true;
      this.addInp = true
    },
    // 省市区三级联动
    selected(data){
      this.mask =false;
      this.addInp = false;
      this.selectCity = data.province.value + ' ' + data.city.value +' ' + data.area.value
      this.userprovince=data.province.value;
      this.usercity=data.city.value;
      this.userarea=data.area.value;
    },
    health(){
      health(this.usertemperature,this.usercity,this.userprovince,this.HealthStatus,this.ContactSuspectedCase,this.PunchinNote)
      .then(res=>{
        if(res.data.status === 'success') {
          alert('打卡成功！');
        }
        else {
          console.log(res.data)
          alert('健康打卡失败'+res.data.errMsg)
        }
      })
    }
  },
  mounted() {
    let _this = this
    //是否为管理员
    haveAuthority().then(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.data.data));
      //console.log(jsonObj)
      _this.haveAuthority = jsonObj==="admin";
      //console.log(_this.haveAuthority)
    })
  }
}
</script>

<style scoped>

</style>
