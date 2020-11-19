<template>
  <div class="myNavbar" v-if="$route.meta.showNav">
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <b-navbar-brand href="#">Office System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item style="margin-right: 10px">通讯录</b-nav-item>
          <b-nav-item style="margin-right: 10px">会议</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/cloudfile" :active="$route.name === 'CloudFile'">云空间</b-nav-item>
          <b-nav-item style="margin-right: 10px" to="/message" :active="$route.name === 'Message'">消息</b-nav-item>
          <b-nav-item style="margin-right: 10px" >公告栏</b-nav-item>
          <b-nav-item style="margin-right: 10px" href="#">聊天</b-nav-item>
          <b-nav-item-dropdown style="margin-right: 10px" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              应用
            </template>
            <b-dropdown-item to="/approval" :active="$route.name === 'Approval'">请假审批</b-dropdown-item>
            <b-dropdown-item to="/report" :active="$route.name === 'Report'">工作报告</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

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
  </div>
</template>

<script>
export default {
  name: "Header",
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
