import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CouponService } from '../../../_core/services/coupon.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[DatePipe]
})
export class ElementsModule { }
