import {Isbn} from "./isbn.model";
import {NotificationDetails} from "./notificationDetails.Model";
export interface Book {
    
    Author : string,
    AvailableCopies : number,
    BlockedCopies : number,
    Created :  string,
    ISBNNumber : Isbn[],
    Id : string,
    Image : string,
    LastUpdated	: string,
    Name : string,
    Notification : NotificationDetails[],
    NoOfCopies : number,
    PublishingYear : string,
    BookID: string
////notification : [{ "email" : , "userID" : }],
}