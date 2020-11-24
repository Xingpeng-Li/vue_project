<template>
  <div class="AddressBook">
    <!--通讯录界面标题 -->
    <div>
      <h3>
        通讯录
        <small><small><font color="black"> 联系人一览</font></small></small>
      </h3>
      <hr>
    </div>
    <b-card class="card" no-body align="center">
      <!--通讯录界面主体部分-->
      <b-tabs pills card vertical>
        <div style="margin-right: auto">
          <!--三个相对独立的通讯录功能界面 -->
          <div>
            <!--全部联系人界面 -->
            <b-tab title="全部联系人" active onclick="allContacts">
              <b-card-body>
                <div>
                  <!--表格上方的加载提示 -->
                  <div>
                    <b-alert show variant="primary">{{is_load}}</b-alert>
                  </div>
                  <!--全部联系人表格-->
                  <b-table hover :items="items1" :fields="fields1">
                    <template v-slot:cell(content)="row">
<!--                      <div>-->
<!--                        <b-modal id="bv-modal-content" hide-footer>-->
<!--&lt;!&ndash;                          <div class="d-block text-center">&ndash;&gt;-->
<!--&lt;!&ndash;                            <b-form-input id="input1" :disabled="true" v-model="mailContent"></b-form-input>&ndash;&gt;-->
<!--&lt;!&ndash;                          </div>&ndash;&gt;-->
<!--                        </b-modal>-->
<!--                      </div>-->
                    </template>
                  </b-table>
                </div>
              </b-card-body>
            </b-tab>
            <!--部门联系人界面 -->
            <b-tab title="部门联系人" active onclick="
import {getDeptContact} from '../api/user';
getDeptContact">
              <b-card-body>
                <div>
                  <!--部门联系人表格-->
                  <b-table hover :items="items2" :fields="fields2">
                    <template v-slot:cell(content)="row">
<!--                      <div>-->
<!--                        <b-modal id="bv-modal-content" hide-footer>-->
<!--                          &lt;!&ndash;                          <div class="d-block text-center">&ndash;&gt;-->
<!--                          &lt;!&ndash;                            <b-form-input id="input1" :disabled="true" v-model="mailContent"></b-form-input>&ndash;&gt;-->
<!--                          &lt;!&ndash;                          </div>&ndash;&gt;-->
<!--                        </b-modal>-->
<!--                      </div>-->
                    </template>
                  </b-table>
                  <!--导入文件模块 -->
                  <div>
                    <br><br>
                    <div>
                      <b-button variant="outline-dark" size="sm" >
                        选择文件
                      </b-button>
                    </div>
                    <input type="text"  placeholder="所选文件">
                    <b-button variant="outline-dark" size="sm" >
                      导入
                    </b-button>
                    <b-button variant="outline-dark" size="sm">
                      下载模板
                    </b-button>
                  </div>
                </div>
              </b-card-body>
            </b-tab>
            <b-tab title="添加部门" active onclick="
import {getNoDeptContacts} from '../api/user';
getNoDeptContacts">
              <b-card-body>
                <div>
                  <!--输入部门名模块 -->
                  <div>
                    <b-input-group class="mt-3">
                      <template v-slot:prepend>
                        <p>请输入部门名称</p>
                      </template>
                      <b-form-input
                        aria-describedby="input-live-help input-live-feedback">
                      </b-form-input>
                    </b-input-group>
                  </div>
                  <div>
                    <p>请选择管理员</p>
                    <!--表格上方的加载提示 -->
                    <div>
                      <b-alert show variant="primary">{{is_load}}</b-alert>
                    </div>
                    <!--无部门人员表 -->
                    <b-table hover :items="items3" :fields="fields3">
                      <template v-slot:cell(content)="row">
<!--                        <div>-->
<!--                          <b-modal id="bv-modal-content" hide-footer>-->
<!--                            &lt;!&ndash;                          <div class="d-block text-center">&ndash;&gt;-->
<!--                            &lt;!&ndash;                            <b-form-input id="input1" :disabled="true" v-model="mailContent"></b-form-input>&ndash;&gt;-->
<!--                            &lt;!&ndash;                          </div>&ndash;&gt;-->
<!--                          </b-modal>-->
<!--                        </div>-->
                      </template>
                    </b-table>
                  </div>
                  <!--选择部门成员模块 -->
                  <div>
                    <p>请选择部门成员</p>
                    <!--表格上方的加载提示 -->
                    <div>
                      <b-alert show variant="primary">{{is_load}}</b-alert>
                    </div>

                    <!--无部门人员表 -->
                    <b-table hover :items="items3" :fields="fields3">
                      <template v-slot:cell(content)="row">
