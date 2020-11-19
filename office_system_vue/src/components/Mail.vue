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
                  <div>
                    <b-button id="show-btn" size="sm" v-b-modal.bv-modal-content @click="showContent"  class="mr-1">
                      查看
                    </b-button>
                    <b-modal id="bv-modal-content" hide-footer>
                      <template #modal-title>
                        邮件内容
                      </template>
                      <div class="d-block text-center">
                        <b-form-input id="input1" :disabled="true" v-model="mailContent"></b-form-input>
                      </div>
                      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-content')">
                        关闭
                      </b-button>
                    </b-modal>
                  </div>
                </template>
              </b-table>

            </div>
          </b-card-body>
        </b-tab>
        <b-tab title="写信" @click="$bvModal.show('bv-modal-send')">
          <b-card-body>
            <div style="width: 800px">
<!--              <b-modal id="bv-modal-send" hide-footer>-->
<!--                <template #modal-title>-->
<!--                  写信-->
<!--                </template>-->
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
                            style="height: 400px;resize:none;background-color:#eeeeee"></textarea>
                </div>
                <b-form-file
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
                  <b-button block @click="$bvModal.hide('bv-modal-send')">
                    关闭
                  </b-button>
                </div>
<!--              </b-modal>-->
            </div>
          </b-card-body>
        </b-tab>
        <b-tab title="显示邮箱数据">
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
import {getDeptUser} from "../api/healthPunchin";

export default {
  name: "Mail",
  data(){
    return {
      fields: [
        { key: 'receiveTime', label: '接受时间'},
        { key: 'sender', label: '发送方'},
        { key: 'theme', label: '邮件主题'},
        { key: 'content', label: '邮件内容'}
      ],
      mails:[{}],
      mailContent:"",
      receiver:"",
      subject:"",
      sendContent:"",
      receive:[{}],
      all:'',
      not:'',
      already: '',
      deleteMail:'',
      newMail:''
    }
  },
  methods:{
    showContent(){
      //$bvModal.show('bv-modal-content')
    },
    sendAttachmentsMail(){

    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
