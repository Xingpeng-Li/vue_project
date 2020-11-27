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
            <b-tab title="全部联系人" active @click="getCompanyContacts()">
              <b-card-body>
                <div>
                  <!--表格上方的加载提示 -->
                  <div>
                    <b-alert show variant="primary">{{is_load}}</b-alert>
                  </div>
                  <!--全部联系人表格-->
                  <b-table hover :items="items1" :fields="fields1">
                    <template v-slot:cell(content)="row">
                    </template>
                  </b-table>
                </div>
              </b-card-body>
            </b-tab>
            <!--部门联系人界面 -->
            <b-tab title="部门联系人" active @click="getDeptContacts()">
              <b-card-body>
                <div>
                  <!--表格上方的加载提示 -->
                  <div>
                    <b-alert show variant="primary">{{is_load}}</b-alert>
                  </div>
                  <!--部门联系人表格-->
                  <b-table hover :items="items2" :fields="fields2">
                    <template v-slot:cell(content)="row">
                    </template>
                  </b-table>
                  <!--导入文件模块 -->
                  <div>
                    <br>
                    <br>
                    <b-card border-variant="light">
                      <b-input-group>
                        <b-form-file
                          v-model="file"
                          :state="Boolean(file)"
                          placeholder="选择文件"
                          drop-placeholder="请选择文件！"
                        ></b-form-file>
                        <b-button variant="outline-primary" @click="importUser()">导入</b-button>
                      </b-input-group>
                    </b-card>
                    <b-button variant="outline-dark" size="sm" href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/User.xlsx">
                      下载模板
                    </b-button>
                  </div>
                </div>
              </b-card-body>
            </b-tab>
            <b-tab title="添加部门" active @click="getNoDeptContact">
              <b-card-body>
                <div>
                  <!--输入部门名模块 -->
                  <b-form-input
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="请输入部门名称"
                    v-model="deptName"
                    trim
                  ></b-form-input>
                  <div>
                    <p>请选择管理员</p>
                    <!--表格上方的加载提示 -->
                    <div>
                      <b-alert show variant="primary">{{is_load}}</b-alert>
                    </div>
                    <!--无部门人员表 -->
                    <div>
                      <b-table
                        ref="selectedDeptMaster"
                        selectable
                        :select-mode= "selectMode"
                        :items="items3"
                        :fields="fields3"
                        @row-selected="onRowSelectedDeptMaster"
                        responsive="sm"
                      >
                        <template #cell(selected)="{ rowSelected }">
                          <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Selected</span>
                          </template>
                          <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                          </template>
                        </template>
                      </b-table>
                    </div>
                  </div>
                  <!--选择部门成员模块 -->
                  <div>
                    <p>请选择部门成员</p>
                    <!--表格上方的加载提示 -->
                    <div>
                      <b-alert show variant="primary">{{is_load}}</b-alert>
                    </div>

                    <!--无部门人员表 -->
                    <div>
                      <b-table
                        ref="selectedDeptMember"
                        selectable
                        :items="items3"
                        :fields="fields3"
                        @row-selected="onRowSelectedDeptMember"
                        responsive="sm"
                      >
                        <template #cell(selected)="{ rowSelected }">
                          <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Selected</span>
                          </template>
                          <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                          </template>
                        </template>
                      </b-table>
                    </div>
                    <!--提交按钮 -->
                    <div>
                      <b-button variant="outline-dark" size="sm" @click="addDept()">
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
import{importToDB} from "../api/importUser";
import{getNoDeptContacts,getDeptContact,getCompanyContact} from "../api/user";
import{addDeptToDB} from "../api/company";
import {uploadFile} from "../api/cloudFile";
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
      //要上传的联系人文件
      file:null,
      //部门联系人信息
      fields2:  [
        { key: 'name', label: '姓名'},
        { key: 'phoneNumber', label: '手机号码'},
        { key: 'dept', label: '部门'}
      ],
      items2: [{}],
      //自由联系人信息
      fields3:  [
        { key:'selected',lable:''},
        { key: 'name', label: '姓名'},
        { key: 'phoneNumber', label: '手机号码'}
      ],
      items3: [{}],
      //添加部门名称
      deptName:'',
      //添加部门管理员电话
      masterPhoneNumber:'',
      //添加部门人员id
      userIds:'',
      //选择表类型
      selectMode:'single',
      //选中的管理员信息
      selectedDeptMaster:[],
      //选中的部门成员信息
      selectedDeptMember:[]

    }

  },
  methods: {
    //获取所有联系人数据
    getCompanyContacts() {
      let _this = this
      _this.is_load="正在努力地加载数据中，请稍候"
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
        _this.is_load="数据获取成功"
      }).catch(err => {
        alert("联系人信息获取失败!")
        console.log(err)
      })
    },

    //获取自由联系人数据
    getNoDeptContact() {
      let _this = this
      _this.is_load="正在努力地加载数据中，请稍候"
      getNoDeptContacts().then(res =>  {
        if(res.data.status==="success"){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          let _items3Data=[]
          for(let i=0;i<jsonObj.length;i++) {
            _items3Data[i] = {
              userId:jsonObj[i].userId,
              name: jsonObj[i].userName,
              phoneNumber: jsonObj[i].userPhonenumber
            }
            _this.items3 = _items3Data
          }
        }

        _this.is_load="数据获取成功"
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //获取部门联系人数据
    getDeptContacts() {
      let _this = this
      _this.is_load="正在努力地加载数据中，请稍候"
      getDeptContact().then(res =>  {
        if(res.data.status==="success"){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          let _items2Data=[]
          for(let i=0;i<jsonObj.length;i++){
            _items2Data[i]={
              name:jsonObj[i].userName,
              phoneNumber:jsonObj[i].userPhonenumber,
              dept:jsonObj[i].deptName
            }
            _this.items2=_items2Data
          }
        }
        _this.is_load="数据获取成功"
      }).catch(err => {
        alert("联系人数据获取失败!")
        console.log(err)
      })
    },

    //以excel形式导入用户信息

    importUser() {
      //上传文件
      importToDB(this.file).then(res => {
        if(res.data.status === 'success') {
          //刷新表格
          alert("导入成功！")
        }
        else {
          alert("导入失败，"+res.data.errMsg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    onRowSelectedDeptMaster(items){
      this.selectedDeptMaster = items
    },
    onRowSelectedDeptMember(items){
      this.selectedDeptMember = items
    },
    //添加一个部门
    addDept(){
      this.masterPhoneNumber=this.selectedDeptMaster[0].phoneNumber
      for(let i=0;i<this.selectedDeptMember.length;i++){
        if(i===0){
          this.userIds+=this.selectedDeptMember[i].userId

        }
        else{
          this.userIds=this.userIds+","+this.selectedDeptMember[i].userId
        }
      }

      console.log(this.deptName)
      console.log(this.masterPhoneNumber)
      console.log(this.userIds)
      addDeptToDB(this.deptName,this.masterPhoneNumber,this.userIds).then(res => {
        if(res.data.status === 'success') {
          //刷新表格
          alert("添加部门成功")
          this.userIds=''
        }
        else {
          alert("添加部门失败，"+res.data.errMsg)
          this.userIds=''
        }
      }).catch(err => {
        console.log(err)
      })

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
