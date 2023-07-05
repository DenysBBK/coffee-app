import { ordersState } from "./ordersTypes"

export default{
    orders(state:ordersState):any[]{
        return state.orders
    }
}