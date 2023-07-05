import {createStore, Store} from 'vuex';
import authModule from './modules/auth/index';
import profileModule from './modules/profile/index';
import ordersModule from './modules/orders/index'
import { RootStoreState } from './modules/types';

const store:Store<RootStoreState> = createStore({
    modules:{
        auth:authModule,
        profile:profileModule,
        orders: ordersModule
    }
});

export default store