import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ModalModule } from '../../../../shared/components/modal/modal.module';
import { pageTransition } from '../../../../shared/utils/animations';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PropertyService } from '../../../../_core/services/product-property.service';
import { ProductPropertyType } from '../../../../models/product-property';
import { Pagination } from '../../../../models/pagination';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { FormComponent } from '../../../../shared/components/form/form.component';


@Component({
  selector: 'product-property',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    DataTableComponent
  ],
  templateUrl: './product-property.component.html',
  styleUrl: './product-property.component.css',
  animations: [pageTransition]
})
export class ProductPropertyComponent  implements OnInit {
  ngOnInit(): void {
    this.getPropertyType()
  }

  page = 1
  size = 3
  productPropertyType: ProductPropertyType[] = []
  pagination: Pagination = new Pagination()
  emptyProperty = new ProductPropertyType

  private propertyService = inject(PropertyService)
  getPropertyType(){
    this.propertyService.getProductProperty(this.page, this.size).subscribe({
      next: data => {
        if(data.data){
          this.productPropertyType = <ProductPropertyType[]>data.data
          console.log(this.productPropertyType)
      }
        this.pagination = {page: this.page, size: this.size,count: data.count}
        console.log(this.pagination.count)
      },
      error: e => console.log(e.code)

    })
  
 
}
goToPage(page: number) {
  this.page = page
  this.getPropertyType()
}
getFormData(data: ProductPropertyType) {
  // if(coupon.couponId == 0){
  //   this.storeCoupon(coupon)
  // }else{
  //   this.updateCoupon(coupon)
  // }
}
}
