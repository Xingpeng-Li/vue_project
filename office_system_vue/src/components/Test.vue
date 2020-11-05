<template>
  <div class="test">
    <input type="button" @click="getP" value="get">
    <input type="button" @click="post" value="post">
  </div>
</template>

<script>
import {getTest} from "../api/test";
import {postTest} from "../api/test";

export default {
  name: "Test",
  methods: {
    getP() {
      getTest().then(res => {
        res.data
      }).catch(err => {
        console.log(err)
      })
    },
    post() {
      postTest().then(res => {

      }).catch(err=> {

      })
    }
  }
}
</script>

<style scoped>

</style>
