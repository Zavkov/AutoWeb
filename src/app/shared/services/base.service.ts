import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Blanka, ChangePassword, City, Role, Seria, Store, User, UserInfo, UserPaginator } from '../Interfaces/Base.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
private url:string;
  constructor(private http:HttpClient, private config:ConfigService) { this.url = this.config.getApiUrl();}
//===========User part==================
  getUserInfo() {
    return this.http.get<UserInfo>(`${this.url}api/user/user-info`);
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
  return this.http.post<Role>(`${this.url}api/Role`, role);
}
deleteRole(id: number): Observable<any> {
  const url = `${this.url}api/Role/${id}`;
  return this.http.delete(url);
}
updateRole(role: Role): Observable<Role> {
  return this.http.put<Role>(`${this.url}api/Role`, role);
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
  return this.http.post<Store>(`${this.url}api/Store`, store);
}
deleteStore(id: number): Observable<any> {
  const url = `${this.url}api/Store/${id}`;
  return this.http.delete(url);
}
updateStore(store: Store): Observable<Store> {
  return this.http.put<Store>(`${this.url}api/Store`, store);
}
getStoreById(id:number):Observable<any>{
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
//===========Seria part ======================
getSeria(){
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
getSeriaById(id:number):Observable<any>{
  const url = `${this.url}api/Seria/${id}`;
  return this.http.get(url);
}
//==============Blanka part================

getBlanka(){
 return this.http.get<Blanka[]>(`${this.url}api/Blanka`);
}
addBlanka(blanka: Blanka): Observable<Blanka> {
  return this.http.post<Blanka>(`${this.url}api/Blanka/AddBlanka`, blanka);
}
updateBlanka(blanka:Blanka):Observable<Blanka>{
  return this.http.put<Blanka>(`${this.url}api/Blanka/UpdateBlanka`, blanka)
}
}
