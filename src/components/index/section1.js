import Vue from 'vue'

Vue.component('section1', {
    template: (
        `<div>
              <div>section 1</div>
              <button @click="showSection2">show section 2</button>
        </div>`
    ),
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        showSection2() {
            this.$emit('showSection2')
        }
    }
})


