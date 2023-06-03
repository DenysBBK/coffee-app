interface userData{
    token:string,
    userId:string
    uid:string
}

export default{
    setUser(state:any, payload:userData){
        state.token = payload.token;
        state.userId = payload.userId;
        state.uid = payload.uid
    },
}