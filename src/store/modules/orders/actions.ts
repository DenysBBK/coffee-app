export default{
    async getOrders(context:any){
        const id = localStorage.getItem('uid')
        const responce = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/shops/${id}/orders.json`);
        const data = await responce.json();

        if(!data){
            console.log('No orders')
            
        }else{
            console.log(data)
            
        }
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
        if(!data.ok){
            const error = new Error('Cant make order');
            throw error
        }
    }
}