<!--                        <div>-->
<!--                          <b-modal id="bv-modal-content" hide-footer>-->
<!--                            &lt;!&ndash;                          <div class="d-block text-center">&ndash;&gt;-->
<!--                            &lt;!&ndash;                            <b-form-input id="input1" :disabled="true" v-model="mailContent"></b-form-input>&ndash;&gt;-->
<!--                            &lt;!&ndash;                          </div>&ndash;&gt;-->
<!--                          </b-modal>-->
<!--                        </div>-->
                      </template>
                    </b-table>
                    <!--提交按钮 -->
                    <div>
                      <b-button variant="outline-dark" size="sm">
                        确定
                      </b-button>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-tab>
          </div>
        </div>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {deleteNotification, getAllNotification} from "../api/notification";
import {addCompany,addDeptToDB,haveAuthority} from "../api/company";
import{getNoDeptContacts,getDeptContact,getCompanyContact} from "../api/user";
//import{}

export default {
  name:"AddressBook",
  data(){
    return{
      //显示加载中信息
      is_load:"正在努力地加载数据中，请稍候",
      //全部联系人界面的表格
      fields1:  [
        { key: 'name', label: '姓名'},
        { key: 'phoneNumber', label: '手机号码'},
        { key: 'dept', label: '部门'},
        { key: 'company', label: '公司'}
      ],
      items1: [{}],
      fields2:  [
        { key: 'name', label: '姓名'},
        { key: 'phoneNumber', label: '手机号码'},
        { key: 'dept', label: '部门'}
      ],
      items2: [{}],
      fields3:  [
        { key: 'name', label: '姓名'},
        { key: 'phoneNumber', label: '手机号码'}
      ],
      items3: [{}],
      //添加部门界面部门名称
      deptName:'',



    }

  },
  methods: {
    //更新数据加载时的提示信息
    updateTip(){

    },
    //获取所有联系人数据
    getCompanyContact() {
      let _this = this
      getCompanyContact().then(res =>  {
        if(res.data.status==="success"){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          let _items1Data=[]
          for(let i=0;i<jsonObj.length;i++){
            _items1Data[i]={
              name:jsonObj[i].userName,
              phoneNumber:jsonObj[i].userPhonenumber,
              dept:jsonObj[i].deptName,
              company:jsonObj[i].companyName
            }
            _this.items1=_items1Data
          }
        }
        this.is_load="数据获取成功"
        console.log(res.data.data);
        console.log(_this.items1);
      }).catch(err => {
        alert("联系人信息获取失败!")
        console.log(err)
      })
    },
    optionShow(row){
      let value = row.item.type
      if(value==="姓名"){
        return {'show':true, 'type':''}
      } else if(value==="手机号码"){
        return {'show': true, 'type':''}
      }else if(value==="部门"){
        return {'show': true, 'type':''}
      }else if(value==="公司"){
        return {'show': true, 'type':''}
      }
      return {'show':false}
    },
    //获取自由联系人数据
    getNoDeptContacts() {
      let _this = this
      getNoDeptContacts().then(res =>  {
        if(res.data.status==="success"){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.items3 = jsonObj
        }
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //获取部门联系人数据
    getDeptContact() {
      let _this = this
      getDeptContact().then(res =>  {
        if(res.data.status==="success"){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.items2 = jsonObj
        }
      }).catch(err => {
        alert("联系人数据获取失败!")
        console.log(err)
      })
    },
    //全部联系人界面跳转
    allContacts(){
      this.getCompanyContact();
    },
    //部门联系人界面跳转
    deptContacts(){
      this.getNoDeptContacts();
    },
    //全部联系人界面跳转
    noDeptContacts(){
      this.getNoDeptContacts();
    },
    //下载用户excel模板
    download(){
      window.location.href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/User.xlsx";
    },

    //添加一个部门
    addDeptToDB(){

    }

  },
  mounted() {
    // this.getNoDeptContacts()
    // this.getDeptContact()
    this.getCompanyContact()
  }
}

</script>


<style scoped>
@import '../assets/css/h3.css';

</style>
