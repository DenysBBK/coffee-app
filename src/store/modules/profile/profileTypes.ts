interface Positions{
    name:string,
    price:string
}

export interface profileState{
    user:{
        bank:string,
        card:string,
        email:string,
        id:string|null,
        name:string,
        phone:string
    },
    cafe:{
        address:string,
        name:string,
        phone:string,
        id:string|null,
        email:string,
        positions:Positions[],
        city:string
    },
    shops:any[]
}
export interface getUserData{
    bank:string,
    card:string,
    email:string,
    id:number,
    name:string,
    phone:string
}
export interface getCafeData{
    address:string,
    name:string,
    phone:string,
    id:number,
    email:string,
    positions:Positions[],
    city:string
}
export interface postUserData{
    phone:string,
    bank:string,
    card:string
}
export interface postCafeData{
    city:string,
    address:string,
    phone:string,
    positions:Positions[],
    orders:any[]
}
export interface shopsArr{
    address:string,
    city:string,
    email:string,
    id:number,
    name:string,
    phone:string,
    positions:Positions[],
    
}