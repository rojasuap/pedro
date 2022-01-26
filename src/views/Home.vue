<template>
  <div class="text-red-600 font-mono text-3xl font-bold">
  <Header />
  <h1>Hola soy Home</h1>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: "Home",
    components: {
        Header
    },
};
</script>


<style scoped>

</style>