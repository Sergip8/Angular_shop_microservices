import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../../public/layouts/home-navbar';
import { ProductBarComponent } from '../../public/layouts/home-products-bar';
import { CarouselComponent } from '../../public/layouts/home-carousel/home-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent, ProductBarComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
