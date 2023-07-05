import { SighUpData, SignInData, Item, authState } from "./authTypes"
import { ActionContext } from "vuex"
import { RootStoreState } from "../types"

export default{
    async signup(_:ActionContext<authState, RootStoreState>, payload:SighUpData):Promise<void>{
        const theId: number = new Date().getTime()
        const respTable= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCn1i-L0RTLONbk82ySwxsEkqvxfJkokqI`,{
            method:"POST",
            body:JSON.stringify({
                email:payload.email,
                password:payload.password,
                id:theId,
                returnSecureToken:true
            })

        })
        const dataTable = await respTable.json()
        if(!respTable.ok){
            let userOrCafe;
                if(payload.type === 'users') userOrCafe = 'User';
                if(payload.type === 'shops') userOrCafe = 'Cafe';
            let errorKey;
                if(dataTable.error.message === 'INVALID_EMAIL') errorKey = 'Invalid email'
            const error = new Error(dataTable.error.message === "EMAIL_EXISTS" ? `${userOrCafe} is already exsist` : errorKey)
        throw error
        }else{
            const mode:string = payload.type;
            const responce:any = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${mode}/${theId}.json`,{
            method: "PUT",
            body:JSON.stringify({
                email:payload.email,
                name:payload.name,
                id:theId
            })
            })
            const data = await responce.json()
            if(!responce.ok){
                const error = new Error(data.error.message)
            throw error
            };
        }
        },


    async signIn(context:ActionContext<authState, RootStoreState>, payload:SignInData):Promise<void>{
        const type:string = payload.type
        const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${type}.json`)
        const theData:Item[] = await resp.json();
        const dataResult:Item[] = []
        for(const key in theData){
            const oneItem:Item = {
                email:theData[key].email,
                id:theData[key].id
            }
            dataResult.push(oneItem)
           
            
        };
        const theType:string = payload.type === 'users'? 'User':'Cafe'
        const isAnyFound:boolean = dataResult.some(one => one.email === payload.email);
        if(!isAnyFound){
            throw new Error(`${theType} is not found`)
        };
        let id:string|undefined;
        dataResult.map(one => {
            if(one.email === payload.email){
                id = one.id
                localStorage.setItem('uid', id)
            }
        });
        
        
        
        const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCn1i-L0RTLONbk82ySwxsEkqvxfJkokqI',{
            method:'POST',
            body:JSON.stringify( {
                email:payload.email,
                password:payload.password,
                type:payload.type,
                returnSecureToken:true
            })
        });
        const data = await responce.json();
        if(!responce.ok){
            const error = new Error(data.error.message);
            throw error
        }
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('localId', data.localId);
        localStorage.setItem('type', payload.type)
        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            uid:id,
            type:payload.type
        })

    },
    loginFromStorage(context:ActionContext<authState, RootStoreState>):void{
        const token:string|null = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const uid = localStorage.getItem('uid');
        const type = localStorage.getItem('type');
        context.commit('setUser', {
            token: token,
            userId: userId,
            uid:uid,
            type:type
        })

    },
    logout(context:ActionContext<authState, RootStoreState>):void{
        localStorage.removeItem('uid');
        localStorage.removeItem('token');

        context.commit('setUser', {
            userId: null,
            token: null,
            uid:''
        })
    }
}