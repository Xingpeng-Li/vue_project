<template>
  <div class="writeAnnouncement">
    <div style="width: 800px">
      <p>
        发布公告
      </p>
      <div>
        <b-form-group label="标题">
          <b-form-input id="title" :disabled="false" v-model="title"></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="公告类型">
          <b-form-radio-group id="radio-group-1" v-model="typeSelected" name="radio-sub-component1">
            <b-form-radio value="dept">部门公告</b-form-radio>
            <b-form-radio value="company">企业公告</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="d-block text-center">
        <p align="left">公告正文：</p>
        <textarea id="content" block class="form-control"  placeholder="这里编写文本消息"
                  style="height: 400px;resize:none;background-color:#eeeeee" v-model="AnnouncementContent"></textarea>
      </div>
      <b-form-file
        placeholder="选择文件"
        drop-placeholder="请选择文件！"
        v-model="file"
      ></b-form-file>
      <br>
      <div>
        <b-button block variant="primary" @click="sendAnnouncement">
          发送
        </b-button>
        <br>
      </div>
      <div>
        <b-button block @click="">
          取消
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {sendAnnouncement} from "../api/announcement";

export default {
  name: "WriteAnnouncement",
  data(){
    return{
      typeSelected:'',
      AnnouncementContent:'',
      file:'',
      title:''
    }
  },
  methods:{
    sendAnnouncement(){
      sendAnnouncement(this.file,this.typeSelected,this.title,this.AnnouncementContent).then(res=>{
        if(res.data.status==='success'){
          alert("公告发送成功！");
        }
        else {
          console.log(res.data)
          alert('公告发送失败'+res.data.errMsg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
