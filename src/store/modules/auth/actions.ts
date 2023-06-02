interface SighUpData {
    email:string,
    password:string,
    type:string,
    name:string
}


export default{
    async signup(context:any, payload:SighUpData){
        const theId = new Date().getTime()
        const respTable:any = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCn1i-L0RTLONbk82ySwxsEkqvxfJkokqI`,{
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
            const mode = payload.type;
            const responce:any = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${mode}/${theId}.json`,{
            method: "PUT",
            body:JSON.stringify({
                email:payload.email,
                name:payload.name,
                
            })
            })
            const data = await responce.json()
            if(!responce.ok){
                const error = new Error(data.error.message)
            throw error
            };
        }
        }
}