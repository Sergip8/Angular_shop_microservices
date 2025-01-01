import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { pageTransition } from '../../../../shared/utils/animations';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Coupon, CouponRequest } from '../../../../models/coupon';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertType } from '../../../../shared/components/alert/alert.type';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { Pagination } from '../../../../models/pagination';

const baseUrl = "http://localhost:8001/api/CouponApi"
@Component({
  selector: 'admin-alert',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    ReactiveFormsModule,
    FormComponent,
    DataTableComponent
  ],
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
  animations: [pageTransition],
})
export class AdminAlertComponent implements OnInit{
goToPage(page: number) {
  this.page = page
  this.getCoupons()
}

  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  emptyCoupon = new Coupon

  getFormData(coupon: Coupon) {
    if(coupon.couponId == 0){
      this.storeCoupon(coupon)
    }else{
      this.updateCoupon(coupon)
    }
  }


page= 1
size = 3
  private readonly http = inject(HttpClient)
  private readonly datePipe = inject(DatePipe)
  coupons:Coupon[] = []
  pagination: Pagination = new Pagination()
itemId: number = 0
  constructor(){}
  ngOnInit(): void {
   this.getCoupons()
  }
  //readonly alertType = AlertType;

  getCoupons(){
    this.http.get<CouponRequest>(baseUrl+`/${this.page}/${this.size}`).subscribe({
      next: data => {
        if(data.data){
          this.coupons = <Coupon[]>data.data

        }
        this.pagination = {page: this.page, size: this.size,count: data.count}
        console.log(this.pagination.count)
      },
      error: e => console.log(e.code)

    })
  }
  getCouponByCode(code: string){
    if(code != "")
      this.http.get<CouponRequest>(baseUrl+"/code/"+code).subscribe({
        next: data => {
          this.coupons = []
          this.coupons = <Coupon[]>data.data
        }

      })
  }
  updateCoupon(coupon: Coupon){
    this.http.put<CouponRequest>(baseUrl, coupon).subscribe({
      next: data => {
        
        this.alertMsg = data.message
          if(data.success){
            this.alert = this.alertType.Success
            
          }else{
            this.alert = this.alertType.Danger
          }
      },
      error: e =>{
        this.alert = this.alertType.Danger
        this.alertMsg = e.message
      },
      complete: ()=> this.showAlertElement()
    })
  }
  storeCoupon(coupon: Coupon){
    this.http.post<CouponRequest>(baseUrl,coupon).subscribe({
      next: data => {
        this.coupons.unshift(<Coupon>data.data)
        console.log(data.data)
        this.alertMsg = data.message
        if(data.success){
          this.alert = this.alertType.Success
          
        }else{
          this.alert = this.alertType.Danger
        }
      },
      error: e => console.log(e)
    })
  }

  showAlertElement(){
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, 4000);
    
  }
}
