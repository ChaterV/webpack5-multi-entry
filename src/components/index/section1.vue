<template>
    <div>
        <div>section 1</div>
        <button @click="showSection2">show section 2</button>
    </div>
</template>

<script>
    export default {
        methods: {
            showSection2() {
                this.$emit('showSection2')
            }
        }
    }
</script>

<style scoped>

</style>