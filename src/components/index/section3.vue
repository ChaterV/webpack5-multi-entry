<template>
    <div>
        <div>section 3</div>
        <button @click="showSection1">show section 1</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection1 = () => {
          router.push('/aaa')
        }
        return {
          showSection1
        }
      }
    }
</script>