export interface IErrorMessages{
    [key: string]: string;
  }
  export interface LoginUser {
    username: string;
    password: string;
  }
  export interface UserInfo {
    roleName: string;
    firstName: string;
    secondName:string;
    username: string;
    storeId: number;
    functionals: string[];
  }
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    exprires: number;
  }
  export interface User {
    id?: number;
    roleId: number;
    storeId: number;
    firstName: string;
    secondName:string;
    surname:string;
    phone:string;
    address:string;
    position:string;
    username: string;
    password: string;
  }
  export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
  }
  export interface UserPaginator {
    result: User[];
    currentPage: number;
    page: number;
    totalCount: number;
  }
  export interface Role {
    id?: number;
    name: string;
    functionals: string[];
  }
  export interface City {
    id?: number;
    name: string;
  }
  export interface Company {
    id?: number;
    fullname: string;
    address: string;
    cityId: number;
    cityName?: string;
    inn:string;
    statement:string;
    sertificat:string;
    director:string;
    SertificatNumber:string;
    DataSertificat:Date;
    DataPoliceConclusion:Date;
    ContractNumber:string;
    DataContract:Date;
  }
  export interface Seria {
    id?: number;
    name: string;
  }
  export interface Store{
    id?: number;
    fullname: string;
    address: string;
    cityId: number;
    cityName?: string;
    inn:string;
    statement:string;
    sertificat:string;
    director:string;
    DatePoliceConclusion:Date;
    EndDatePoliceConclusion:Date;
    CompanyId:number;
  }
  export interface Blanka{
    id?: number;
    companyName: string,
    seriaName: string,
    userName: string,
    name: string,
    dataSale: Date,
    companyId: number,
    seriaId: number,
    accountReference: string,
    owner: string,
    ownerAddress: string,
    ownerPassport: string,
    passportInfo: string,
    sale: boolean,
    vehicalModel: string,
    vehicalBody: string,
    vehicalColor:string,
    vehicalProductionYear: Date,
    seats: string,
    amount: number,
    amountPercentage: number,
    userId: number
  }