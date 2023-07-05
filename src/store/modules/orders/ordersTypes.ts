export interface ordersState{
    orders:ordersArr[]
}
export type orderPayload = string

export interface ordersArr{
    positionId:number,
    status:number,
    fromCafe?:string,
    cafeId?:number,
    positions:[{
        name:string,
        price:string
    }],
    userId?:string,
    userName?:string
}
interface orderItem{
    positionId:number,
    status:number,
    positions:[{
        name:string,
        price:string
    }]
}
export interface userOrderItem extends orderItem{
    fromCafe:string,
    cafeId:number,
    
}
export interface cafeOrderItem extends orderItem{
    userId:string,
    userName:string
}
interface Positions{
    name:string,
    price:string
}
export interface userOrderData extends Positions{
    name:string,
    id:string,
    shopName:string,
    uid:number,
    positions:Positions[]
}
export interface updatedOrder{
    placeId:string,
    position:number,
    status:number,
    type:string
}