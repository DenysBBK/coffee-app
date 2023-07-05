import type {authState, userData} from "./authTypes"


export default{
    setUser(state:authState, payload:userData){
        state.token = payload.token;
        state.userId = payload.userId;
        state.uid = payload.uid;
        state.type = payload.type
    },
}