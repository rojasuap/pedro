<template>
<div>
    <Header />
    <div class="container">
        <form action="" @submit="onSubmit" class="form-horizontal">
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Descripción</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="description" id="description" v-model="d.description" required>
                </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Porcentaje</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="percentage" id="percentage" v-model="d.percentage" required>
                </div>
            </div>           
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Fecha Inicio</label>
                    <div class="col-sm-7">
                        <input type="date" class="form-control" name="start_date" id="start_date" v-model="d.start_date" required>
                    </div>
                </div>
            </div>  
            <div class="form-group left row">
                <div class="col">
                    <label for="" class="control-label col-sm-3">Fecha Fin</label>
                    <div class="col-sm-7">
                        <input type="date" class="form-control" name="end_date" id="end_date" v-model="d.end_date" required>
                    </div>
                </div>
            </div>            
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Guardar</button>
                <b-button type="reset" variant="secondary">Limpiar</b-button>
                <button type="button" class="btn btn-warning margen" v-on:click="salir()">Salir</button>
            </div>
        </form>
    </div>
   <!-- <Footer />  -->
</div>
</template>

<script>
import Header from '@/components/Header.vue';
//import Footer from '@/components/Footer.vue';
import client from "../api";

import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(VueToast);

export default {
  name: "PersonForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        id: "",
        description: "",
        percentage: "",
        start_date: "",
        end_date: "",
      },

    };
  },
   components: {
        Header
    },
  methods: {
    
    back: function () {this.$router.push("/persons");},

    create: function (payload) {
      client.post("api/v1/promotions", payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
            message: 'Se agrego Correctamente a ' + payload.description,
            type: 'success',
            position: 'top-right'
            });
        this.message = "Promotion added!";
        this.$router.push("/persons?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
        this.d.description="";
        this.d.percentage="";
        this.d.start_date="";
        this.d.end_date="";
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        description: this.d.description,
        percentage: this.d.percentage,
        start_date: this.d.start_date,
        end_date: this.d.end_date,
      };
      if (this.d.id > 0) {
        this.update(payload, this.d.id);
      } else {
        this.create(payload);
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },

    getById: function (id) {client.get(`api/v1/promotions/${id}`).then((res) => {
          this.d = res.data.promotion;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    update: function (payload, id) {
      client.put(`api/v1/promotions/${id}`, payload)
        .then(() => {
          console.log(payload);
          Vue.$toast.open({
                        message: 'Se Actualizó Correctamente a ' + payload.description,
                        type: 'info',
                        position: 'top-right'
        });

          this.message = "Promotion updated!";
          this.$router.push("/persons?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
          //this.getBooks();
        });
    },
    salir() {
            this.$router.push("/persons");
        },
  },

  created: function () {
    this.d.id = this.$route.params.id;
    if (this.d.id > 0) {
      this.getById(this.d.id);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
    text-align: left;
}
#container {
    /* ... */
    padding-bottom: 81px; /* El tamaño del footer para evitar el sobreposicionamiento */
}
</style>