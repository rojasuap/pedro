<template>
<div >
  <Header />
  <div class="echarts">    
    <IEcharts
      :option="bar"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
    />
    <button @click="doRandom">Random</button>
  </div>
</div>
</template>

<script type="text/babel">
  import Header from '@/components/Header.vue';
  //import Footer from '@/components/Footer.vue';
  //import client from "../api";

  import Vue from 'vue';
  import VueToast from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-default.css';

  import VueConfirmDialog from 'vue-confirm-dialog'
  Vue.use(VueConfirmDialog)
  Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
  Vue.use(VueToast);
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    name: 'Simulacion',
    components: {
      IEcharts,
      Header//,
      //Footer
    },
    props: {
    },
    data: () => ({
      loading: true,
      bar: {
        title: {
          text: 'Reporte de Ventas'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Shirt', 'Pants', 'Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [0, 500, 1000, 1500, 2000, 2500]
        }]
      }
    }),
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 1, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance, ECharts) {
        console.log(instance, ECharts);
      },
      onClick(event, instance, ECharts) {
        console.log(instance, ECharts);
      },
      created: function () {
        this.doRandom();

    },
    }
  };
</script>

<style scoped>
  .echarts {
    width: 600px;
    height: 600px;
    text-align: center;
    margin: 0 auto;
  }
</style>