<template>
<div >
    <Header />
    
    <vue-confirm-dialog></vue-confirm-dialog>
    
    <div class="container"> 
        <div class="row">
            <div class="col-sm-12 ">
             <div align="left">
                <h3>Simular Ventas</h3>
                <br /><br />
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Medicamento</label>
                    <div class="col-sm-10">                    
                        <select class="form-control" name="sel_medicamentos" id="sel_medicamentos" v-model="listPagina.idMedicine" v-on:change="onChange(listPagina.idMedicine)">
                        <option value="" disabled>Elegir medicamento</option>
                        <option v-for="Medicamento in listMedicines" :key="Medicamento.id" :value="Medicamento.id">{{Medicamento.id + " - " + Medicamento.name}}</option>
                        </select>
                    </div>
                    <div class="form-group left">
                        <label for="" class="control-label col-sm-2">Precio</label>
                        <div class="col-sm-10">
                            <input type="text" disabled class="form-control" name="precio" id="precio" v-model="listPagina.precio" required>
                        </div>
                        <div class="form-group left">
                            <label for="" class="control-label col-sm-2">Cantidad</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="cantidad" id="cantidad" v-model="listPagina.cantidad" required>
                            </div>
                        </div>
                    </div>                
                </div>
                <button type="button" class="btn btn-primary btn-sm" v-on:click="add()"> Agregar Medicamento</button>
            </div>
             
            <br /><br />
            <table class="table table-hover" >
                <thead>
                    <tr variant="info">
                        <th scope="col">Medicamento</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d, index) in list" :key="index">
                        <td>{{ d.name }} </td>
                        <td>{{ d.precio }}</td>
                        <td>{{ d.cantidad }}</td>                            
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-warning btn-sm" @click="onDelete(d.id)">
                                     Delete
                                </button>
                             </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br /><br />
            <h3>Seleccionar Promoción</h3>
            <div class="col-sm-12 ">
             <div align="left">                                
                <div class="form-group left">
                    <label for="" class="control-label col-sm-2">Promoción</label>
                    <div class="col-sm-10">                    
                        <select class="form-control" name="sel_promotions" id="sel_promotions" v-model="listPromotions.id" v-on:change="onChangePromotions(listPromotions.id)">
                        <option value="" disabled>Elegir promoción</option>
                        <option v-for="promocion in listPromotions" :key="promocion.id" :value="promocion.id">{{promocion.id + " - " + promocion.description + " - " + promocion.percentage + "% " }}</option>
                        </select>
                    </div>
                    <div class="form-group left">
                        <div class="form-group left">
                            <label for="" class="control-label col-sm-2">Pago total</label>
                            <div class="col-sm-10">
                                <input type="text" disabled class="form-control" name="pagoTotal" id="pagoTotal" v-model="pagoTotal" required >
                            </div>
                        </div>
                    </div>                
                </div>
                <button type="button" class="btn btn-primary btn-sm" v-on:click="simular()"> Simular</button>
            </div>
            </div>

        </div>
     </div>
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
    name: "Simulacion",
    data: function () {
        return {
            listPagina: 
                {
                    idMedicine: "",
                    name: "",
                    precio: "",
                    cantidad: ""
                },
            listMedicines: [],
            listPromotions: [],
            list: [],
            porcent: "",
            pagoTotal: ""
        };
    },
    components: {
        Header,
        Footer
    },
    methods: {
        onChange(d) {            
            this.getPrecio(d); 
        },
        onChangePromotions(d) {            
            this.getPorcentaje(d); 
        },
        edit: function (id) {
            this.$router.push("bill/form/" + id);
        },
        simular: function () {

            let pago = 0;
            let descuento = 0
            for (var i in this.list) {
                pago += parseFloat(this.list[i].precio) * parseFloat(this.list[i].cantidad);                
                descuento = parseFloat(this.porcent /100)                 
                this.pagoTotal = pago - (pago * descuento)
            }   
        },
        add: function () {
            if(this.listPagina.precio!="" &&this.listPagina.idMedicine!="" &&this.listPagina.cantidad!=""){
              this.list.push({idMedicine:this.listPagina.idMedicine, name:this.listPagina.name, precio:this.listPagina.precio, cantidad:this.listPagina.cantidad});
              this.limpiar();
          }
          else{
              Vue.$toast.open({
                        message: 'Se deben ingresar los datos del medicamento',
                        type: 'error',
                        position: 'top-right'
                    });
          }
        },
        getListMedicines: function () {
            client.get("api/v1/medicines").then((res) => {
                this.listMedicines = res.data.medicines;
                })
            .catch((error) => {
                console.error(error);
        });
        },
        getListPromotions: function () {
            client.get("api/v1/promotions").then((res) => {
                this.listPromotions = res.data.promotions;
                })
            .catch((error) => {
                console.error(error);
        });
        },
        getPrecio: function (d) {
            for (var i in this.listMedicines) {

                if (this.listMedicines[i].id == d){                    
                    this.listPagina.precio = this.listMedicines[i].price;
                    this.listPagina.name = this.listMedicines[i].name;
                }
            }
        },
        getPorcentaje: function (d) {
            for (var i in this.listPromotions) {

                if (this.listPromotions[i].id == d){                    
                    this.porcent = this.listPromotions[i].percentage;
                }
            }
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
            for (var i in this.list) {
                 if(this.list[i].id==id){
                     this.list.splice(i, 1);
                 }
            }
            this.limpiar();
            Vue.$toast.open({
                message: 'Se Eliminó Correctamente',
                type: 'error',
                position: 'top-right'
            });
            this.getListMedicines();
            this.getListPromotions();        
        },
        limpiar: function () {  
            this.listPagina.idMedicine = "";
            this.listPagina.precio = "";
            this.listPagina.cantidad = "";
            this.listPagina.name = "";
            this.pagoTotal = "";
        }
    },
    created: function () {
        this.getListMedicines();
        this.getListPromotions();
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
