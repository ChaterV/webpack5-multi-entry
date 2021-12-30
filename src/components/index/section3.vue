<template>
    <div>
        <div>section 3</div>
        <button class="text-[#3a7bff]" @click="showSection1">show section 1</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection1 = () => {
          router.push('/')
        }
        return {
          showSection1
        }
      }
    }
</script>