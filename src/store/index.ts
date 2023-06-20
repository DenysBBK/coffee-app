import {createStore} from 'vuex';
import authModule from './modules/auth/index';
import profileModule from './modules/profile/index';
import ordersModule from './modules/orders/index'

const store = createStore({
    modules:{
        auth:authModule,
        profile:profileModule,
        orders: ordersModule
    }
});

export default store