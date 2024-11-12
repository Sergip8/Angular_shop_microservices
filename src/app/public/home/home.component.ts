import { Component, OnInit } from '@angular/core';
import {PublicRoutes} from "../public.routes";
import {CommonService} from "../../_core/services/common.service";
import {AppRoutes} from "../../app.routes";
import {AdminRoutes} from "../../admin/admin.routes";
import { ProductService } from '../../_core/services/product.service';
import { ProductData } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  readonly publicRoutes = PublicRoutes;
  homeProducts: ProductData[] = []

  constructor(public readonly commonService: CommonService, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.getHomeProducts()
  }
  getHomeProducts(){
    this.productService.getHomeProducts().subscribe({
      next: data => {
        this.homeProducts = data.data
        console.log(this.homeProducts)
      },
      error: e => console.log(e)
    })
  }

  protected readonly AppRoutes = AppRoutes;
  protected readonly AdminRoutes = AdminRoutes;
}
