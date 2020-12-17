
<template>
  <div class="home">
    <br>
    <template>
      <div>
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            :caption="greeting"
            img-src="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/back/bacbkground1.jpg"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/back/bacbkground2.jpg">
            <h3>感谢您使用我们的产品</h3>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide  img-src="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/back/bacbkground3.jpg"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://officesystem-1304131169.cos.ap-nanjing.myqcloud.com/officesystemCloudFile/back/bacbkground4.jpg"
                alt="image slot"
              >
            </template>
          </b-carousel-slide>

        </b-carousel>

      </div>
    </template>

  </div>
</template>

<script>

export default {
  data(){
    return{
      name:'',
      slide: 0,
      sliding: null,
      greeting:"",
    }
  },
  methods:{
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    getcookie(objName){//获取指定名称的cookie的值
      let arrStr = document.cookie.split("; ");
      for(let i = 0;i < arrStr.length;i ++){
        let temp = arrStr[i].split("=");
        if(temp[0] === objName) return unescape(temp[1]);
      }
    },

  },
  mounted() {
    this.name=this.getcookie("userName");
    this.greeting="尊敬的"+this.name+"，您好！";
    var userId = this.getcookie("userId");
    let _this = this
    //开启连接
    var url = "ws://localhost:9000/ws/"+userId
    if(this.socket != null) {
      this.socket.close()
      this.socket = null
    }
    this.socket = new WebSocket(url)
    this.socket.onopen = function () {
      console.log("connected")
      //上线，接收未阅消息数
      _this.$emit("get-count")
    }
    this.socket.onmessage = function (message) {
      //收到消息，提醒对方
      _this.$emit("get-count")
    }
    this.socket.onclose = function () {
      console.log("closed")
    }
  }
}
</script>

<style scoped>

</style>
