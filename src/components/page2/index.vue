<template>
  <div id="page2" class="page2">
    <h3>This is page2</h3>
    <img src="../../assets/img/timg.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  props: [],
  components: {},
  data() {
    return {}
  },
  created() {
    console.log(process.env)
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
  img {
    width: 100%;
  }
}
</style>