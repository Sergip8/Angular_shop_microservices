import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { PublicRoutes } from '../../public.routes';
import { Images } from '../../../../assets/data/images';
import { AppRoutes } from '../../../app.routes';
import { AdminRoutes } from '../../../admin/admin.routes';
import { CommonService } from '../../../_core/services/common.service';
import { db } from '../../../_core/indexedDB/DBConfig';
import { Cart } from '../../../models/product';
import { NgIf } from '@angular/common';
import { CartService } from '../../../_core/services/cart.service';

@Component({
  selector: 'public-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class PublicHeaderComponent implements OnInit {

  cart: number = 0 
  private router = inject(Router)
  public mainLogo: string = Images.mainLogo;
  readonly publicRoutes = PublicRoutes;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  constructor( public readonly commonService: CommonService, private cartService: CartService) {
    cartService.cart$.subscribe(c => this.cart = c)
  }
  async ngOnInit() {
    const tempCard = await db.obtenerCarrito(1) 
    if(tempCard)
      this.cart = tempCard.cartProducts.reduce((total, producto) => total + producto.quantity, 0)
  }

  search(value: string){
      this.router.navigate([this.publicRoutes.ProductSearch+ "/" +value])
  }
}
