<template>
  <div id="app">
    <MyNavBar></MyNavBar>
    <router-view class="router"/>
  </div>
</template>

<script>
import MyNavBar from "./components/MyNavbar";
export default {
  name: 'App',
  components: {
    MyNavBar
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
