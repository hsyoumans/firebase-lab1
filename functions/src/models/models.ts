import { ObjectId } from "mongodb";

export default interface Shout { 
    _id?: ObjectId;
    to: string;
    from: string;
    comment: string;
   }