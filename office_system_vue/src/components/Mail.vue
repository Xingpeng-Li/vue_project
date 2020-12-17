<template>
  <div class="mail">
    <h1 style="text-align: left">邮箱</h1>
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card vertical>
        <b-tab title="收信箱" active>
          <b-card-body>
            <div>
              <b-table hover :items="mails" :fields="fields">
                <template v-slot:cell(content)="row">
                    <b-button id="show-btn" size="sm" v-b-modal.bv-modal-content @click="showContent(row)"  class="mr-1">
                      查看
                    </b-button>
                    <b-modal id="bv-modal-content" size="xl"  scrollable="true" v-model="show">
                      <template #modal-title>
                        邮件内容
                      </template>
                      <div class="d-block text-center">
                        <span v-html="mailContent"></span>
                      </div>
                      <template #modal-footer>
                        <div class="w-100">
                          <b-button
                            variant="primary"
                            size="sm"
                            class="float-right"
                            @click="show=false"
                          >
                            关闭
                          </b-button>
                        </div>
                      </template>
                    </b-modal>
                </template>
              </b-table>

            </div>
          </b-card-body>
        </b-tab>
        <b-tab title="写信">
          <b-card-body>
            <div style="width: 800px">
              <p>
                写信
              </p>
                <div>
                  <b-form-group
                    id="receiver"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    align="left"
                    label="发送到："
                    label-for="input-horizontal"
                  >
                    <b-form-input id="input8" v-model="receiver"></b-form-input>
                  </b-form-group>
                </div>
                <div>
                  <b-form-group
                    id="subject"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="主题："
                    align="left"
                    label-for="input-horizontal"
                  >
                    <b-form-input id="input8" v-model="subject"></b-form-input>
                  </b-form-group>
                </div>
                <div class="d-block text-center">
                  <p align="left">邮件内容：</p>
                  <textarea id="content" block class="form-control"  placeholder="这里编写文本消息"
                            style="height: 400px;resize:none;background-color:#eeeeee" v-model="writeMailContent"></textarea>
                </div>
                <b-form-file
                  v-model="file"
                  placeholder="选择文件"
                  drop-placeholder="请选择文件！"
                ></b-form-file>
                <br>
                <div>
                  <b-button block variant="primary" @click="sendAttachmentsMail()">
                    发送
                  </b-button>
                  <br>
                </div>
                <div>
                  <b-button block @click="">
                    关闭
                  </b-button>
                </div>
            </div>
          </b-card-body>
        </b-tab>
        <b-tab title="显示邮箱数据" @click="receiveMail">
          <b-card-body>
            <div>
              <b-form-group
                id="all"
                label-cols-sm="4"
                label-cols-lg="3"
                label="收件箱总邮件数量："
                label-for="input-horizontal"
              >
                <b-form-input id="all" :disabled="true" v-model="all"></b-form-input>
              </b-form-group>
            </div>
            <div>
              <b-form-group
                id="not"
                label-cols-sm="4"
                label-cols-lg="3"
                label="未读邮件数量："
                label-for="input-horizontal"
              >
                <b-form-input id="all" :disabled="true" v-model="not"></b-form-input>
              </b-form-group>
            </div>
            <div>
              <b-form-group
                id="delete"
                label-cols-sm="4"
                label-cols-lg="3"
                label="已删除邮件数量："
                label-for="input-horizontal"
              >
                <b-form-input id="all" :disabled="true" v-model="deleteMail"></b-form-input>
              </b-form-group>
            </div>
            <div>
              <b-form-group
                id="new"
                label-cols-sm="4"
                label-cols-lg="3"
                label="新邮件数量："
                label-for="input-horizontal"
              >
                <b-form-input id="all" :disabled="true" v-model="newMail"></b-form-input>
              </b-form-group>
            </div>
          </b-card-body>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {getAllMailContent, mailContent, receive, sendAttachmentsMail} from "../api/mail";

export default {
  name: "Mail",
  data(){
    return {
      fields: [
        { key: '接受时间', label: '接受时间'},
        { key: '发送方', label: '发送方'},
        { key: '邮件主题', label: '邮件主题'},
        { key: 'content', label: '邮件内容'}
      ],
      mails:[{}],
      mailContent:"",
      writeMailContent:'',
      receiver:"",
      subject:"",
      sendContent:"",
      all:'',
      not:'',
      deleteMail:'',
      newMail:'',
      file:'',
      mailId:'',
      show: false,
    }
  },
  methods:{
    showContent(row){
      this.mailId=row.item['id'];
      console.log(this.mailId);
      mailContent(this.mailId).then(res=>{
        if(res.data.status === 'success'){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          this.mailContent=jsonObj['content'];
        }
        else {
          console.log(res.data)
          alert('邮件内容查看失败，'+res.data.data.errMsg)
        }
      })
    },
    async
    getAllMailContent(){
     await
      getAllMailContent().then(res=>{
        console.log(res)
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        this.mails=jsonObj;
      }).catch(err =>{
        alert("邮件信息获取失败!")
        console.log(err)
      })
    },
    sendAttachmentsMail(){
      sendAttachmentsMail(this.file,this.receiver,this.subject,this.sendContent).then(res =>{
        if(res.data.status === 'success'){
          alert("发送成功！");
          this.receiver="";
          this.subject="";
          this.sendContent="";
          this.file='';
        }
        else {
          console.log(res.data)
          alert('发送失败，'+res.data.data.errMsg)
        }
      })
    },
    receiveMail(){
      receive().then(res =>{
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          this.all=jsonObj['收件箱总邮件数量'];
          this.not=jsonObj['未读邮件数量'];
          this.deleteMail=jsonObj['已删除邮件数量'];
          this.newMail=jsonObj['新邮件数量'];
        }
        else {
          console.log(res.data)
          alert('邮件信息获取失败，'+res.data.data.errMsg)
        }
      })
    }
  },
  mounted() {
    this.getAllMailContent();
  }
}
</script>

<style scoped>

</style>
