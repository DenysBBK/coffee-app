import {authState} from "./authTypes"

export default{
    uid(state:authState):string{
        return state.uid
    },
    isUserAuthenticated(state:authState):boolean{
        return !!state.token
    },
    type(state:authState):string{
        return state.type
    }
}