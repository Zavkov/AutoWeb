import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import {
  Blanka,
  ChangePassword,
  City,
  Color,
  Company,
  CompanyPaginator,
  IBlankaOperation,
  IBlankaOperationNakladnoy,
  IssuedPassport,
  ReferenceAccount,
  ReferenceAccountCarnumber,
  Role,
  Seria,
  Store,
  User,
  UserInfo,
  UserPaginator,
  Vehicle,
} from '../Interfaces/Base.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected urla = 'https://localhost:7134/api/Blanka/';
  private url: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.url = this.config.getApiUrl();
  }
  //===========User part==================
  getUserInfo() {
    return this.http.get<UserInfo>(`${this.url}api/User/user-info`);
  }
  getListUser() {
    return this.http.get<User>(`${this.url}api/User/GetListUsers`);
  }
  getUsers(
    page: number,
    size: number,
    firstName?: string,
    storeId?: number | null
  ) {
    let url = `${this.url}api/User?&page=${page}&size=${size}`;

    if (firstName) {
      url += `&firstName=${firstName}`;
    }
    if (storeId) {
      url += `&storeId=${storeId}`;
    }
    return this.http.get<UserPaginator>(url);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}api/User/AddUser`, user);
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.url}api/User/${id}`;
    return this.http.delete(url);
  }
  updateUser(role: User): Observable<User> {
    return this.http.put<User>(`${this.url}api/User/UpdateUser`, role);
  }

  //======Functional ==========
  getFunctionals() {
    return this.http.get<string[]>(`${this.url}api/Functional`);
  }
  //=========Role part ==============
  getRoles() {
    return this.http.get<Role[]>(`${this.url}api/Role`);
  }
  addRole(role: Role): Observable<Role> {
    debugger;
    return this.http.post<Role>(`${this.url}api/Role/AddRole`, role);
  }
  deleteRole(id: number): Observable<any> {
    const url = `${this.url}api/Role/${id}`;
    return this.http.delete(url);
  }
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.url}api/Role/UpdateRole`, role);
  }

  changePassword(passwords: ChangePassword): Observable<ChangePassword> {
    return this.http.post<ChangePassword>(
      `${this.url}api/user/change-password`,
      passwords
    );
  }
  //========Store part=========
  getStores() {
    return this.http.get<Store[]>(`${this.url}api/Store`);
  }
  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.url}api/Store/AddStore`, store);
  }
  deleteStore(id: number): Observable<any> {
    const url = `${this.url}api/Store/${id}`;
    return this.http.delete(url);
  }
  updateStore(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.url}api/Store/UpdateStore`, store);
  }
  getStoreById(id: number): Observable<any> {
    const url = `${this.url}api/Store/${id}`;
    return this.http.get(url);
  }
  //=============City part ==========================
  getCities() {
    return this.http.get<City[]>(`${this.url}api/City`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.url}api/City/AddCity`, city);
  }

  deleteCity(id: number): Observable<any> {
    const url = `${this.url}api/City/${id}`;
    return this.http.delete(url);
  }
  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.url}api/City/UpdateCity`, city);
  }
  //=========================Color Part==================================
  getColors() {
    return this.http.get<Color[]>(`${this.url}api/Color`);
  }
  addColor(color: Color): Observable<Color> {
    return this.http.post<Color>(`${this.url}api/Color/AddColor`, color);
  }
  deleteColor(id: number): Observable<any> {
    const url = `${this.url}api/Color/${id}`;
    return this.http.delete(url);
  }
  updateColor(color: Color): Observable<Color> {
    return this.http.put<Color>(`${this.url}api/Color/UpdateColor`, color);
  }
  //===========Seria part ======================
  getSeria() {
    return this.http.get<Seria[]>(`${this.url}api/Seria`);
  }
  addSeria(seria: Seria): Observable<Seria> {
    return this.http.post<Seria>(`${this.url}api/Seria/AddSeria`, seria);
  }
  updateSeria(seria: Seria): Observable<Seria> {
    return this.http.put<Seria>(`${this.url}api/Seria/UpdateSeria`, seria);
  }
  deleteSeria(id: number): Observable<any> {
    const url = `${this.url}api/Seria/${id}`;
    return this.http.delete(url);
  }
  getSeriaById(id: number): Observable<any> {
    const url = `${this.url}api/Seria/${id}`;
    return this.http.get(url);
  }
  //==============Blanka part================

  getBlanks() {
    return this.http.get<Blanka[]>(`${this.url}api/Blanka`);
  }
  addBlanka(blanka: Blanka): Observable<Blanka> {
    return this.http.post<Blanka>(`${this.url}api/Blanka/`, blanka);
  }
  updateBlanka(blanka: Blanka): Observable<Blanka> {
    return this.http.put<Blanka>(`${this.url}api/Blanka/UpdateBlanka`, blanka);
  }
  deleteBlanka(id: number): Observable<any> {
    const url = `${this.url}api/Blanka/${id}`;
    return this.http.delete(url);
  }
  getSaledBlank(): Observable<any> {
    let url = `${this.url}api/Blanka/Sale?sale=true`;
    return this.http.get<Blanka>(url);
  }
  getUnsaledBlank(): Observable<any> {
    let url = `${this.url}api/Blanka/Sale?sale=false`;
    return this.http.get<Blanka>(url);
  }
  getById(blankaId: any): Observable<IBlankaOperation[]> {
    return this.http.get<IBlankaOperation[]>(this.urla ? this.urla : this.url, {
      params: blankaId,
    });
  }
  getByBlankNumber(
    data: any,
    urla?: any
  ): Observable<IBlankaOperationNakladnoy> {
    return this.http.get<IBlankaOperationNakladnoy>(
      urla ? this.urla + urla : this.urla,
      {
        params: data,
      }
    );
  }
  searchNakladnoyOperation(data: any): Observable<IBlankaOperation[]> {
    return this.http.get<IBlankaOperation[]>(
      `${this.urla}search-nakladnoy-operation`,
      { params: data }
    );
  }

  //=================Company part========================

  getCompanySearch(
    page: number,
    size: number,
    fullname?: string,
    cityId?: number | null
  ) {
    let url = `${this.url}api/Company/Search?&page=${page}&size=${size}`;

    if (fullname) {
      url += `&fullname=${fullname}`;
    }
    if (cityId) {
      url += `&cityId=${cityId}`;
    }
    return this.http.get<CompanyPaginator>(url);
  }

  getCompany() {
    return this.http.get<Company[]>(`${this.url}api/Company`);
  }
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(
      `${this.url}api/Company/AddCompany`,
      company
    );
  }
  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(
      `${this.url}api/Company/UpdateCompany`,
      company
    );
  }
  deleteCompany(id: number): Observable<any> {
    const url = `${this.url}api/Company/${id}`;
    return this.http.delete(url);
  }
  getCompanyById(id: number): Observable<any> {
    const url = `${this.url}api/Company/${id}`;
    return this.http.get(url);
  }
  //====================Vehicle Part======================================
  getVehicle() {
    return this.http.get<Vehicle[]>(`${this.url}api/Vehicle`);
  }
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(
      `${this.url}api/Vehicle/AddVehicle`,
      vehicle
    );
  }
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(
      `${this.url}api/Vehicle/UpdateVehicle`,
      vehicle
    );
  }
  deleteVehicle(id: number): Observable<any> {
    const url = `${this.url}api/Vehicle/${id}`;
    return this.http.delete(url);
  }
  getVehicleById(id: number): Observable<any> {
    const url = `${this.url}api/Vehicle/${id}`;
    return this.http.get(url);
  }
  //===============IssuedPassport Part==============================
  getIssuedPassport() {
    return this.http.get<IssuedPassport[]>(`${this.url}api/IssuedPassport`);
  }
  addIssuedPassport(data: IssuedPassport): Observable<IssuedPassport> {
    return this.http.post<IssuedPassport>(
      `${this.url}api/IssuedPassport/AddIssuedPassport`,
      data
    );
  }
  updateIssuedPassport(data: IssuedPassport): Observable<IssuedPassport> {
    return this.http.put<IssuedPassport>(
      `${this.url}api/IssuedPassport/UpdateIssuedPassport`,
      data
    );
  }
  deleteIssuedPassport(id: number): Observable<any> {
    const url = `${this.url}api/IssuedPassport/${id}`;
    return this.http.delete(url);
  }
  getIssuedPassportById(id: number): Observable<any> {
    const url = `${this.url}api/IssuedPassport/${id}`;
    return this.http.get(url);
  }
  //=======================ReferenceAccount==============================================================
  getReferenceAccount() {
    return this.http.get<ReferenceAccount[]>(`${this.url}api/ReferenceAccount`);
  }
  addReferenceAccount(data: ReferenceAccount): Observable<ReferenceAccount> {
    return this.http.post<ReferenceAccount>(
      `${this.url}api/ReferenceAccount/AddReferenceAccount`,
      data
    );
  }
  updateReferenceAccount(data: ReferenceAccount): Observable<ReferenceAccount> {
    return this.http.put<ReferenceAccount>(
      `${this.url}api/ReferenceAccount/UpdateReferenceAccount`,
      data
    );
  }
  deleteReferenceAccount(id: number): Observable<any> {
    const url = `${this.url}api/ReferenceAccount/${id}`;
    return this.http.delete(url);
  }
  getReferenceAccounttById(id: number): Observable<any> {
    const url = `${this.url}api/ReferenceAccount/${id}`;
    return this.http.get(url);
  }
  //==========================ReferenceAccountCarnumber===============================================
  getReferenceAccountCarnumber() {
    return this.http.get<ReferenceAccountCarnumber[]>(
      `${this.url}api/ReferenceAccountCarnumber`
    );
  }
  addReferenceAccountCarnumber(
    data: ReferenceAccountCarnumber
  ): Observable<ReferenceAccountCarnumber> {
    return this.http.post<ReferenceAccountCarnumber>(
      `${this.url}api/ReferenceAccountCarnumber/AddReferenceAccountCarnumber`,
      data
    );
  }
  updateReferenceAccountCarnumber(
    data: ReferenceAccountCarnumber
  ): Observable<ReferenceAccountCarnumber> {
    return this.http.put<ReferenceAccountCarnumber>(
      `${this.url}api/ReferenceAccountCarnumber/UpdateReferenceAccountCarnumber`,
      data
    );
  }
  deleteReferenceAccountCarnumber(id: number): Observable<any> {
    const url = `${this.url}api/ReferenceAccountCarnumber/${id}`;
    return this.http.delete(url);
  }
  getReferenceAccountCarnumbertById(id: number): Observable<any> {
    const url = `${this.url}api/ReferenceAccountCarnumber/${id}`;
    return this.http.get(url);
  }

  //===========================//===================//==========================

  // getAutoSaleReport(data: any): Observable<any> {
  //   return this.http.get<any>(`${this.url}api/Report/report-sale-blanks?`, {
  //     params: data,
  //     responseType: 'json',
  //   });
  // }
}
