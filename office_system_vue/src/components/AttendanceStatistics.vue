<template>
  <div class="statistics">
    <h1 style="text-align: center">打卡统计</h1>
    <hr>
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="健康打卡统计" @click="getDeptUser()" active>
          <b-card-body>
            <div role="group">
              <div>
                <b-form-group
                  id="healthall"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="总人数："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input1" :disabled="true" v-model="all"></b-form-input>
                </b-form-group>
              </div>
              <div>
                <b-form-group
                  id="healthnot"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="未打卡："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input2" :disabled="true" v-model="not"></b-form-input>
                </b-form-group>
              </div>
              <div>
                <b-form-group
                  id="healthalready"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="已打卡："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input3" :disabled="true" v-model="already"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </b-card-body>
<!--          <b-button variant="primary" @click="getDeptUser">查看</b-button>-->
        </b-tab>
        <b-tab title="考勤打卡统计" @click="getPunchinCount()">
          <b-card-body>
            <div role="group">
              <div>
                <b-form-group
                  id="all"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="总人数："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input1" :disabled="true" v-model="all"></b-form-input>
                </b-form-group>
              </div>
              <div>
                <b-form-group
                  id="not"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="未打卡："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input2" :disabled="true" v-model="not"></b-form-input>
                </b-form-group>
              </div>
              <div>
                <b-form-group
                  id="already"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="已打卡："
                  label-for="input-horizontal"
                >
                  <b-form-input id="input3" :disabled="true" v-model="already"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </b-card-body>
<!--          <b-button variant="primary" @click="getPunchinCount">查看</b-button>-->
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {getDeptUser} from "../api/healthPunchin";
import {getPunchinCount} from "../api/punchin";

export default {
  computed:{

  },
  data(){
    return {
      name: "AttendanceStatistics",
      all:'',
      not:'',
      already: '',
      // punchinAll:'',
      // punchinNot:'',
      // punchinAlready: '',
      statistic: [{}]
    }
  },
  methods:{
    getDeptUser(){
      getDeptUser().then(res=>{
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
         this.statistic = jsonObj
          this.all = jsonObj["总人数"];
          this.already = jsonObj["已打卡"];
          this.not = jsonObj["未打卡"];
        }
        else {
          console.log(res.data)
          alert('健康打卡统计失败'+res.data.errMsg)
        }
      })
    },
    getPunchinCount(){
      getPunchinCount().then(res=>{
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          this.statistic = jsonObj
          this.all = jsonObj["总人数"];
          this.already = jsonObj["已打卡"];
          this.not = jsonObj["未打卡"];
        }
        else {
          console.log(res.data)
          alert('考勤打卡统计失败'+res.data.errMsg)
        }
      })
    }
  },
  mounted() {
    this.getDeptUser()
  }

}
</script>

<style scoped>

</style>
