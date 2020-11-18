<template>
  <div class="approval">
    <h1 style="text-align: center">请假审批</h1>
    <hr>
    <!-- 审批卡-->
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="请假审批" active>
          <b-card-body>
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
          <b-button variant="primary">审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
        <b-tab title="外出审批">
          <b-card-body>
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
          <b-button variant="primary">审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
        <b-tab title="加班审批" active>
          <b-card-body>
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
          <b-button variant="primary" v-b-modal.approvalModal>审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
      </b-tabs>
    </b-card>
<!--    选择审批人模态框-->
    <b-modal id="approvalModal" title="选择审批人">
      <b-table striped hover :items="contacts" :fields="fields">
        <template v-slot:cell(selected)="row">
          <b-form-radio v-model="selectedUserId" :value='row.item.userId'></b-form-radio>
        </template>
      </b-table>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            发送
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
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
      'selectedUserId': ''
    }
  }
}
</script>

<style scoped>
.myCard {
  width: 50%;
  margin: auto;
}
</style>
