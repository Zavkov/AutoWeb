import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, tap } from 'rxjs';
import { ChangePassword, LoginUser, UserInfo } from '../Interfaces/Base.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private url:string;
storeId: number;

getStoreId():number{return this.storeId;}
setStoreId(storeId: number) {this.storeId = storeId;}
  
constructor(
  private http:HttpClient, 
  private config:ConfigService, 
  private router: Router
  ) {
    this.url = this.config.getApiUrl();
   }
   
   login(user: LoginUser):Observable<any>{
    return this.http.post(`${this.url}api/account/sign-in`, user).pipe(tap(this.setToken));
   }

   setToken(response: any) {
    const expDate = new Date(response.expires * 1000);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('token-exp', expDate.toString());
  }
  
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login")
    // const refreshToken = localStorage.getItem('refreshToken');
    // this.http
    //   .post(`${this.url}api/account/tokens/${refreshToken}/revoke`, null)
    //   .subscribe();

    // localStorage.clear();
  }
  getUserInfo() {
    return this.http.get<UserInfo>(`${this.url}api/account/user-info`);
  }
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post(`${this.url}api/account/tokens/${refreshToken}/refresh`, null)
      .pipe(tap(this.setToken));
  }

  changePassword(passwords: ChangePassword): Observable<ChangePassword> {
    return this.http.post<ChangePassword>(
      `${this.url}api/user/change-password`,
      passwords
    );
  }


}
