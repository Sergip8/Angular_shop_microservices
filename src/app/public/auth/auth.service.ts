import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Signin} from "./signin/signin.model";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./auth.response";
import { AuthRequest, LoginRequest, LoginResponse, RegistrationResponse } from './auth-models';

const baseUrl = "https://localhost:8002/api/AuthApi/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoints: any = {
    signin: baseUrl+"login",
    signup: baseUrl+"register",
  };
  tokenKey = "token"
  

  private user = new BehaviorSubject<LoginRequest | null>(null) 
  user$ = this.user.asObservable()

  updateUser(user: LoginRequest){
    this.user.next(user)
    this.setToken(user.token)
  }

  constructor(private httpClient: HttpClient) { }

  signIn(data: LoginResponse): Observable<AuthRequest> {
    return this.httpClient.post<AuthRequest>(this.endpoints.signin, data);
  }
  signUp(data: RegistrationResponse){
    return this.httpClient.post<AuthRequest>(this.endpoints.signup, data);
  }

  setToken(value: string) {
    localStorage.setItem(this.tokenKey, value);
}

getToken() {
    return localStorage.getItem(this.tokenKey);
}

removeToken() {
    localStorage.removeItem(this.tokenKey);
}
decodeToken(){
  const token = this.getToken()
  if(token){
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/_/g, '+').replace(/_/g, '+')
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => {
        return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2)
      }).join('')
    )
    return JSON.parse(jsonPayload)

  }
}
getRole(){
  return this.decodeToken().role
}
getUserId(){
  const userId = this.decodeToken()?.sub
  if(userId)
    return userId
  return null
}


}
