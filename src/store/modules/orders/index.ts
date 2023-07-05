import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import { ordersState } from "./ordersTypes";

export default{
    state():ordersState{
        return{
            orders:[]
        }
    },
    mutations,
    actions,
    getters
}