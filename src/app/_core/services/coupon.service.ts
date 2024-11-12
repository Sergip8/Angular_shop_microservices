import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon, CouponRequest } from '../../models/coupon';



const baseUrl = "https://localhost:8004/api/CouponApi"

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private _http: HttpClient) {
   }

   getAllCoupons(){
    return this._http.get<CouponRequest>(baseUrl)
   }

   getCouponById(id: number){
    return this._http.get<CouponRequest>(baseUrl+"/"+id)
   }

   getCouponByCode(code: string){
    return this._http.get<CouponRequest>(baseUrl+"/code/"+code)
   }
   storeCoupon(coupon: Coupon){
    return this._http.post(baseUrl, coupon)
   }
   updateCoupon(coupon: Coupon){
    return this._http.put(baseUrl, coupon)
   }
   deleteCoupon(id: number){
    return this._http.delete<CouponRequest>(baseUrl+"/delete/"+id)
   }
   
}
