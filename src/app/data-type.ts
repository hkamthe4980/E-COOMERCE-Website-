export interface signUp{
    name:string,
    email:string,
    pass:string,
}
export interface loginup{
    
    email:string,
    pass:string,

}
export interface product{
    name:string|undefined,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}
export interface cart{
    productId: number;
    userId: number;
    name: string|undefined; 
    price: number;
    category: string;
    color: string;
    image: string;
    description: string;
    id: number|undefined
    quantity:number|undefined


}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number,


}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}