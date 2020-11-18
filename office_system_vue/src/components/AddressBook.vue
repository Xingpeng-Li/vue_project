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
    <!--通讯录界面主体部分-->
    <div style="margin-right: auto">
      <!--进行局部界面显示的三个按钮 -->
      <div>
          <b-button variant="outline-dark" size="sm" @click="showAllLink">
            全部联系人
          </b-button>
          <b-button variant="outline-dark" size="sm" @click="showDeptLink">
            部门联系人
          </b-button>
          <b-button variant="outline-dark" size="sm" @click="showAddDept">
            添加部门
          </b-button>
      </div>
      <!--三个相对独立的通讯录功能界面      -->
      <div id="test1">
        <!--全部联系人界面 -->
        <div v-if="is_show_num===1">
          <!--表格上方的加载提示 -->
          <div>
            <b-alert show variant="primary">{{is_load}}</b-alert>
          </div>
          <!--全部联系人表格 -->
          <div>
            <b-table striped hover :items="items1" :fields="fields1">

            </b-table>
          </div>

        </div>
        <!--部门联系人界面 -->
        <div v-else-if="is_show_num===2">
          <!--表格上方的加载提示 -->
          <div>
            <b-alert show variant="primary">{{is_load}}</b-alert>
          </div>
          <!--部门联系人表格 -->
          <div>
            <b-table striped hover :items="items2" :fields="fields2">

            </b-table>
          </div>
          <!--导入文件模块 -->
          <div>
            <br><br>
            <div>
              <b-button variant="outline-dark" size="sm" @click="showAddDept">
                选择文件
              </b-button>
            </div>
            <input type="text" id="fileName" placeholder="所选文件">
            <b-button variant="outline-dark" size="sm" @click="showAddDept">
              导入
            </b-button>
            <b-button variant="outline-dark" size="sm" @click="showAddDept">
              下载模板
            </b-button>
          </div>
        </div>
        <!--添加部门界面 -->
        <div v-else-if="is_show_num===3">
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
          <!--选择部门管理员模块 -->
          <div>
            <p>请选择管理员</p>
            <!--表格上方的加载提示 -->
            <div>
              <b-alert show variant="primary">{{is_load}}</b-alert>
            </div>

            <!--无部门人员表 -->
            <div>
              <b-table striped hover :items="items3" :fields="fields3">

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
              <b-table striped hover :items="items3" :fields="fields3">

              </b-table>
            </div>

          </div>
          <!--提交按钮 -->
          <div>
            <b-button variant="outline-dark" size="sm" @click="showAddDept">
              确定
            </b-button>
          </div>
        </div>

      </div>
    </div>
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
      //标记当前显示的功能框
      is_show_num:1,
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
    //跳转至全部联系人
    showAllLink(){
      this.is_show_num=1;
    },
    //跳转至部门联系人
    showDeptLink(){
      this.is_show_num=2;
    },
    //跳转至部门联系人
    showAddDept(){
      this.is_show_num=3;
    },
    //更新数据加载时的提示信息
    updateTip(){

    },
    //获取所有联系人数据
    getCompanyContact() {
      let _this = this
      getCompanyContact.then(res =>  {
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.items1 = jsonObj
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //获取自由联系人数据
    getNoDeptContacts() {
      let _this = this
      getNoDeptContacts.then(res =>  {
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.items3 = jsonObj
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //获取部门联系人数据
    getDeptContact() {
      let _this = this
      getDeptContact.then(res =>  {
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.items2 = jsonObj
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //下载用户excel模板
    download(){
      window.location.href="https://studyresource-1301994676.cos.ap-chengdu.myqcloud.com/User.xlsx";
    },

    //添加一个部门
    addDeptToDB(){

    }

  },
  mounted() {
    this.getNoDeptContacts()
    this.getDeptContact()
    this.getCompanyContact()
  }
}


</script>


<style scoped>
@import '../assets/css/h3.css';
</style>
