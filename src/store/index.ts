import {createStore} from 'vuex';
import authModule from './modules/auth/index';
import profileModule from './modules/profile/index';

const store = createStore({
    modules:{
        auth:authModule,
        profile:profileModule
    }
});

export default store