<template>
    <div>
        <div>section 2</div>
        <button class="text-[#3a7bff]" @click="showSection3">show section 3</button>
    </div>
</template>

<script>
import router from "@/router";
    export default {
      setup() {
        const showSection3 = () => {
          router.push('/section3')
        }
        return {
          showSection3
        }
      }
    }
</script>