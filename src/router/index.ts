import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/MainPage.vue';
import SingUp from '@/components/RegistrationPage.vue';
import Terms from '@/components/TermsPage.vue';
import Privacy from '@/components/PrivacyPage.vue';
import Login from '@/components/LoginPage.vue';
import UserPage from '@/components/UserPage.vue';
import CafePage from '@/components/CafePage.vue';
import UserOrders from '@/components/UserOrders.vue';
import UserHistory from '@/components/UserHistory.vue';
import CafeOrders from '@/components/CafeOrders.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
        { path: '/', component: Main },
        { path: '/login', component: Login },
        { path: '/registration', component: SingUp },
        { path: '/terms', component: Terms },
        { path: '/privacy-policy', component: Privacy },
        { path: '/user-profile/:uid', component: UserPage, props:true,},
        { path: '/user-profile/:uid/history', component: UserHistory, props:true},
        { path: '/user-profile/:uid/orders', component:UserOrders,props:true},
        { path: '/cafe-profile/:uid', component: CafePage, props:true},
        { path: '/cafe-profile/:uid/orders', component:CafeOrders, props:true}
  ]
});



export default router
