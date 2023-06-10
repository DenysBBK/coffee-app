import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default{
    state(){
        return{
            user:{
                bank:'',
                card:'',
                email:'',
                id:null,
                name:'',
                phone:''
            }
        }
    },
    actions,
    getters,
    mutations   
}