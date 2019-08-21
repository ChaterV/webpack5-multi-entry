import Vue from 'vue'

Vue.component('section2', {
    template: (
        `<div>
              <div>section 2</div>
              <button @click="showSection3">show section 3</button>
        </div>`
    ),
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        showSection3() {
            this.$emit('showSection3')
        }
    }
})


