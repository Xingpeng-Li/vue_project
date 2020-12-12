<template>
  <div class="approval">
    <h1 style="text-align: center">请假审批</h1>
    <hr>
    <!-- 审批卡-->
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="请假审批" active>
          <b-button
            variant="primary"
            class="float-right"
            @click="sendApplication('请假')"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>请假审批</h3>
            <hr>
            <div role="group">
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">开始时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="startDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="startTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">结束时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="endDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="endTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">理由</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="reason1"
                  placeholder="请假理由"
                  trim
                ></b-form-input>
              </b-input-group>
            </div>
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
        <b-tab title="外出审批">
          <b-button
            variant="primary"
            class="float-right"
            @click="sendApplication('外出')"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>外出审批</h3>
            <hr>
            <div role="group">
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">开始时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="startDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="startTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">结束时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="endDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="endTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">理由</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="reason2"
                  placeholder="外出理由"
                  trim
                ></b-form-input>
              </b-input-group>
            </div>
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
        <b-tab title="加班审批">
          <b-button
            variant="primary"
            class="float-right"
            @click="sendApplication('加班')"
          >
            发送
          </b-button>
          <b-card-body>
            <h3>加班审批</h3>
            <hr>
            <div role="group">
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">开始时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="startDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="startTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">结束时间</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="endDate"
                  type="date"
                  trim
                ></b-form-input>
                <b-form-input
                  v-model="endTime"
                  type="time"
                  trim
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mt-3">
                <template v-slot:prepend>
                  <b-input-group-text style="width: 90px">
                    <span style="margin: auto">理由</span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  v-model="reason3"
                  placeholder="加班理由"
                  trim
                ></b-form-input>
              </b-input-group>
            </div>
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
import {getAllNotification} from "../api/notification";
import {getCompanyContact} from "../api/user";
import {sendApplication} from "../api/application";

export default {
  name: "Approval",
  data() {
    return {
      'startDate': '',
      'startTime': '',
      'endDate': '',
      'endTime': '',
      'reason1': '',
      'reason2': '',
      'reason3': '',
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
    sendApplication(type) {
      let startTime = this.startDate+' '+this.startTime
      let endTime = this.endDate+' '+this.startTime
      let reason;
      if(type === '请假') {
        reason = this.reason1
      }
      else if(type === '外出') {
        reason = this.reason2
      }
      else {
        reason = this.reason3
      }
      let _this = this
      sendApplication(type,startTime,endTime,reason,this.selectedApprovalId,this.selectedSecondApprovalId).then(res => {
        if(res.data.status === 'success') {
          alert("发送成功")
          _this.startDate = _this.startTime = _this.endDate = _this.endTime = _this.selectedApprovalId = _this.selectedApprovalName
          = _this.selectedSecondApprovalId = _this.selectedSecondApprovalName = ''
        }
        else {
          alert("发送失败，"+res.data.data.errMsg)
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
.myCard {
  width: 50%;
  margin: auto;
}
</style>
