<template>
  <div class="report">
    <h1 style="text-align: center">工作报告</h1>
    <hr>
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="日报" active>
          <b-button
            variant="outline-primary"
            class="float-left"
            href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/%E5%B7%A5%E4%BD%9C%E6%8A%A5%E5%91%8A-%E6%97%A5%E6%8A%A5%E6%A8%A1%E6%9D%BF.docx"
          >
            下载模板
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
            @click="sendReport('日报')"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>发送日报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">审批人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.approvalModal>选择</b-button>
          </b-input-group>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">抄送人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedSecondApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.secondApprovalModal>选择</b-button>
          </b-input-group>
        </b-tab>
        <b-tab title="周报">
          <b-button
            variant="outline-primary"
            class="float-left"
            href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/%E5%B7%A5%E4%BD%9C%E6%8A%A5%E5%91%8A-%E5%91%A8%E6%8A%A5%E6%A8%A1%E6%9D%BF.docx"
          >
            下载模板
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>发送周报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">审批人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.approvalModal>选择</b-button>
          </b-input-group>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">抄送人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedSecondApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.secondApprovalModal>选择</b-button>
          </b-input-group>
        </b-tab>
        <b-tab title="月报">
          <b-button
            variant="outline-primary"
            class="float-left"
            href="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/%E5%B7%A5%E4%BD%9C%E6%8A%A5%E5%91%8A-%E6%9C%88%E6%8A%A5%E6%A8%A1%E6%9D%BF.docx"
          >
            下载模板
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>发送月报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">审批人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.approvalModal>选择</b-button>
          </b-input-group>
          <b-input-group style="width: 50%;margin: auto" class="mt-3">
            <template v-slot:prepend>
              <b-input-group-text style="width: 90px">
                <span style="margin: auto">抄送人</span>
              </b-input-group-text>
            </template>
            <b-form-input
              v-model="selectedSecondApprovalName"
              aria-describedby="input-live-help input-live-feedback"
              disabled
              trim
            ></b-form-input>
            <b-button variant="primary" v-b-modal.secondApprovalModal>选择</b-button>
          </b-input-group>
        </b-tab>
      </b-tabs>
    </b-card>
    <!--    选择审批人模态框-->
    <b-modal id="approvalModal" title="选择审批人">
      <b-table striped hover :items="contacts" :fields="fields">
        <template v-slot:cell(selected)="row">
          <b-form-radio v-show="row.item.userId !== selectedSecondApprovalId" v-model="selectedApprovalId" :value='row.item.userId'></b-form-radio>
        </template>
      </b-table>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="confirmApproval"
          >
            确定
          </b-button>
        </div>
      </template>
    </b-modal>
    <!--    选择抄送人模态框-->
    <b-modal id="secondApprovalModal" title="选择抄送人">
      <b-table striped hover :items="contacts" :fields="fields">
        <template v-slot:cell(selected)="row">
          <b-form-radio v-show="row.item.userId !== selectedApprovalId" v-model="selectedSecondApprovalId" :value='row.item.userId'></b-form-radio>
        </template>
      </b-table>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="confirmSecondApproval"
          >
            确定
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {getCompanyContact} from "../api/user";
import {sendReport} from "../api/report";

export default {
  name: "Report",
  data() {
    return {
      'waterMark': '',
      'reportFile':null,
      'contacts': [{}],
      'fields': [
        {key: 'selected', label: ''},
        {key: 'userName', label: '姓名'},
        {key: 'department', label: '部门'},
        {key: 'userPhonenumber', label: '电话号码'}
      ],
      'selectedApprovalId': '',   //选择的审批人Id
      'selectedApprovalName': '',   //选择的审批人姓名
      'selectedSecondApprovalId': '',   //选择的抄送人Id
      'selectedSecondApprovalName': ''  //选择的抄送人姓名
    }
  },
  methods: {
    getContacts() {
      let _this = this
      getCompanyContact().then(res =>  {
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.contacts = jsonObj
        }
        else {
          alert("获取公司联系人失败，"+res.data.data.errMsg)
          if(res.data.data.errCode === 1||res.data.data.errCode === 20012) {
            //跳回登陆界面
            this.$router.push("/")
          }
        }
      }).catch(err => {
        alert("获取公司联系人失败!")
        console.log(err)
      })
    },
    confirmApproval() {
      //根据选择的联系人Id设置联系人姓名
      for(var i = 0;i < this.contacts.length;i++) {
        if(this.contacts[i].userId === this.selectedApprovalId) {
          this.selectedApprovalName = this.contacts[i].userName
          break
        }
      }
      this.$bvModal.hide('approvalModal')
    },
    confirmSecondApproval() {
      //根据选择的联系人Id设置联系人姓名
      for(var i = 0;i < this.contacts.length;i++) {
        if(this.contacts[i].userId === this.selectedSecondApprovalId) {
          this.selectedSecondApprovalName = this.contacts[i].userName
          break
        }
      }
      this.$bvModal.hide('secondApprovalModal')
    },
    sendReport(type) {
      let _this = this
      sendReport(this.reportFile,type,this.waterMark,this.selectedApprovalId,this.selectedSecondApprovalId).then(res => {
        if(res.data.status === 'success') {
          alert("发送成功！")
          _this.selectedApprovalId = _this.selectedApprovalName = _this.selectedSecondApprovalId = _this.selectedSecondApprovalName = ''
          _this.reportFile = null
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getContacts()
  }
}
</script>

<style scoped>
@import '../assets/css/myCard.css';
</style>
