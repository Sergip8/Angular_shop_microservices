import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Images, Product, ProductData, ProductWrite } from '../../../models/product';
import { Pagination } from '../../../models/pagination';
import { InputSearchComponent } from './input-search';
import { ResultList } from '../../../admin/views/elements/product/product.component';
import { CategoryDataRequest } from '../../../models/category';
import { Brand } from '../../../models/brand';
import { PaginationComponent } from '../pagination/pagination.component';
import { GenericFormComponent } from "../data-table-v2/generic-form.component";


export enum InputType{
  Category,
  brand
}

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, KeyValuePipe, FormComponent, InputSearchComponent, PaginationComponent, GenericFormComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})


export class DataTableComponent implements OnInit {
showList(list: any[], index: number) {
  this.sublist = list
  if(this.indexSublist === index)
    this.indexSublist = -1
  else
    this.indexSublist = index
}
isArray(value: any) {
  return !Array.isArray(value);
}


  category: CategoryDataRequest[] = []
  brand!: Brand
  images: Images[] = []
  product: ProductWrite = new ProductWrite
  sublist:any[] = []
  indexSublist = -1

mapResultList(cat: CategoryDataRequest[]): ResultList[] {
  //console.log(cat)
  return cat.map(c => Object.assign({id: c.categoryId, value: c.categoryName}))
}
mapResultListB(cat: Brand[]): ResultList[] {
  //console.log(cat)
  return cat.map(c => Object.assign({id: c.brandId, value: c.brandName}))
}
  showCatErrors: boolean = false

  getCategories(cat: ResultList[]){
    this.selectedListCat.emit(cat)
     this.product.categoryIds = cat.map(c => c.id)
  }
  getBrand(brand: ResultList[]){
    //this.selectedListBrand.emit(brand)
    this.product.brandId = brand[0].id
    //this.validateProduct()
 }
 getImages(images: Images[]) {
   console.log(images)
    this.images = images
    this.product.imageUrls = images
    this.validateProduct()
 }
 validateProduct(){
  if(this.product && this.product.imageUrls.length>0){
    this.form.emit(this.product)
  }
 }

saveData($event: any) {
  // if(this.resultListCat.length == 0){
  //   this.showCatErrors = true
  //   setTimeout(() => {
  //     this.showCatErrors = false
  //   }, 2500);
  // }
  console.log($event)
  if(this.isProduct){

    this.product.productId = $event.productId
    this.product.name = $event.name
    this.product.price = $event.price
    this.product.description = $event.description

   //this.validateProduct()
    
    

  }else{
    this.form.emit($event)

  }
}

  currentPage = 1

prev() {
if(this.currentPage>1){
  this.currentPage--
  this.goToPage.emit(this.currentPage)
}
}
next() {
  if(this.currentPage<this.pages.length){
    this.currentPage++
    this.goToPage.emit(this.currentPage)
  }
}

 

getProductByCode(arg0: string) {
throw new Error('Method not implemented.');
}
createConfirm() {
throw new Error('Method not implemented.');
}
createProduct() {
  this.isCreate = !this.isCreate
}
isCreate: boolean = false;
formData(data: any) {
  console.log(data)
}
itemId: number = -1;
editConfirm() {
throw new Error('Method not implemented.');
}
editItem(i: number) {
  this.itemId = i
}
@Input() isProduct: boolean = false
@Input() isSublist: boolean = false
  @Input() columnData: any[] = [];
  @Input() resultListCat: ResultList[] = [];
  @Input() resultListBrand: ResultList[] = [];
  @Input() rowData: any[] = [];
  @Input() updateData: any[] = [];
  @Input() pageData: number[] = [];
  @Input() idFieldName: string = "";
  @Output() form = new EventEmitter<any>()
  @Output() inputValue = new EventEmitter<any>()
  @Output() goToPage = new EventEmitter<number>()
  @Input() modelObj: any
  @Input() pagination: Pagination = new Pagination()
  @Output() selectedListCat = new EventEmitter<ResultList[]>()
  @Output() selectedListBrand = new EventEmitter<ResultList[]>()

  pages: number[] = []
  image: Images
  keys: string[] = []
  keysInput:string[] = []
  shorting: boolean = false;
  isDropdownOpen = false

  @ViewChildren(FormComponent) appForm!: QueryList<FormComponent>;
  @ViewChildren(InputSearchComponent) appFormSelect!: QueryList<InputSearchComponent>;

constructor(){
 this.image = new Images()
}
  ngOnInit(): void {
    if (this.isProduct){

    }
  }

submitForm() {
  this.appForm.forEach(f =>{
    f.confirm()
  })
  if(this.isProduct){
    this.appFormSelect.forEach(f =>{
      f.confirm()
    })
  }
  }

  sortingUp() {
    this.shorting = !this.shorting;
  }
  sortingDown() {
    this.shorting = !this.shorting;
  }
  ngOnChanges(changes: SimpleChanges) {
      if(changes["rowData"]?.currentValue.length>0){
        this.keys = Object.keys(this.rowData[0]);
      //   this.keys = this.keys.filter(key => {
      //     return !Array.isArray(this.rowData[0][key]);
      // });
      } 
      this.pagination =changes["pagination"]?.currentValue
      // if(changes["pagination"]?.currentValue.count>0){
      //   this.pages = []

      //   const pagination = changes["pagination"]?.currentValue
      //   const numPages = Math.ceil(pagination.count/pagination.size)
      //   for (let i = 1; i <= numPages; i++) {
      //     this.pages.push(i);
      //   }
        
        
      //   console.log(this.pages)
      // }
  }

  filterDataForm(data: any){
    const keys = Object.keys(data);
    return keys.filter(key => {
      // Verificar si el valor asociado a la clave no es una lista (array)
      return !Array.isArray(data[key]);
  });
  }
  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickInside = target.closest(`.search`);
    
    if (!clickInside) {
      this.isDropdownOpen = false;
    }
  }
  updateDataForm(data: any, index: number){

    this.form.emit(data)
  }
  }
