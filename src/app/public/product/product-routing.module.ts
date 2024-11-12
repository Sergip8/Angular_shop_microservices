import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicRoutes} from "../public.routes";
import { ProductResponse } from '../../models/product';
import { ProductResultsComponent } from './product-results/product-results.component';
import { ProductCartComponent } from './productCart/product-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    title: "products",
    path: PublicRoutes.ProductSearch+ "/:q",
    component: ProductResultsComponent
  },
  {
    title: "productsCart",
    path: PublicRoutes.Cart,
    component: ProductCartComponent
  },
  {
    title: "productDetails",
    path: PublicRoutes.ProductDetails + "/:link",
    component: ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
