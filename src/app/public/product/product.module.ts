import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../../shared/components/spinner/spinner.component";
import {ValidationErrorComponent} from "../../shared/components/validation-error/validation-error.component";
import {AlertComponent} from "../../shared/components/alert/alert.component";
import { httpInterceptorProviders } from '../../_core/interceptors/interceptors.provider';
import { ProductRoutingModule } from './product-routing.module';
import { ProductResultsComponent } from './product-results/product-results.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SelectComponent } from '../../shared/components/select/select';
import { ProductCartComponent } from './productCart/product-cart.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthModule } from '../auth/auth.module';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { ProductService } from '../../_core/services/product.service';
import { CarouselComponent } from '../layouts/home-carousel/home-carousel.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DetailsMainInfoCardComponent } from '../layouts/details-main-info-card/details-main-info-card.component';
import { CommentComponent } from '../layouts/comment/comment.component';
import { CommentHeaderComponent } from '../layouts/comment-header/comment-header.component';
import { CommentService } from '../../_core/services/comment.service';
import { PropertyTableComponent } from '../layouts/property-table/property-table.component';
import { FallbackImgDirective } from '../../shared/directives/fallback-img.directive';
import { ProductFilterComponent } from './product-filter/product-filter.component';


@NgModule({
  declarations: [
   ProductResultsComponent,
   ProductCartComponent,
   ClickOutsideDirective,
   ProductDetailsComponent,
   
   
  ],
  
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SpinnerComponent,
    CardComponent,
    SelectComponent,
    AlertComponent,
    ModalComponent,
    AuthModule,
    CarouselComponent,
    DetailsMainInfoCardComponent,
    CommentHeaderComponent,
    PropertyTableComponent,
    ProductFilterComponent
  ],
  exports: [
    ProductResultsComponent,
    ProductCartComponent,
    ClickOutsideDirective,
   
  ],
  providers:[ProductService, CommentService]
 
})
export class ProductModule { }
