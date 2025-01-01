import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductDetailsRequest, ProductRequest } from "../../models/product";
import { DetailProductResponse } from "../../models/details-product";

const baseUrl = "http://localhost:8000/api/ProductApi"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient){}

    getProductByLink(pp: DetailProductResponse){
        return this.http.get<any>(baseUrl+ "/link/"+ pp.link)
    }
    getHomeProducts(){
      return this.http.get<any>(baseUrl+ "/home-products")
    }
}