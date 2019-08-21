Vue.component('section3', {
    template: (
        `<div>
              <div>section 3</div>
              <button @click="showSection1">show section 1</button>
        </div>`
    ),
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        showSection1() {
            this.$emit('showSection1')
        }
    }
})


