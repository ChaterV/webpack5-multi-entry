<template>
    <div v-cloak class="w-[300px] my-[20px] mx-auto">
        <router-view />
        <button class="mt-[10px] mr-[10px] bg-[#3a7bff] p-[10px] text-[#fff] rounded-[5px] hover:bg-[#1c63c9] transform-gpu transition-all" @click="toReact">to react page</button>
    </div>
</template>

<script>
    import { reactive, toRefs } from 'vue'
    export default {
      setup() {
        const data = reactive({
          section: {
            isSection1: true,
            isSection2: false,
            isSection3: false,
          }
        })
        const dataAsRef = toRefs(data)
        const showSection = (value) => {
          Object.keys(data.section).forEach(v => {
            data.section[v] = false
          })
          data.section[value] = true
        }
        const toReact = () => {
          window.location.href = 'pageReact.html'
        }
        return {
          ...dataAsRef,
          showSection,
          toReact
        }
      }
    }
</script>

<style lang="scss">
@import "src/css/common.scss";
</style>