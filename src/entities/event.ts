import { Location } from "./location";
import { Price } from "./price";
import { User } from "./user";

export class Event {

  constructor (
    public title: string,
    public location: Location,
    public date: Date,
    public categories: string[],
    public description: string,
    public banner: string,
    public flyers: string[],
    public coupons: string[],
    public participants: User[],
    public price: Price[],
    public city: string
    
  ) {}
}