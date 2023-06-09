import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'
import BaseAlert from './components/ui/BaseAlert.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseModal from './components/ui/OrderModal.vue'


const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-alert', BaseAlert);
app.component('base-spinner', BaseSpinner);
app.component('base-modal', BaseModal)

app.mount('#app');
