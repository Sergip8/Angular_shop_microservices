import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CouponRequest } from "../../models/coupon"
import { Category, CategoryRequest } from "../../models/category"


const baseUrl = "https://localhost:8003/api/Category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    

    constructor(private http: HttpClient){}


    getByName(name: string, catLevel: number, parentId: number){
        return this.http.get<CategoryRequest>(baseUrl +"/name/"+ name +"/"+ catLevel+"/"+parentId)
    }

    getAllCategories(){
        return this.http.get<CategoryRequest>(baseUrl)
       }

    storeCategory(category: Category){
        return this.http.post<CategoryRequest>(baseUrl, category)
    }
    updateCategory(category: Category){
        return this.http.put<CategoryRequest>(baseUrl, category)
    }
}