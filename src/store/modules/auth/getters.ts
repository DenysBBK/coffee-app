

export default{
    uid(state:any){
        return state.uid
    },
    isAuthenticated(state:any){
        return !!state.token
    },
}