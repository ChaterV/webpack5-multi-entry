<template>
    <div>
        <div>section 1</div>
        <button @click="showSection2">show section 2</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection2 = () => {
          router.push('/bbb')
        }
        return {
          showSection2
        }
      }
    }
</script>