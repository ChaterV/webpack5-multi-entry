import './page2.scss'
import '../../components/index/section1'
import '../../components/index/section2'
import '../../components/index/section3'
import Vue from 'vue'

Vue.component('page2', {
    template: (
        `<div v-cloak>
            <section1 
                v-if="isSection1"
                @showSection2="showSection2"
            />
            <section2
                v-if="isSection2"
                @showSection3="showSection3"
             />
            <section3 
                v-if="isSection3"
                @showSection1="showSection1"
            />
            <button @click="toIndex">to index</button>
        </div>`
    ),
    data() {
        return {
            isSection1: true,
            isSection2: false,
            isSection3: false,
        }
    },
    mounted() {
      console.log(process)
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
        toIndex() {
            window.location.href = './index.html'
        },
    }
})
new Vue({
    el: '#page2'
})

