import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Medicine from '../views/Medicine.vue';
import MedicineForm from '../views/MedicineForm.vue';

import Promotion from '../views/Promotion.vue';
import PromotionForm from '../views/PromotionForm.vue';

import Bill from '../views/Bill.vue';
import BillForm from '../views/BillForm.vue';

import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';

import Simulacion from '../views/Simulacion.vue';

import Reporte from '../views/Reporte.vue';
import Principal from '../views/UserPrincipal/Principal.vue';



Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/promotion',
            name: 'Promotion',
            component: Promotion,
        },
        {
            path: '/promotion/form',
            name: 'PersonForm',
            component: PromotionForm,

        },
        {
            path: '/promotion/form/:id',
            name: 'PromotionForm',
            component: PromotionForm,
        },
        {
            path: '/medicine',
            name: 'Medicione',
            component: Medicine,
        },
        {
            path: '/medicine/form',
            name: 'Medicine',
            component: MedicineForm,

        },
        {
            path: '/medicine/form/:id',
            name: 'Medicine',
            component: MedicineForm,
        },        
       {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/bill',
            name: 'Bill',
            component: Bill,
        },
        {
            path: '/bill/form',
            name: 'BillForm',
            component: BillForm,

        },
        {
            path: '/bill/form/:id',
            name: 'BillForme',
            component: BillForm,
        },
        {
            path: '/reporte',
            name: 'Reporte',
            component: Reporte,
        },
        {
            path: '/simulacion',
            name: 'Simulacion',
            component: Simulacion,
        },
        {
            path: '/',
            name: 'Principal',
            component: Principal,
        },
    ],
});

let whiteRoutes = [
    "LoginForm",
    "Home",
    "Login",
]

router.beforeEach((to, from, next) => {
    console.log(`${from.path} to ${to.path}`);
    let isAuthenticated = false;
    if (localStorage.getItem('user') != null) {
        isAuthenticated = true;
    }
    if (!whiteRoutes.includes(to.name) && !isAuthenticated) {
        //next({ name: 'Login' });
        next();
    } else {
        next();
    }
});

export default router