<template>
    <div>
        <div>section 3</div>
        <button @click="showSection1">show section 1</button>
    </div>
</template>

<script>
    export default {
        methods: {
            showSection1() {
                this.$emit('showSection1')
            }
        }
    }
</script>

<style scoped>

</style>