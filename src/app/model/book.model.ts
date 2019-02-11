import {Isbn} from "./isbn.model";
export interface Book {
    isbn : Isbn;
    name : string,
author : string,
publishingYear : string,
numberOfCopies : number,
availableCopies : number,
blockedCopies: number,
image : string,
////notification : [{ "email" : , "userID" : }],
created : string,
lastUpdated	: string,
isActive : boolean
}