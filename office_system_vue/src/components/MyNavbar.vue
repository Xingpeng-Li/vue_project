<template>
  <div class="myNavbar" v-if="$route.meta.showNav">
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <b-navbar-brand to="/home" :active="$route.name === 'Home'">Office System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item style="margin-right: 10px" to="/addressBook" :active="$route.name === 'AddressBook'">通讯录</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/cloudfile" :active="$route.name === 'CloudFile'">云空间</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/message" :active="$route.name === 'Message'">
            消息 <b-badge variant="danger" v-show="uncheckedCount!==0">{{ uncheckedCount }}</b-badge>
          </b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/announcement" :active="$route.name === 'Announcement'">公告栏</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/publicAccount" :active="$route.name === 'PublicAccount'">公众号</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/loginToMail" :active="$route.name === 'LoginToMail'">邮箱</b-nav-item>
          <b-nav-item style="margin-right: 10px" v-b-toggle.backlog @click="getBacklog">待办</b-nav-item>
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
            <b-dropdown-item to="/writeAnnouncement" :active="$route.name === 'WriteAnnouncement'" v-if="haveAuthority">发布公告</b-dropdown-item>
            <b-dropdown-item v-if="haveAuthority">打卡提醒</b-dropdown-item>
            <b-dropdown-item to="/statistic" :active="$route.name === 'AttendanceStatistics'" v-if="haveAuthority">打卡记录</b-dropdown-item>
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
            <b-button variant="link" size="sm" @click="create"><b-icon icon="plus-circle"></b-icon></b-button>
          </h5>
          <b-icon icon="x" scale="2" @click="hide"></b-icon>
        </div>
        <b-tabs>
          <b-tab title="未完成" active>
            <b-list-group v-for="unfinished in unfinished_list" :key="unfinished.body">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <p class="mb-1">{{ unfinished.title }}<br><small>{{ unfinished.endTime | DateFormat }}</small></p>
                <b-dropdown variant="link" right size="sm" no-caret>
                  <template #button-content>
                    <b-icon icon="caret-down"></b-icon>
                  </template>
                  <b-dropdown-item @click="finishBacklog(unfinished.backlogId)"><b-icon icon="check2"></b-icon> 完成</b-dropdown-item>
                  <b-dropdown-item @click="update(unfinished)"><b-icon icon="pencil-square"></b-icon> 编辑</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="deleteBacklog(unfinished.backlogId,false)"><b-icon icon="exclamation-circle" variant="danger"></b-icon> 删除</b-dropdown-item>
                </b-dropdown>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
          <b-tab title="已完成">
            <b-list-group v-for="finished in finished_list" :key="finished.body">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <p class="mb-1">{{ finished.title }}<br><small>{{ finished.endTime | DateFormat }}</small></p>
                <b-dropdown variant="link" right size="sm" no-caret>
                  <template #button-content>
                    <b-icon icon="caret-down"></b-icon>
                  </template>
                  <b-dropdown-item @click="deleteBacklog(finished.backlogId,true)"><b-icon icon="exclamation-circle" variant="danger"></b-icon> 删除</b-dropdown-item>
                </b-dropdown>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </template>
    </b-sidebar>
    <b-modal ref="create_backlog">
      <b-form-textarea
        placeholder="标题"
        rows="3"
        no-resize
        v-model="backlog_title"
      ></b-form-textarea>
      <b-form-textarea
        placeholder="描述"
        rows="3"
        no-resize
        v-model="backlog_description"
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
      <template #modal-footer="{send}">
        <b-button size="mm" variant="primary" @click="createBacklog">
          确定
        </b-button>
      </template>
    </b-modal>

    <b-modal ref="update_backlog">
      <b-form-textarea
        placeholder="标题"
        rows="3"
        no-resize
        v-model="backlog_title"
      ></b-form-textarea>
      <b-form-textarea
        placeholder="描述"
        rows="3"
        no-resize
        v-model="backlog_description"
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
      <template #modal-footer="{send}">
        <b-button size="mm" variant="primary" @click="updateBacklog">
          确定
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {getUncheckedCount} from "../api/notification";
import {
  createBacklog,
  deleteBacklog,
  finishBacklog,
  getFinishedBackLogs,
  getNotFinishedBackLogs,
  updateBacklog
} from "../api/backlog";
import {haveAuthority} from "../api/company";

