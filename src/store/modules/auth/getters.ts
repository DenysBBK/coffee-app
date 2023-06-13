

export default{
    uid(state:any){
        return state.uid
    },
    isUserAuthenticated(state:any){
        return !!state.token
    },
}