import { getUserData, getCafeData, profileState, postUserData, postCafeData,shopsArr } from "./profileTypes";
import { ActionContext } from "vuex";
import { RootStoreState } from "../types";


export default{
    async postUser(_:ActionContext<RootStoreState, profileState>,payload:postUserData):Promise<void>{
        let uid = localStorage.getItem('uid');
        const url = `https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`

        const getResp = await fetch(url);
        const oldData = await getResp.json()

        const fullData = {
            ...oldData,
            bank:payload.bank,
            card:payload.card,
            phone:payload.phone
        }
        const responce = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(fullData)
        });
        const data = await responce.json();
        if(!data.ok){
            throw new Error('Cant post the data')
        }
    },
    async getUserData(context:ActionContext<RootStoreState, profileState>):Promise<void>{
        let uid = localStorage.getItem('uid');
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`);
        const data:getUserData = await responce.json();
        
        
        context.commit('getUser',{
            bank:data.bank,
            card:data.card,
            email:data.email,
            id:data.id,
            name:data.name,
            phone:data.phone
        })
        
    },
    async postCafe(_:ActionContext<RootStoreState, profileState>, payload:postCafeData):Promise<void>{
        let uid = localStorage.getItem('uid');
        const url = `https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${uid}.json`;
        const getResp = await fetch(url);
        const oldData = await getResp.json();

        const fullData = {
            ...oldData,
            address: payload.address,
            phone:payload.phone,
            positions:payload.positions,
            city:payload.city,
            orders:payload.orders
        };
        const responce = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(fullData)
        });
        const data = await responce.json();
        if(!data.ok){
            throw new Error('Cant post the data')
        }
    },
    async getCafeData(context:ActionContext<RootStoreState, profileState>):Promise<void>{
        let uid = localStorage.getItem('uid');
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${uid}.json`);
        const data:getCafeData = await responce.json();
        
        context.commit('getCafe',{
            address:data.address,
            email:data.email,
            id:data.id,
            name:data.name,
            phone:data.phone,
            positions:data.positions,
            city:data.city
        })
    },
    async getCoffeeShops(context:ActionContext<RootStoreState, profileState>):Promise<void>{
        const responce = await fetch('https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops.json');
        const data = await responce.json();

        const shops:shopsArr[] = [];
        for(let one in data){
            const item:shopsArr ={
                address:data[one].address,
                city:data[one].city,
                email:data[one].email,
                id:data[one].id,
                name:data[one].name,
                phone:data[one].phone,
                positions:data[one].positions
            };
            shops.push(item)
        };
       
        
        if(!data){
            throw new Error('The is no caffe')
        }   
        context.commit('getShops', shops)      
    },
  
}