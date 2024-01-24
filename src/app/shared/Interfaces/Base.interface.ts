export interface IErrorMessages {
  [key: string]: string;
}
export interface LoginUser {
  username: string;
  password: string;
}
export interface UserInfo {
  roleName: string;
  firstName: string;
  secondName: string;
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
  secondName: string;
  surname: string;
  phone: string;
  address: string;
  position: string;
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
export interface Color {
  id?: number;
  name: string;
}
export interface Company {
  id?: number;
  fullname: string;
  address: string;
  cityId: number;
  cityName?: string;
  inn: string;
  statement: string;
  sertificat: string;
  director: string;
  sertificatNumber: string;
  dataSertificat: Date;
  dataPoliceConclusion: Date;
  contractNumber: string;
  dataContract: Date;
}
export interface CompanyPaginator {
  result: Company[];
  currentPage: number;
  page: number;
  totalCount: number;
}
export interface Seria {
  id?: number;
  name: string;
}
export interface Vehicle {
  id?: number;
  name: string;
}
export interface IssuedPassport {
  id?: number;
  name: string;
}
export interface Store {
  id?: number;
  fullname: string;
  address: string;
  cityId: number;
  cityName?: string;
  inn: string;
  statement: string;
  certificate: string;
  director: string;
  datePoliceConclusion: Date;
  endDatePoliceConclusion: Date;
  companyId: number;
  companyName: string;
}
export interface Blanka {
  id?: number;
  companyName: string;
  seriaName: string;
  userName: string;
  invoiceNumber: string;
  companyId: number;
  seriaId: number;
  isSelected: boolean;
  numberFrom: number;
  numberTo: number;
  userId: number;
  recordDate: Date;
}
export interface IBlankaPaginator {
  items: Blanka[];
  page: number;
  size: number;
  totalCount: number;
}
export interface IBlankaOperation {
  id?: number;
  blankNumber: number;
  blankaId: number;
  invoiceNumber: string;
  storeName: string;
  seriaName: string;
  isUsed: boolean;
}
export interface IBlankaOperationNakladnoy {
  id?: number;
  number: string;
  companyName: string;
  seriaName: string;
  owner: string;
  issuedPassportName: string;
  dataIssued: Date;
  recordDate: Date;
  vehicleModel: string;
  isApproved: boolean;
  userName: string;
}

export interface Functionals {
  id?: number;
  funcKey: string;
  description: string;
}

export interface ReferenceAccount {
  id: number;
  referenceNumber: string;
  companyId: number;
  owner: string;
  ownerAddress: string;
  sPassport: string;
  nPassport: string;
  issuedPassportId: number;
  dataIssued: Date;
  dataBirth: Date;
  vehicleId: number;
  vehicleModel: string;
  vehiclePlace: string;
  vehicleShasi: string;
  vehicleKuzov: string;
  vehicleRama: string;
  colorId: number;
  vehicleDataProFrom: Date;
  contractual: boolean;
  vehiclePrice: number;
  priceProps: number;
  vehicleRegistrationCertificate: Date;
  licenceNumber: string;
  whomIssued: string;
  dateLiceTo: Date;
  dateLiceFrom: Date;
  tranzitNumber: string;
  seriaId: number;
  userId: number;
  comment: string;
}
export interface ReferenceAccountCarnumber {
  id: number;
  blankNumber: string;
  companyId: number;
  vehicleId: number;
  seriaId: number;
  placeRegistration: string;
  carNumber: string;
  address: string;
  selIssuedPassportId: number;
  buyIssuedPassportId: number;
  saleFio: string;
  saleSPassport: string;
  saleNPassport: string;
  datePassportGetSale: Date;
  buyFio: string;
  buySPassport: string;
  buyNPassport: string;
  datePassportGetBuy: Date;
  certificatePermissionCarNumber: string;
  price: number;
  pricePercent: number;
}
