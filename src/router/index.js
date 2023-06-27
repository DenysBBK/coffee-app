// @ts-ignore
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
import NotFound from '@/components/NotFound.vue'
import store from '../store/index'


const router = createRouter({
  history: createWebHistory(),
  routes: [
        { path: '/', component: Main },
        { path: '/login', component: Login },
        { path: '/registration', component: SingUp },
        { path: '/terms', component: Terms },
        { path: '/privacy-policy', component: Privacy },
        { path: '/user-profile', component: UserPage, meta:{requiresAuth: true}},
        { path: '/history', component: UserHistory,meta:{requiresAuth: true}},
        { path: '/order', component:UserOrders, meta:{requiresAuth: true}},
        { path: '/active-orders', component: ActiveOrders, meta:{requiresAuth: true}},
        { path: '/cafe-profile', component: CafePage, meta:{requiresAuth: true}},
        { path: '/orders', component:CafeOrders, meta:{requiresAuth: true}},
        { path: '/:notFound(.*)', component:NotFound}
  ]
});

router.beforeEach(function(to, _, next){
  if(to.meta.requiresAuth && !store.getters.isUserAuthenticated){
    next('/login')
  }else{
    next()
  }
})

export default router