export default {
  name: "Header",
  data() {
    return {
      backlog_title: '',
      backlog_description: '',
      backlog_endDate: '2020-1-3',
      backlog_endTime: '13:20:00',
      backlog_id: 0,
      unfinished_list: [
      ],
      finished_list: [
      ],
      uncheckedCount: null,
      intervalId: null,
      //是否为管理员
      haveAuthority:false
    }
  },
  methods: {
    showRouter() {
      console.log(this.$route)
    },
    getBacklog() {
      this.getFinishedList()
      this.getUnfinishedList()
    },
    //获取未完成待办
    getUnfinishedList() {
      let _this = this
      getNotFinishedBackLogs().then(res => {
        if(res.data.status === 'success') {
          console.log(res.data.data)
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.unfinished_list = jsonObj
          console.log(_this.unfinished_list)
        }
        else {
          alert("待办获取失败，"+res.data.data.errMsg)
          if(res.data.data.errCode === 1||res.data.data.errCode === 20012) {
          //跳回登陆界面
          this.$router.push("/")
        }
      }
      }).catch(err => {
        alert("待办获取失败!")
        console.log(err)
      })
    },
    //获取已完成待办
    getFinishedList() {
      let _this = this
      getFinishedBackLogs().then(res => {
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.finished_list = jsonObj
        }
        else {
          alert("待办获取失败，"+res.data.data.errMsg)
          if(res.data.data.errCode === 1||res.data.data.errCode === 20012) {
            //跳回登陆界面
            this.$router.push("/")
          }
        }
      }).catch(err => {
        alert("待办获取失败!")
        console.log(err)
      })
    },
    refresh() {
      this.backlog_title=''
      this.backlog_description=''
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      this.backlog_endDate = ""+year+"-"+month+"-"+day
      this.backlog_endTime = ""+hour+":"+minute
    },
    create() {
      this.refresh()
      this.$refs['create_backlog'].show()
    },
    createBacklog() {
      let endTime = this.backlog_endDate + " " + this.backlog_endTime
      createBacklog(this.backlog_title, this.backlog_description, endTime).then(res => {
        if(res.data.status === 'success') {
          alert("添加成功")
          this.getUnfinishedList()
          this.$refs['create_backlog'].hide();
        }
      }).catch(err => {
        console.log(err)
      })
    },
    update(unfinished) {
      this.backlog_title = unfinished.title
      this.backlog_description = unfinished.description
      let date = new Date(unfinished.endTime)
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      this.backlog_endDate = ""+year+"-"+month+"-"+day
      this.backlog_endTime = ""+hour+":"+minute
      this.$refs['update_backlog'].show()
      this.backlog_id = unfinished.backlogId
    },
    updateBacklog() {
      let endTime = this.backlog_endDate + " " + this.backlog_endTime
      updateBacklog(this.backlog_id, this.backlog_title, this.backlog_description, endTime).then(res => {
        if(res.data.status === 'success') {
          alert("编辑成功")
          this.getUnfinishedList()
          this.$refs['update_backlog'].hide();
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getUncheckedCount() {
      //用户尚未登录，退出函数
      if(this.$route.name === 'Login' || this.$route.name === 'Registration') {
        return
      }
      let this_ = this
      getUncheckedCount().then(res => {
        if(res.data.status === 'success') {
          this_.uncheckedCount = res.data.data.count
          alert(this_.uncheckedCount)
        }
        else {
          alert("消息获取失败！")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //完成
    finishBacklog(backlogId) {
      finishBacklog(backlogId).then(res => {
        if(res.data.status === 'success') {
          this.getUncheckedCount()
          this.getUnfinishedList()
          this.getFinishedList()
        }
        else {
          alert("设置失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //删除
    deleteBacklog(backlogId,isFinish) {
      deleteBacklog(backlogId).then(res => {
        if(res.data.status === 'success') {
          alert("删除成功")
          this.getUncheckedCount()
          if(isFinish) {
            this.getFinishedList()
          }
        else {
            this.getUnfinishedList()
          }
        }
        else {
          alert("删除失败")
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    let _this = this
    //是否为管理员
    haveAuthority().then(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.data.data));
      //console.log(jsonObj)
      _this.haveAuthority = jsonObj==="admin";
      //console.log(_this.haveAuthority)
    })
  }
}
</script>

<style scoped>
nav {
  background:#434343
}
</style>
