import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/MainPage.vue';
import SingUp from '@/components/RegistrationPage.vue';
import Terms from '@/components/TermsPage.vue';
import Privacy from '@/components/PrivacyPage.vue';
import Login from '@/components/LoginPage.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Main },
        { path: '/login', component: Login },
        { path: '/registration', component: SingUp },
        { path: '/terms', component: Terms },
        { path: '/privacy-policy', component: Privacy }
    ]
});
export default router;
