export default{
    getUser(state:any, payload:any){
        state.user.bank = payload.bank,
        state.user.card = payload.card,
        state.user.email = payload.email,
        state.userid = payload.id,
        state.user.name = payload.name,
        state.user.phone = payload.phone
    }
}