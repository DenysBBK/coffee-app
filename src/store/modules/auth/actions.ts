interface SighUpData {
    email:string,
    password:string,
    type:string,
    name:string
};
interface SignInData{
    email:string,
    password:string,
    returnSecureToken:boolean,
    type:string
}
interface Item{
    email:string,
    id:string
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


    async signIn(context:any, payload:SignInData){
        const type = payload.type
        const resp = await fetch(`https://coffee-app-fc81b-default-rtdb.europe-west1.firebasedatabase.app/${type}.json`)
        const theData:any = await resp.json();
        const dataResult = []
        for(const key in theData){
            const oneItem:Item = {
                email:theData[key].email,
                id:theData[key].id
            }
            dataResult.push(oneItem)
            console.log(dataResult)
            
        };
        const theType:string = payload.type === 'users'? 'User':'Cafe'
        const isAnyFound:boolean = dataResult.some(one => one.email === payload.email);
        if(!isAnyFound){
            throw new Error(`${theType} is not found`)
        };
        let id;
        dataResult.map(one => {
            if(one.email === payload.email){
                id = one.id.toString()
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
        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            uid:id
        })

    }
}