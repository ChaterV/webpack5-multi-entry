<template>
  <div id="page2-tp" class="page2">
    <h3>This is page2</h3>
    <div class="imgs">
      <h5>iconfont:</h5>
      <i class="iconfont icon-gouxuan"></i>
      <i class="iconfont icon-gouwu"></i>
      <i class="iconfont icon-mima"></i>
      <i class="iconfont icon-baobiao"></i>
    </div>
    <div class="imgs">
      <h5>audio:</h5>
      <audio src id="buttonAudio"></audio>
      <button class="m_btn">播放音频</button>
    </div>
    <div class="imgs">
      <h5>html image:</h5>
      <img src="../../assets/images/timg.jpg" alt />
    </div>
    <div class="bg">
      <h5>css background image</h5>
    </div>
    <div class="imgs jsimg">
      <h5>js image data return string:</h5>
      <img :src="img1" alt />
    </div>
    <div class="imgs jsimg">
      <h5>js image import from ../../assets/.... :</h5>
      <img :src="img2" alt />
    </div>
    <div class="imgs jsimg">
      <h5>js image import from @/assets/.... :</h5>
      <img :src="img3" alt />
    </div>
  </div>
</template>

<script>
import audio from "../../assets/biubiu.mp3";
import img2 from "../../assets/images/timg.jpg";
import img3 from "@/assets/images/timg.jpg";
export default {
  name: "",
  props: [],
  components: {},
  data() {
    return {
      // img1: '../../assets/images/timg.jpg', // 这样不行，需要绝对路径
      img1:
        "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2992289201,1546493273&fm=26&gp=0.jpg",
      img2: img2,
      img3: img3
    };
  },
  created() {

  },
  mounted() {},
  updated() {},
  beforeUnmount() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
 #page2-tp {
   display: flex;
   flex-direction: column;
}
#page2-tp h3 {
  color: #f74b57;
  text-align: center;
}
#page2-tp .imgs {
  margin: 10px;
  text-align: center;
}
#page2-tp img {
  width: 50%;
}
#page2-tp #buttonAudio {
  display: none;
}
#page2-tp .bg {
  margin: 10px auto;
  width: 500px;
  height: 300px;
  background: url(../../assets/images/timg.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
  color: #f74b57;
  text-align: center;
  opacity: .8;
  transform: translateX(-20px);
}
</style>