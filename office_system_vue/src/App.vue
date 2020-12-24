<template>
  <div id="app">
    <MyNavBar ref="navBar"></MyNavBar>
    <router-view class="router" @get-count="getCount"/>
  </div>
</template>

<script>
import MyNavBar from "./components/MyNavbar";
export default {
  name: 'App',
  components: {
    MyNavBar
  },
  methods: {
    getCount(){
      this.$refs['navBar'].getUncheckedCount()
    }
  }
}
</script>

<style>
.router {
  margin-top: 60px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
