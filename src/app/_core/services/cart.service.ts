import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CartDb } from "../../models/shopping-cart"
import { CouponRequest } from "../../models/coupon"
import { BehaviorSubject } from "rxjs"

const baseUrl = "http://localhost:8000/api/cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {
    
    private cart = new BehaviorSubject<number>(0)
    cart$ = this.cart.asObservable()

    constructor(private http: HttpClient){}

    updateCartCount(cart: number){
      this.cart.next(cart)
    }

    cartUpsert(cart: CartDb){
        return this.http.post<CouponRequest>(baseUrl +"/CartUpsert", cart)
    }

    applyCode(code: string){
      return this.http.post
    }
}