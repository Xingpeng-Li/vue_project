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
            img-src="http://5b0988e595225.cdn.sohucs.com/images/20200114/fb215e1ce017440a8649cd14bc9b961f.jpeg"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="http://b1-q.mafengwo.net/s13/M00/BA/46/wKgEaVx9wIeAJtfOAAOASQsITU060.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90">
            <h3>感谢您使用我们的产品</h3>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide  img-src="http://www.sinaimg.cn/dy/slidenews/19_img/2014_34/3366_3620424_102361.jpg"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="http://5b0988e595225.cdn.sohucs.com/images/20200114/e7621a6181e147a49cf72613412d26fd.jpeg"
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
      name:'某某',
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
    }
  },
  mounted() {
    this.greeting="尊敬的"+this.name+"，您好！";
  }
}
</script>

<style scoped>

</style>
