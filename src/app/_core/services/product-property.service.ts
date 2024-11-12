import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductPropertyType, ProductPropertyTypeRequest } from "../../models/product-property";

const baseUrl = "https://localhost:8003/api/Properties"

@Injectable({
    providedIn: 'root'
  })
  export class PropertyService {
  
      constructor(private http: HttpClient){}
  
      getProductProperty(page: number, size: number){
          return this.http.get<ProductPropertyTypeRequest>(baseUrl+"/"+page+"/"+size)
      }
  }