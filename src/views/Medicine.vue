<template>
<div >
    <Header />
    
    <vue-confirm-dialog></vue-confirm-dialog>
    
    <div class="container">
     
        <div class="row">
            <div class="col-sm-10 ">
             <div align="left">
     <h3>Gestionar Medicamentos</h3>
      <button type="button" class="btn btn-primary btn-sm" v-on:click="add()"> Agregar Medicamento</button>
    </div>               
                <br /><br />
                <table class="table table-hover">
                    <thead>
                        <tr variant="info">
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Ubicación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                        
                        <tr v-for="(d, index) in medicines " :key="index">
                            <td>{{ d.id }} </td>
                            <td>{{ d.name }}</td>
                            <td>{{ d.price }}</td>
                            <td>{{ d.location }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary btn-sm" @click="edit(d.id)">
                                        Update
                                    </button>
                                    <button type="button" class="btn btn-warning btn-sm" @click="onDelete(d.id)">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div>
    
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
    name: "AcademicPeriod",
    data: function () {
        return {
            medicines: [],
        };
    },
    components: {
        Header,
        Footer
    },
    methods: {
        edit: function (id) {
            this.$router.push("academicperiod/form/" + id);
        },
        add: function () {
            this.$router.push("academicperiod/form");
        },
        getList: function () {
            client.get("api/v1/medicines").then((res) => {
                this.medicines = res.data.medicines;
                })
            .catch((error) => {
                console.error(error);
        });
        },
        onDelete: function (d) {
            this.$confirm({
                message: `¿Estás seguro de eliminar?`,
                button: {
                    no: 'No',
                    yes: 'Si'
                },
                /**
                 * Callback Function
                 * @param {Boolean} confirm 
                 */
                callback: confirm => {
                    if (confirm) {
                        this.delete(d);
                    }
                }
            })

        },
        delete: function (id) {
            client.delete(`api/v1/medicines/${id}`).then(() => {
                Vue.$toast.open({
                        message: 'Se Eliminó Correctamente',
                        type: 'error',
                        position: 'top-right'
                    });
                this.getList();
        })
        .catch((error) => {
            console.error(error);
            this.getList();
        });
        },
    },
    created: function () {
        this.getList();
    },
};
</script>

<style scoped>
.izquierda {
    text-align: left;
}
#container {
    /* ... */
    padding-bottom: 81px; /* El tamaño del footer para evitar el sobreposicionamiento */
}

</style>
