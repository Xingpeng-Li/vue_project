<template>
  <div class="message">
    <h3>
      消息
      <small><small><font color="black"> 提醒一览</font></small></small>
    </h3>
    <hr>
    <!-- 消息表格-->
    <div style="margin-right: auto">
      <b-table striped hover :items="notifications" id="messageTable" :fields="fields">
        <template v-slot:cell(checked)="data">
          <p style="color: #ff0000" v-show="!data.value">未阅</p>
          <p style="color: #1dff00" v-show="data.value">已阅</p>
        </template>
        <template v-slot:cell(type)="data">
          <p>{{ showType(data) }}</p>
        </template>
        <template v-slot:cell(option)="row">
          <b-button variant="outline-primary" v-show="optionShow(row).show" @click="execOption(row)" size="sm" class="mr-1">
            {{ optionShow(row).type }}
          </b-button>
<!--          <label v-show="!optionShow(row).show">———</label>-->
        </template>
        <template v-slot:cell(download)="row">
          <b-button variant="outline-dark" v-show="download(row)" size="sm" @click="downloadFile(row)" class="mr-1">
            下载
          </b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="outline-danger" size="sm" @click="deleteNotification(row.item.notificationId)" class="mr-1">
            删除
          </b-button>
        </template>
      </b-table>
    </div>

    <!--发送已批阅报告模态框 -->
    <b-modal ref="reportModal" title="批阅报告">
      <b-form-file
        v-model="reportFile"
        :state="Boolean(reportFile)"
        placeholder="选择文件"
        drop-placeholder="请选择文件！"
      ></b-form-file>
      <template #modal-footer="{send}">
        <b-button size="mm" variant="primary" @click="returnReport">
          发送
        </b-button>
      </template>
    </b-modal>

    <!--审批模态框 -->
    <b-modal ref="applicationModal" :title="applicationType">
      <b-list-group>
        <b-list-group-item>申请人：{{applicationSender}}</b-list-group-item>
        <b-list-group-item>时间：{{applicationStartTime}} - {{applicationEndTime}}</b-list-group-item>
        <b-list-group-item>理由：{{applicationReason}}</b-list-group-item>
      </b-list-group>
      <template #modal-footer="{send}">
        <b-button size="mm" variant="outline-danger" v-show="approval" @click="disposeApplication(1)">
          不同意
        </b-button>
        <b-button size="mm" variant="outline-primary" v-show="approval" @click="disposeApplication(0)">
          同意
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {deleteNotification, getAllNotification, readNotification} from "../api/notification";
import {disposeApplication, getApplication} from "../api/application";
import {returnReport} from "../api/report";

export default {
  name: "Message",
  data() {
    return {
      optionType: null,     //操作的类型
      reportFile: null,    //回复的报告文件
      notificationId: '',
      applicationType: 'XX审批',  //审批类型
      applicationSender: 'XXX',  //发送者
      applicationStartTime: '',  //审批开始时间
      applicationEndTime: '',   //审批结束时间
      applicationReason: '',   //审批理由
      approval: null,    //是否是审批的处理者
      notifications: [{}],
      fields: [
        { key: 'checked', label: '状态'},
        { key: 'type', label: '消息'},
        { key: 'senderName', label: '发送者'},
        { key: 'time', label: '接收时间'},
        { key: 'option', label: '操作'},
        { key: 'download', label: '下载'},
        { key: 'delete', label: ''},
      ]
    }
  },
  methods: {
    getAllNotificaions() {
      let _this = this
      getAllNotification().then(res =>  {
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.notifications = jsonObj
        }
        else {
          alert("获取失败，"+res.data.data.errMsg)
          if(res.data.data.errCode === 1||res.data.data.errCode === 20012) {
            //跳回登陆界面
            this.$router.push("/")
          }
        }
      }).catch(err => {
        alert("消息获取失败!")
        console.log(err)
      })
    },
    //消息
    showType(data) {
      if(data.value==="已处理审批"){
        return data.item.body
      }else{
        return data.value + '提醒'
      }
    },
    //操作
    optionShow(row){
      let value = row.item.type
      if(value==="待批阅报告"){
        return {'show':true, 'type':'回复'}
      } else if(value==="健康打卡"){
        return {'show': true, 'type':'前往'}
      }else if(value==="待处理审批"){
        return {'show': true, 'type':'查看'}
      }else if(value==="待查看审批"){
        return {'show': true, 'type':'查看'}
      }
      return {'show':false}
    },
    download(row){
      let value = row.item.type
      if(value==="待批阅报告"||value==="待查看报告"||value==='已批阅报告'){
        return true
      }
      return false
    },
    deleteNotification(notificationId) {
      let _this = this
      if(confirm("确认删除这条信息吗？")) {
        deleteNotification(notificationId).then(res => {
          if(res.data.status === 'success') {
            //刷新表格
            for(var i = 0;i < _this.notifications.length;i++) {
              if(_this.notifications[i].notificationId === notificationId) {
                _this.notifications.splice(i,1)
                break
              }
            }
          }
          else {
            alert("删除失败，"+res.data.errMsg)
          }
        }).catch(err => {
          alert("删除失败")
          console.log(err)
        })
      }
    },
    downloadFile(row) {
      window.location.href = row.item.body
    },
    execOption(row) {
      let value = row.item.type  //根据type的不同执行不同的操作
      this.notificationId = row.item.notificationId
      if(value==="待批阅报告"){
        this.$refs['reportModal'].show()
      } else if(value==="健康打卡"){
        readNotification(this.notificationId).then().catch(err => {
          console.log(err)
        })
        this.$router.push('/healthPunchin')
      }else if(value==="待处理审批" || value==="待查看审批"){
        this.approval = value !== "待查看审批";
        this.applicationSender = row.item.senderName
        this.applicationStartTime = ''
        this.applicationEndTime = ''
        this.applicationReason = ''
        getApplication(row.item.notificationId).then(res => {
          //获得审批
          if(res.data.status === 'success') {
            this.applicationStartTime = res.data.data.startTime
            this.applicationEndTime = res.data.data.endTime
            this.applicationReason = res.data.data.reason
          }
          else {
            alert("获取失败，"+res.data.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.$refs['applicationModal'].show()
      }
    },
    returnReport() {
      //回复报告
      returnReport(this.reportFile,this.notificationId).then(res => {
        if(res.data.status === 'success') {
          alert("回复成功！")
          this.$refs['reportModal'].hide()
        }
        else {
          alert("回复失败，"+res.data.data.errMsg)
        }
      }).catch(err => {
        alert("回复失败")
        console.log(err)
      })
    },
    disposeApplication(isAgree) {
      disposeApplication(this.notificationId,isAgree).then(res => {
        if(res.data.status === 'success') {
          alert("处理成功！")
          this.$refs['applicationModal'].hide()
        }
        else {
          alert("处理失败，"+res.data.data.errMsg)
        }
      }).catch(err => {
        alert("处理失败")
        console.log(err)
      })
    }
  },
  mounted() {
    this.getAllNotificaions()
  }
}
</script>

<style scoped>
@import '../assets/css/h3.css';
/*@import '../assets/css/table.css';*/
</style>
