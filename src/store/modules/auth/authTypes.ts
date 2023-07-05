export interface authState{
    userId:string | null,
    token:string|null,
    uid:string,
    type:string
}
export interface userData{
    token:string,
    userId:string
    uid:string,
    type:string
}
export interface SighUpData {
    email:string,
    password:string,
    type:string,
    name:string
};
export interface SignInData{
    email:string,
    password:string,
    returnSecureToken:boolean,
    type:string
}
export interface Item{
    email:string,
    id:string
}
