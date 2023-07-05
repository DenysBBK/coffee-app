import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import type {authState} from "./authTypes"

export default{
    state():authState{
        return{
        
            userId: null,
            token: null,
            uid:'',
            type:''
        
        }
    },
    mutations,
    actions,
    getters
}