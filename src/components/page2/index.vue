<template>
  <div id="page2" class="page2">
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
      <audio src="" id="buttonAudio"></audio>
      <button class="m_btn">播放音频</button>
    </div>
    <div class="imgs">
      <h5>image:</h5>
      <img src="../../assets/img/timg.jpg" alt="">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import audio from '../../assets/biubiu.mp3';
export default {
  name: '',
  props: [],
  components: {},
  data() {
    return {}
  },
  created() {
    console.log(process.env)
    Vue.prototype.clickButton = () => {
      let buttonAudio = document.getElementById('buttonAudio');
      buttonAudio.setAttribute('src',audio);
      buttonAudio.play();
    }
    document.body.addEventListener('click',function( e ){
      let event = e || window.event;
      let target = event.target || event.srcElement;
      let clickMusic = target.getAttribute('class') || '';
      // console.log('clickMusic',clickMusic)
      if(clickMusic.indexOf('m_btn') > -1 || clickMusic.indexOf('ivu-btn') > -1) {
        Vue.prototype.clickButton();
      } else {
        return false;
      }
      // Vue.prototype.clickButton();
    });
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="scss">
#page2 {
  h3 {
    color: #f74b57;
    // font-size: 30px;
  }
  .imgs {
    margin: 10px;
    text-align: center;
  }
  img {
    width: 50%;
  }
  #buttonAudio {
    display: none;
  }
}
</style>