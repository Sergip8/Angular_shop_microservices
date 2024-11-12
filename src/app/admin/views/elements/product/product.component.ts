import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { pageTransition } from '../../../../shared/utils/animations';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Product, ProductData, ProductRequest, ProductWrite,} from '../../../../models/product';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertType } from '../../../../shared/components/alert/alert.type';
import { FormComponent } from "../../../../shared/components/form/form.component";
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { Pagination } from '../../../../models/pagination';
import { CategoryService } from '../../../../_core/services/category.service';
import { Category, CategoryDataRequest } from '../../../../models/category';
import { BrandService } from '../../../../_core/services/brand.service';
import { Brand } from '../../../../models/brand';

export class ResultList{
  value: string = ""
  id: number = 0
}

const baseUrl = "https://localhost:8003/api/ProductApi"
@Component({
    selector: 'admin-alert',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    animations: [pageTransition],
    imports: [
        CommonModule,
        AlertComponent,
        ReactiveFormsModule,
        FormComponent,
        DataTableComponent
    ]
})
export class ProductComponent implements OnInit{
formInputValue(data: any) {
  
  this.resultListCat = []
  if(data.type === "category"){
    let lastItemId = 0 
    if(this.selectedListCat.length>0){
      lastItemId = this.selectedListCat[this.selectedListCat.length-1].id
    }
    console.log(this.selectedListCat)
    this.categoryService.getByName(data.value, this.selectedListCat.length, lastItemId).subscribe({
      next: data => {
        const cat = <Category[]>data.data
        cat.map(c =>  this.resultListCat.push({value: c.categoryName, id: c.categoryId}))
        console.log(data.data)
      }
    })
  }
  console.log(data)
  if(data.type === "brand"){
    this.resultListBrand = []
    this.brabdService.getByName(data.value).subscribe({
      next: data => {
        const brand = <Brand[]>data.data
        brand.map(b =>  this.resultListBrand.push({value: b.brandName, id: b.brandId}))
        console.log(data.data)
      }
    })
  }
}

  goToPage(page: number) {
    this.page = page
    this.getProducts()
  }

getFormData(product: ProductWrite) {
  
  // if(this.selectedListBrand.length>0){
  //   product.brand = {brandId: this.selectedListBrand[0].id, brandName: this.selectedListBrand[0].value}
  // }
  // product.categories = this.selectedListCat.map(c => Object.assign({categoryId: c.id, categoryName: c.value}))

 console.log(product)
  if(product.productId == 0){
    this.storeProduct(product)
  }else{
    this.updateProduct(product)
  }
}
private readonly categoryService = inject(CategoryService)
private readonly brabdService = inject(BrandService)
private readonly http = inject(HttpClient)
private readonly datePipe = inject(DatePipe)

  productData!: ProductData[]
  emptyProduct:Product = new Product()
  selectedListCat: ResultList[] = []
  selectedListBrand: ResultList[] = []
  resultListCat: ResultList[] = []
  resultListBrand: ResultList[] = []
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  products:Product[] = []
itemId: number = 0
pagination: Pagination = new Pagination()
page= 1
size = 8

  constructor(){}
  ngOnInit(): void {
   this.getProducts()
   
  }
  //readonly alertType = AlertType;

  getProducts(){
    this.http.get<any>(baseUrl+`/${this.page}/${this.size}`).subscribe({
      next: data => {
        console.log(data)
        if(data.data.length >0){
          const productData = <ProductData[]>data.data
          
          this.productData = productData
          this.products = productData.map(p => p.product)
        }
        this.pagination = {page: this.page, size: this.size,count: data.count}
      },
      error: e => console.log(e.code)

    })
  }
  // getProductByCode(code: string){
  //   if(code != "")
  //     this.http.get<ProductRequest>(baseUrl+"/code/"+code).subscribe({
  //       next: data => {
  //         this.products = []
  //         const list = <ProductRead[]>data.data
  //         this.products = list.map(p => {
  //           return {
  //             productId: p.productId,
  //             name: p.name,
  //             price: p.price,
  //             imageUrl: p.imageUrl,
            
  //             description: p.description
  //           }
  //         })
  //         console.log(this.products)
          
  //       }

  //     })
  // }
  updateProduct(product: ProductWrite){
    this.http.put<ProductRequest>(baseUrl, product).subscribe({
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
  storeProduct(product: ProductWrite){
    
    this.http.post<ProductRequest>(baseUrl, product).subscribe({
      next: data => {
        const productData = <ProductData>data.products
        this.products.unshift(productData.product)
        console.log(data.products)
        this.alertMsg = data.message
        if(data.success){
          this.alert = this.alertType.Success
          
        }else{
          this.alert = this.alertType.Danger
        }
      },
      error: e => console.log(e),
      complete: ()=> this.showAlertElement()
    })
  }

  showAlertElement(){
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, 4000);
    
  }
}
