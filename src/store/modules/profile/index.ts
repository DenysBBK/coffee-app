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
            },
            cafe:{
                address:'',
                name:'',
                phone:'',
                id:null,
                email:'',
                positions:[{
                    name:'',
                    price:''
                }],
                city:''
            },
            shops:[]
        }
    },
    actions,
    getters,
    mutations   
}