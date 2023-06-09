export default{
    async postUser(context:any,payload:any){
        const uid = localStorage.getItem('uid');
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
    }
}