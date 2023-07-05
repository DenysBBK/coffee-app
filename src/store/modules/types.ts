import { authState } from "./auth/authTypes";
import { profileState } from "./profile/profileTypes";
import { ordersState } from "./orders/ordersTypes";

export interface RootStoreState{
    auth:authState,
    profile:profileState,
    orders:ordersState
}