<template>
  <div class="test">
    <input type="button" @click="getP" value="get">
    <input type="button" @click="post" value="post">
    <div id="allmap" style="width: 0;height: 0; display: none;">点击刷新</div>
  </div>
</template>

<script>
import {getTest} from "../api/test";
import {postTest} from "../api/test";
import {readNotification} from "../api/notification";
import {addUser} from "../api/openvidu";

export default {
  name: "Test",
  data() {
    return {
      data: '1',
      data2: 'true'
    }
  },
  methods: {
    getP() {
      readNotification(this.data).then(res => {
        res.data
      }).catch(err => {
        console.log(err)
      })
    },
    post() {
      addUser(this.data, this.data2).then(res => {

      }).catch(err => {
        alert(err.data.errMsg)
      })
    },
    // getCity() {
    //   let _this = this
    //   var geolocation = new BMap.Geolocation();
    //   console.log(geolocation)
    //   alert(0)
    //   geolocation.getCurrentPosition(function (r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //       alert(this.getStatus())
    //       if (r.accuracy == null) {
    //         alert('您已拒绝地理位置授权');
    //         //用户决绝地理位置授权
    //         return;
    //       } else {
    //         alert("成功")
    //         const myGeo = new BMap.Geocoder()
    //         myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
    //           if (data.addressComponents) {
    //             const result = data.addressComponents
    //             const location = {
    //               creditLongitude: r.point.lat, // 经度
    //               creditLatitude: r.point.lng, // 纬度
    //               creditProvince: result.province || '', // 省
    //               creditCity: result.city || '', // 市
    //               creditArea: result.district || '', // 区
    //               creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
    //             }
    //             _this.location = location;
    //             _this.creditLongitude = location.creditLongitude;
    //             _this.creditLatitude = location.creditLatitude;
    //             _this.creditCity = location.creditCity;
    //             // alert(this.getStatus());
    //           }
    //         })
    //       }
    //     }
    //   })
    // }
  },
  // mounted() {
  //   this.getCity();
  // }
}
</script>

<style scoped>

</style>
