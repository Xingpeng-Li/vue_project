<template>
  <div class="myNavbar" v-if="$route.meta.showNav">
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <b-navbar-brand to="/home" :active="$route.name === 'Home'">Office System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item style="margin-right: 10px" to="/addressBook" :active="$route.name === 'AddressBook'">通讯录</b-nav-item>
          <b-nav-item style="margin-right: 10px">会议</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/cloudfile" :active="$route.name === 'CloudFile'">云空间</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/message" :active="$route.name === 'Message'">
            消息 <b-badge variant="danger">4</b-badge>
          </b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/announcement" :active="$route.name === 'Announcement'">公告栏</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/chat" :active="$route.name === 'ChatRoom'">聊天</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/publicAccount" :active="$route.name === 'PublicAccount'">公众号</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/loginToMail" :active="$route.name === 'LoginToMail'">邮箱</b-nav-item>
          <b-nav-item style="margin-right: 10px" v-b-toggle.backlog>待办</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              应用
            </template>
            <b-dropdown-item to="/approval" :active="$route.name === 'Approval'">请假审批</b-dropdown-item>
            <b-dropdown-item to="/report" :active="$route.name === 'Report'">工作报告</b-dropdown-item>
            <b-dropdown-item to="/healthPunchin" :active="$route.name === 'HealthPunchin'">健康打卡</b-dropdown-item>
            <b-dropdown-item>考勤打卡</b-dropdown-item>
            <b-dropdown-item to="/writeAnnouncement" :active="$route.name === 'WriteAnnouncement'">发布公告</b-dropdown-item>
            <b-dropdown-item>语音识别</b-dropdown-item>
            <b-dropdown-item>打卡提醒</b-dropdown-item>
            <b-dropdown-item to="/statistic" :active="$route.name === 'AttendanceStatistics'">打卡记录</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              用户
            </template>
            <b-dropdown-item to="/person">个人中心</b-dropdown-item>
            <b-dropdown-item href="#">登出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-sidebar id="backlog" right shadow no-header>
      <template #default="{ hide }">
        <div class="m-3 d-flex justify-content-between">
          <h5>
            <b>我的待办</b>
            <b-button variant="link" size="sm" v-b-modal.backlog><b-icon icon="plus-circle"></b-icon></b-button>
          </h5>
          <b-icon icon="x" scale="2" @click="hide"></b-icon>
        </div>
        <b-tabs>
          <b-tab title="未完成" active>
            <b-list-group v-for="unfinished in unfinished_list" :key="unfinished.body">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <p class="mb-1">{{ unfinished.body }}<br><small>{{ unfinished.time }}</small></p>
                <b-dropdown variant="link" right size="sm" no-caret>
                  <template #button-content>
                    <b-icon icon="caret-down"></b-icon>
                  </template>
                  <b-dropdown-item><b-icon icon="check2"></b-icon> 完成</b-dropdown-item>
                  <b-dropdown-item><b-icon icon="pencil-square"></b-icon> 编辑</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item><b-icon icon="exclamation-circle" variant="danger"></b-icon> 删除</b-dropdown-item>
                </b-dropdown>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
          <b-tab title="已完成">
            <b-list-group v-for="finished in finished_list" :key="finished.body">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <p class="mb-1">{{ finished.body }}<br><small>{{ finished.time }}</small></p>
                <b-dropdown variant="link" right size="sm" no-caret>
                  <template #button-content>
                    <b-icon icon="caret-down"></b-icon>
                  </template>
                  <b-dropdown-item><b-icon icon="check2"></b-icon> 完成</b-dropdown-item>
                  <b-dropdown-item><b-icon icon="pencil-square"></b-icon> 编辑</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item><b-icon icon="exclamation-circle" variant="danger"></b-icon> 删除</b-dropdown-item>
                </b-dropdown>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </template>
    </b-sidebar>
    <b-modal id="backlog">
      <b-form-textarea
        placeholder="待办内容"
        rows="3"
        no-resize
        v-model="backlog_body"
      ></b-form-textarea>
      <br>
      <h5>
        <b-icon icon="alarm" v-b-toggle.selectTime></b-icon>
        {{backlog_endDate}} {{backlog_endTime}}
      </h5>
      <b-collapse id="selectTime" class="mt-2">
        <b-card>
          <p class="card-text">选择时间</p>
          <b-form-datepicker v-model="backlog_endDate" locale="cn"></b-form-datepicker>
          <b-form-timepicker v-model="backlog_endTime" locale="cn"></b-form-timepicker>
        </b-card>
      </b-collapse>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      backlog_body: '',
      backlog_endDate: '2020-1-3',
      backlog_endTime: '13:20:00',
      unfinished_list: [
        {body: '商务智能大作业', time: '2020/12/8 12:00'},
        {body: '系统级程序设计考试', time: '2020/12/21 18:00'},
        {body: '数字图像处理考试', time: '2020/12/28 18:30'},
        {body: '数字图像处理大作业', time: '2021/1/6 12:30'}
      ],
      finished_list: [
        {body: '商务智能作业', time: '2020/11/18 12:00'},
        {body: '系统级程序设计作业', time: '2020/11/20 18:00'},
        {body: 'Linux考试', time: '2020/11/23 18:30'},
        {body: 'Linux作业', time: '2020/11/28 12:30'}
      ]
    }
  },
  methods: {
    showRouter() {
      console.log(this.$route)
    }
  }
}
</script>

<style scoped>
nav {
  background:#434343
}
</style>
