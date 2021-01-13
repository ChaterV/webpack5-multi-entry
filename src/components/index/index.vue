<template>
    <div v-cloak>
<!--        <section1-->
<!--                v-if="isSection1"-->
<!--                @showSection2="showSection2"-->
<!--        />-->
<!--        <section2-->
<!--                v-if="isSection2"-->
<!--                @showSection3="showSection3"-->
<!--        />-->
<!--        <section3-->
<!--                v-if="isSection3"-->
<!--                @showSection1="showSection1"-->
<!--        />-->
        <router-view></router-view>
        <button @click="toPage1">to page1</button>
    </div>
</template>

<script>
    import section1 from "@/components/index/section1"
    import section2 from "@/components/index/section2"
    import section3 from "@/components/index/section3"
    export default {
        components: { section1, section2, section3 },
        data() {
            return {
                isSection1: false,
                isSection2: false,
                isSection3: false,
            }
        },
        mounted() {

        },
        methods: {
            showSection1() {
                this.isSection1 = true
                this.isSection2 = false
                this.isSection3 = false
            },
            showSection2() {
                this.isSection1 = false
                this.isSection2 = true
                this.isSection3 = false
            },
            showSection3() {
                this.isSection1 = false
                this.isSection2 = false
                this.isSection3 = true
            },
            toPage1() {
                // window.location.href = './index.html#/aaa'
                this.$router.push('/aaa')
            }
        }
    }
</script>

<style scoped>

</style>