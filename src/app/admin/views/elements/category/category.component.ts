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
import { CategoryService } from '../../../../_core/services/category.service';
import { Category } from '../../../../models/category';

const baseUrl = "https://localhost:8001/api/CouponApi"
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
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [pageTransition],
})
export class CategoryComponent implements OnInit{
goToPage(page: number) {
  this.page = page
  this.getCategories()
}
  private categoryService = inject(CategoryService)
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  emptyCoupon = new Category

  getFormData(category: Category) {
    if(category.categoryId == 0){
      this.storeCategory(category)
    }else{
      this.updateCoupon(category)
    }
  }


page= 1
size = 3
  private readonly http = inject(HttpClient)
  private readonly datePipe = inject(DatePipe)
  categories:Category[] = []
  pagination: Pagination = new Pagination()
itemId: number = 0
  constructor(){}
  ngOnInit(): void {
   this.getCategories()
  }
  //readonly alertType = AlertType;

  getCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: data => {
        if(data.data){
          this.categories = <Category[]>data.data
          console.log(this.categories)
        }
        this.pagination = {page: this.page, size: this.size,count: data.count}
        console.log(this.pagination.count)
      },
      error: e => console.log(e.code)

    })
  }
  // getCategoryByName(name: string){
  //   if(name != "")
  //     this.categoryService.getByName(name).subscribe({
  //       next: data => {
        
  //       }

  //     })
  // }
  updateCoupon(category: Category){
    this.categoryService.updateCategory(category).subscribe({
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
  storeCategory(category: Category){
    this.categoryService.storeCategory(category).subscribe({
      next: data => {
        this.categories.unshift(<Category>data.data)
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
