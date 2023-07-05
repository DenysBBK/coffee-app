import { profileState } from "./profileTypes"


export default{
    getUser(state:profileState, payload:any){
        state.user.bank = payload.bank,
        state.user.card = payload.card,
        state.user.email = payload.email,
        state.user.id = payload.id,
        state.user.name = payload.name,
        state.user.phone = payload.phone
    },
    getCafe(state:profileState, payload:any){
        state.cafe.address = payload.address,
        state.cafe.name = payload.name,
        state.cafe.phone = payload.phone,
        state.cafe.id = payload.id,
        state.cafe.email = payload.email,
        state.cafe.positions = payload.positions,
        state.cafe.city = payload.city
    },
    getShops(state:profileState, payload:any){
        state.shops = payload
    }
}
