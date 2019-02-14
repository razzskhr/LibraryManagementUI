export enum GenderType {
    male,
    female
}

export enum RoleType {
    student,
    admin
}

export interface User {
    UserName : string;
    FirstName : string;
    MiddleName: string;
    LastName: string;
    Email : string;
    DateOfBirth : string;
    Gender : GenderType;
    Created : string;
    IssuedBooks : string;
    LastUpdated : string;
    RoleType : RoleType;
    UserID : string;
    Password : string;
    PhoneNumber : string;
    ////RegistrationNumber : string;
}