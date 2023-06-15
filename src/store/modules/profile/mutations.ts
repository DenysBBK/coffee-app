export default{
    getUser(state:any, payload:any){
        state.user.bank = payload.bank,
        state.user.card = payload.card,
        state.user.email = payload.email,
        state.user.id = payload.id,
        state.user.name = payload.name,
        state.user.phone = payload.phone
    },
    getCafe(state:any, payload:any){
        state.cafe.address = payload.address,
        state.cafe.name = payload.name,
        state.cafe.phone = payload.phone,
        state.cafe.id = payload.id,
        state.cafe.email = payload.email,
        state.cafe.positions = payload.positions
    }
}
