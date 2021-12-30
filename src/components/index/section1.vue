<template>
    <div>
        <div>section 1</div>
        <button class="text-[#3a7bff]" @click="showSection2">show section 2</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection2 = () => {
          router.push('/section2')
        }
        return {
          showSection2
        }
      }
    }
</script>