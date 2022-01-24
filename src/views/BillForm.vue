<template>
<div>
    <Header />
    <div class="container">
        <form action="" @submit="onSubmit" class="form-horizontal">
            <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Fecha Creación </label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" name="created_at" id="created_at" v-model="d.created_at" required>
                    </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2">Pago Total</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="full_payment" id="full_payment" v-model="d.full_payment" required>
                </div>
            </div>
            <!--<div class="form-group left">
                <label for="" class="control-label col-sm-2">Curso</label>
                <div class="col-sm-10">                    
                    <select class="form-control" name="sel_cursos" id="sel_cursos" v-model="d.curso_id">
                      <option value="" disabled>Elegir un Curso</option>
                      <option v-for="curso in listCurso" :key="curso.ID" :value="curso.ID">{{curso.ID + " - " + curso.name}}</option>
                    </select>
                </div>                
            </div>-->                     

             <div class="form-group">
                <button type="submit" class="btn btn-primary">Guardar</button>
                <b-button type="reset" variant="secondary">Limpiar</b-button>
                <button type="button" class="btn btn-warning margen" v-on:click="salir()">Salir</button>                
            </div>
        </form>
    </div>
    <Footer />
</div>
</template>

<script>
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

export default {
  name: "BillForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        id: "",
        created_at: "",
        full_payment: "",
      },
    };
  },
   components: {
        Header,
        Footer
    },
  methods: {
    
    back: function () {this.$router.push("/bill");},

    create: function (payload) {
      client.post("api/v1/bills", payload)
        .then(() => {
          Vue.$toast.open({
            message: 'Se agrego Correctamente. ',
            type: 'success',
            position: 'top-right'
            });
        this.message = "Academic Plan added!";
        this.$router.push("/bill?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      //  this.d.name="";
      //  this.d.status=""; 
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        id: this.d.id,
        created_at: this.d.created_at,
        full_payment: this.d.full_payment,

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

    getById: function (id) {client.get(`api/v1/bills/${id}`).then((res) => {
          this.d = res.data.bill;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /*getLevelList: function () {
            client.get("api/v1/bills").then((res) => {
                this.listLevel = res.data.r;
                })
            .catch((error) => {
                console.error(error);
        });
        },*/
        
    update: function (payload, id) {
      client.put(`api/v1/bills/${id}`, payload)
        .then(() => {
          Vue.$toast.open({
                        message: 'Se Actualizó Correctamente a ' + payload.id,
                        type: 'info',
                        position: 'top-right'
        });

          this.message = "Academic Plan updated!";
          this.$router.push("/bill?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
        });
    },
    salir() {
            this.$router.push("/bill");
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