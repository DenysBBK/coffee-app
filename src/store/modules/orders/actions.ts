export default{
    async getOrders(context:any, payload:any){
        const type = payload == 'user' ? 'users':'shops'
        const id = localStorage.getItem('uid')
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${type}/${id}/orders.json`);
        const data = await responce.json();

        if(!data){
            console.log('No orders')
            
        }
        const orders = []
        if(payload == 'user'){
            for(let one in data){
                console.log(data[one])
                
                let item = {
                    fromCafe:data[one].fromCafe,
                    orderTime:data[one].orderTime,
                    status:data[one].status,
                    positions:data[one].orderPositions

                }
                orders.push(item)
                
            }
        console.log(orders)
            
        }else{
            console.log('Its user profile!')
            
        }

        context.commit('ordersData', orders)
        
        
    },
    async postOrder(context:any, payload:any){
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${payload.id}/orders/.json`,{
            method:'POST',
            body:JSON.stringify({
               userId:payload.uid,
               userName:payload.name,
               orderTime: new Date().getTime(),
               status:0,
               orderPositions:payload.positions 
            })
        });
        const data = await responce.json()
        if(!data){
            const error = new Error('Cant make order');
            throw error
        }
        const id = localStorage.getItem('uid')
        const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/orders/.json`,{
           method:'POST',
           body:JSON.stringify({
            fromCafe:payload.shopName,
            orderTime: new Date().getTime(),
            status:0,
            orderPositions:payload.positions 
           }) 
        });
        const data2 = await resp.json();
        if(!data2.ok){
            throw new Error('Cant male order');
        }        
    }
}