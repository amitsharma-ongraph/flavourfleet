export interface Address {
  addressLine: string;
  city: string;
  country: string;
  zipCode: string;
  isPrimary?: boolean;
  _id?: string;
  location?:any
}
