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
import ActiveOrders from '@/components/ActiveOrders.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
        { path: '/', component: Main },
        { path: '/login', component: Login },
        { path: '/registration', component: SingUp },
        { path: '/terms', component: Terms },
        { path: '/privacy-policy', component: Privacy },
        { path: '/user-profile', component: UserPage,},
        { path: '/history', component: UserHistory},
        { path: '/order', component:UserOrders},
        { path: '/active-orders', component: ActiveOrders},
        { path: '/cafe-profile', component: CafePage},
        { path: '/orders', component:CafeOrders}
  ]
});



export default router
