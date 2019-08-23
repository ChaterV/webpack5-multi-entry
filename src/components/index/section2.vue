<template>
    <div>
        <div>section 2</div>
        <button @click="showSection3">show section 3</button>
    </div>
</template>

<script>
    export default {
        methods: {
            showSection3() {
                this.$emit('showSection3')
            }
        }
    }
</script>

<style scoped>

</style>