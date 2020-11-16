<template>
  <div class="message">
    <h3>
      消息
      <small><small><font color="black"> 提醒一览</font></small></small>
    </h3>
    <hr>
    <!-- 消息表格-->
    <div style="margin-right: auto">
      <b-table striped hover :items="notifications" :fields="fields">
        <template v-slot:cell(checked)="data">
          <p style="color: #ff0000" v-show="!data.value">未阅</p>
          <p style="color: #1dff00" v-show="data.value">已阅</p>
        </template>
        <template v-slot:cell(type)="data">
          <p>{{ showType(data) }}</p>
        </template>
        <template v-slot:cell(option)="row">
          <b-button variant="outline-primary" v-show="optionShow(row).show" v-b-modal.reportModal size="sm" class="mr-1">
            {{ optionShow(row).type }}
          </b-button>
<!--          <label v-show="!optionShow(row).show">———</label>-->
        </template>
        <template v-slot:cell(download)="row">
          <b-button variant="outline-dark" v-show="download(row)" size="sm" @click="deleteNotification(row.item.notification)" class="mr-1">
            下载
          </b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="outline-danger" size="sm" @click="deleteNotification(row.item.notification)" class="mr-1">
            删除
          </b-button>
        </template>
      </b-table>
    </div>

    <!--工作报告模态框 -->
    <b-modal ok-disabled="true" id="reportModal" title="工作报告">
      <b-form-file
        v-model="reportFile"
        :state="Boolean(reportFile)"
        placeholder="选择文件"
        drop-placeholder="请选择文件！"
      ></b-form-file>
      <template #modal-footer="{send}">
        <b-button size="mm" variant="primary" @click="reply()">
          发送
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {deleteNotification, getAllNotification} from "../api/notification";

export default {
  name: "Message",
  data() {
    return {
      optionType: null,     //操作的类型
      reportFile: null,    //回复的报告文件
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
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.notifications = jsonObj
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
      } else if(value==="健康打卡" || value==="考勤打卡"){
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
      alert('成功')
      deleteNotification(notificationId).then(res => {
        if(res.status === 'success') {
          alert('删除成功！')
        }
        else {
          alert(res.data.errMsg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    reply() {
      alert("发送")
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
