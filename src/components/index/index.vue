<template>
    <div v-cloak class="w-[300px] mt-[20px]">
<!--        <section1-->
<!--                v-if="section.isSection1"-->
<!--                @showSection2="showSection('isSection2')"-->
<!--        />-->
<!--        <section2-->
<!--                v-if="section.isSection2"-->
<!--                @showSection3="showSection('isSection3')"-->
<!--        />-->
<!--        <section3-->
<!--                v-if="section.isSection3"-->
<!--                @showSection1="showSection('isSection1')"-->
<!--        />-->
        <router-view />
        <button class="mr-[10px] bg-[#3a7bff] p-[10px] text-[#fff] rounded-[5px] hover:bg-[#1c63c9] transform-gpu transition-all" @click="toPage1">to page1</button>
        <button @click="toRouter">to router</button>
    </div>
</template>

<script>
    // import section1 from "@/components/index/section1"
    // import section2 from "@/components/index/section2"
    // import section3 from "@/components/index/section3"
    import { reactive, toRefs } from 'vue'
    import router from '@/router/index'
    export default {
        // components: {
        //   'section1': section1,
        //   'section2': section2,
        //   'section3': section3,
        // },
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
        const toPage1 = () => {
          window.location.href = 'page1.html'
        }
        const toRouter = () => {
          router.push('/aaa')
        }
        return {
          ...dataAsRef,
          showSection,
          toPage1,
          toRouter
        }
      }
    }
</script>

<style lang="scss">
@import "src/css/common.scss";
</style>