<template>
  <div class="text-red-600 font-mono text-3xl font-bold">
  <Header />
  <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: "Home",
    components: {
        Header,
        Footer
    },
};
</script>


<style scoped>

</style>