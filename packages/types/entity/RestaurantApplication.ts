import { Address } from "./Address"

export interface RestaurantApplication{
    _id:string,
    name:string,
    owner:{
      _id:string,
      name:string,
      email:string
    },
    address:Address,
    logoUrl:string
  }