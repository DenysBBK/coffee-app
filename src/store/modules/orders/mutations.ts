import { ordersState, ordersArr } from "./ordersTypes"

export default{
    ordersData(state:ordersState, payload:ordersArr[]){
        state.orders = payload
    }
}