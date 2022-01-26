<template>
<div >
  <Header />
  <vue-confirm-dialog></vue-confirm-dialog>
  <div class="echarts">    
    <IEcharts
      :option="bar"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
    />    
    <button type="button" class="btn btn-primary btn-sm" v-on:click="getList"> Cargar datos</button>
  </div>
  <Footer />
</div>
</template>

<script type="text/babel">
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import client from "../api";

  import Vue from 'vue';
  import VueToast from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-default.css';

  import VueConfirmDialog from 'vue-confirm-dialog'
  Vue.use(VueConfirmDialog)
  Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
  Vue.use(VueToast);
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    name: 'Reporte',
    components: {
      IEcharts,
      Header,
      Footer
    },
    props: {
    },
    data: () => ({
      listDias: [],
      loading: true,
      bar: {
        title: {
          text: 'Reporte de Ventas'
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: 'Pagos',
          type: 'bar',
          data: []
        }]
      }
    }),
    mounted(){
     this.getList();
     this.doRandom(); 
    },
    methods: {
      doRandom() {
        const that = this;
        let dataYAxis = [];
        let dataXAxis = [];
        this.getList();
        for (var dia in this.listDias) {
          dataXAxis.push(this.listDias[dia].created_at);
          dataYAxis.push(this.listDias[dia].full_payment);
        }
        that.bar.xAxis.data =dataXAxis;
        that.loading = !that.loading;
        that.bar.series[0].data = dataYAxis;

      },
      onReady(instance, ECharts) {
        console.log(instance, ECharts);
      },
      onClick(event, instance, ECharts) {
        console.log(instance, ECharts);
      },
      getList: function () {
            client.get("api/v1/bills/dias").then((res) => {
                this.listDias = res.data.bills;
                const that = this;
                let dataYAxis = [];
                let dataXAxis = [];
                 for (var dia in this.listDias) {
                    dataXAxis.push(this.listDias[dia].created_at);
                    dataYAxis.push(this.listDias[dia].full_payment);
                  }
                  that.bar.xAxis.data =dataXAxis;
                  that.bar.series[0].data = dataYAxis;
                })
            .catch((error) => {
                console.error(error);
        });
      }, 
      created: function () {
        this.getList();
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