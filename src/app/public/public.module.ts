import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { PublicFooterComponent } from './layouts/footer/footer.component';
import { PublicHeaderComponent } from './layouts/header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ProductResultsComponent } from './product/product-results/product-results.component';
import { ProductModule } from './product/product.module';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { CardCatComponent } from "../shared/components/card/card-cat.compoment";
import { CardHomeComponent } from "../shared/components/card/card-products-home.component";


@NgModule({
  declarations: [PublicComponent, PageNotFoundComponent, HomeComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AuthModule,
    ProductModule,
    PublicHeaderComponent,
    PublicFooterComponent,
    RouterOutlet,
    CardCatComponent,
    CardHomeComponent
],

})
export class PublicModule {}
