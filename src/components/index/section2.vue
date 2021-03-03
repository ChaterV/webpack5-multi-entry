<template>
    <div>
        <div>section 2</div>
        <button @click="showSection3">show section 3</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection3 = () => {
          router.push('/ccc')
        }
        return {
          showSection3
        }
      }
    }
</script>