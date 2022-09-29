export interface Mobile {
    id?:string
    model:string
    ram:string
    rom:string
    price:number
    count:number
    img:string[]
}
export interface User {
    id?:number|string
    name:string
    email:string
    password:string
    userType:string
    cart?:Mobile[] | any
    totalPrice:number
    deliveryAdd:string
    orderStatus:string
  }

export interface contextType {
    //mobileList: Mobile[];
    users: User[]
    mobiles:Mobile[]
    loading:boolean
    currentUser:User
    message:string
    setCurrentUser:(user:User)=>void
    setMessage:(msg:string)=>void
    postUser:(user:User)=>void
    updateUser:(id:number|string, user:User) => void
    deleteUser:(id:number|string)=>void
    postMobile:(mobile:Mobile)=>void
    updateMobiles:(id:string, mobile:Mobile)=>void
    deleteMobiles:(id:string)=>void
    // addMobile:(mobile:Mobile)=>void
    // updateMobile:(mobile:Mobile)=>void
    // deleteMobile:(id:string)=>void
 // dispatch:(action:any)=>void
  };

