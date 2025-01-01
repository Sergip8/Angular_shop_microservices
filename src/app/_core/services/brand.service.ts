import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandRequest } from "../../models/brand";

const baseUrl = "http://localhost:8003/api/Brand"
@Injectable({
    providedIn: 'root'
  })
  export class BrandService {

    constructor(private http: HttpClient){}


    getByName(name: string,){
        return this.http.get<BrandRequest>(baseUrl +"/name/"+ name)
    }
  }
      