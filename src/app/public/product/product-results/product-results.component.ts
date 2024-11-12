import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Product, ProductData, ProductRequest, ProductResponse, PropertyValue } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../models/pagination';
import { CardComponent } from '../../../shared/components/card/card.component';
import { FilterItem, FilterList } from '../product-filter/filter-item';

const baseUrl = "https://localhost:8003/api/ProductApi"

@Component({
  selector: 'app-product-res',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.css'],
 
})
export class ProductResultsComponent implements OnInit {
applyFilter(filters: FilterList[]) {
  this.productResponse.filters = filters
  this.updateFilters = false
  this.getProducts()
}
sortSelected(sort: string) {
  console.log(sort)
  this.productResponse.order = this.order(sort)
  this.getProducts()
}
  filterBrands:any 
  filterProperties: any

  @Input() q!: string
  private readonly http = inject(HttpClient)
  products:ProductData[] = []
  loading: boolean = false
  updateFilters = true
  productResponse: ProductResponse = new ProductResponse()
  itemId: number = 0
  pagination: Pagination = new Pagination()
  page= 1
  size = 6
  orderSelect= {
    default: "Relevancia",
    list: ["A-Z", "Z-A", "Lower price", "higher price",]
  }

  constructor(){
  }
  ngOnInit(): void {
    this.productResponse.query = this.q
    console.log(this.q)
    this.getProducts()
  }
  
  getProducts(){
    this.loading = true
    console.log(this.productResponse)
    this.http.post<ProductRequest>(baseUrl+"/results", this.productResponse).subscribe({
      next: data => {
        if(data.products){
          console.log(data)
          if(this.updateFilters){

            this.filterBrands = {
              title: "Marcas",
              isSingle: true,
              list: data.brands.map(_ => Object.assign({id: _.brandId, label: _.brandName, type:"brand"}))     
            }
            this.orderFilterProperties(data.properties)
            this.filterProperties.unshift(this.filterBrands)
            console.log(this.filterProperties)
          }
        this.products = <ProductData[]>data.products
        }
        this.pagination = {page: this.page, size: this.size,count: data.count}
      },
      error: e => console.log(e.code),
      complete: () => this.loading = false

    })
  }
  order(value: string){
    switch(value){
      
      case "A-Z":
        return {field: "name", direction: "asc"}
      case "Z-A":
        return {field: "name", direction: "desc"}
        
      case "Lower price":
        return {field: "price", direction: "asc"}
      case "Higher price":
        return {field: "price", direction: "desc"}
      
      default:
        return {field: "productId", direction: "asc"}
        
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes["q"].currentValue != "" && !changes["q"].firstChange){
      this.productResponse.query = changes["q"].currentValue
      //console.log(changes["q"].currentValue)
      this.getProducts()
    }
  }
  orderFilterProperties(properties: PropertyValue[]){
    this.filterProperties = Object.values(
      properties.reduce((acc: any, property) => {
        const { propertyValueId, propertyName, propertyValueName } = property;
        
        if (!acc[propertyName]) {
            acc[propertyName] = {
                title: propertyName,
                isSingle: false,
                list: []
            };
        }
        
        // Añadimos solo valores únicos a la lista, comprobando si ya existe un objeto con el mismo id
        if (!acc[propertyName].list.some((item:any) => item.id === propertyValueId)) {
            acc[propertyName].list.push({ id: propertyValueId, label: propertyValueName , type: "property"});
        }

        return acc;
    }, {} as Record<string, FilterItem>)
).map((item:any) => ({
    ...item,
    list: item.list.sort((a:any, b:any) => parseInt(b.value) - parseInt(a.value)) // Orden descendente
}));
  
  }
}
