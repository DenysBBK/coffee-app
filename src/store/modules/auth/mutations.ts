interface userData{
    token:string,
    userId:string
}

export default{
    setUser(state:any, payload:userData){
        state.token = payload.token;
        state.userId = payload.userId;
    },
}