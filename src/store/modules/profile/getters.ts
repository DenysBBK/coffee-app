import { profileState } from "./profileTypes"

export default{
    user(state:profileState){
        return state.user
    },
    cafe(state:profileState){
        return state.cafe
    },
    shops(state:profileState){
        return state.shops
    }
}