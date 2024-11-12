import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Cart, CartProduct, Product, ProductRequest, ProductResponse, QtyDirection } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../models/pagination';
import { CardComponent } from '../../../shared/components/card/card.component';
import { db } from '../../../_core/indexedDB/DBConfig';
import { CartService } from '../../../_core/services/cart.service';
import { CouponService } from '../../../_core/services/coupon.service';
import { Coupon } from '../../../models/coupon';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CartDb, CartDetails, CartHeader } from '../../../models/shopping-cart';

const baseUrl = "https://localhost:8003/api/ProductApi"


@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
 
})
export class ProductCartComponent implements OnInit {



private cartService = inject(CartService) 
private couponService = inject(CouponService)
private authService = inject(AuthService)
private router = inject(Router)
showCouponError = false
coupon!: Coupon
couponMsg = {msg:"", color: ''}
showModal = false

checkout(event: Event) {
  event.stopPropagation();
  const userId = this.authService.getUserId()
  if(userId){
    const header = {...this.cart.cartHeader, userId: userId, cartHeaderId: 0}

    const details: CartDetails[] = []
    this.cart.cartProducts.map( c=> {
      details.push({
        cartDetailsId: 0,
        cartHeaderId: 0,
        productId: c.productId,
        count: c.quantity
      })
    })
    const cart = <CartDb>{
      cartHeader: header,
      cartDetails: details
    }
    console.log(cart)
    this.upsertCart(cart)
  
  }else{
    this.showModal = true
    //this.router.navigate(["/signin"])
  }
}

upsertCart(cart: CartDb){
  this.cartService.cartUpsert(cart).subscribe({
    next: data =>{
      if(data.success){
        console.log(data.data)
      }
    }
  })
}

applyCode(code: string) {
  this.getCouponCode(code)
}

async qtyAction(type: string, index: number) {
  const product = this.cart.cartProducts[index]
 
  if(type === "minus"){
      product.quantity -=1 
      this.cart.cartHeader.cartTotal -=product.price
      await db.guardarCarrito(this.cart)
      if(product.quantity === 0){
        this.removeItem(product.productId)
        const dbCart = await db.obtenerCarrito(1)
        if (dbCart?.cartProducts.length === 0){
          this.cart = {cartId: 1, cartHeader: new CartHeader, cartProducts: []}
          db.guardarCarrito(this.cart)

        }
        return
      }
  }
  if(type === "plus"){
    this.cart.cartHeader.cartTotal +=product.price
      product.quantity +=1 
  }
  
 this.cart.cartProducts[index] = product 
 await db.guardarCarrito(this.cart)
  db.obtenerCarrito(1)
  this.updateQty(this.cart.cartProducts)
}
async removeItem(productId: number) {
  this.cartItems = this.cart.cartProducts.filter(cp => cp.productId !== productId)
  this.cart.cartProducts = this.cartItems
  await db.guardarCarrito(this.cart)
  const dbCart = await db.obtenerCarrito(1)
  if(dbCart){
  this.cart = dbCart
  }
}
  qtyDirection = QtyDirection.MINUS
  cart!: Cart
  cartItems: CartProduct[] = []
  sum: number = 0
constructor(){ 
}
  async ngOnInit() {
    const dbCart = await db.obtenerCarrito(1)
    if(dbCart){

      
      this.cart = dbCart
      this.updateQty(this.cart.cartProducts)
    }else{
      this.cart = {cartId: 1, cartHeader: new CartHeader, cartProducts: []}
      db.guardarCarrito(this.cart)
    }
  }

updateQty(products: CartProduct[]){
  this.sum = products.reduce((total, producto) => total + (producto.price * producto.quantity), 0)
}
async getCouponCode(code: string){
  this.couponService.getCouponByCode(code).subscribe({
    next: data => {
        if(data.success){
          this.coupon = <Coupon>data.data
          this.cart.cartHeader.discount = this.coupon.discountAmount
          this.cart.cartHeader.couponCode = this.coupon.couponCode
          this.couponMsg = {msg: "El cupon fue aplicado", color: "#90D26D"}
          console.log(this.coupon)
          db.guardarCarrito(this.cart)
          this.showError()
        }else{
          this.couponMsg = {msg: "El cupon no es valido", color: "#DD5746"}
          this.showError()
        }
      }
    })
    
}
showError(){
  this.showCouponError = true;
  setTimeout(() => {
    this.showCouponError = false
  }, 2500);
  
}


}
