import { NgClass, NgFor, NgIf, NgTemplateOutlet, isPlatformBrowser } from "@angular/common";
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, PLATFORM_ID, TemplateRef, ViewChild, inject } from "@angular/core";
import { CarouselData } from "../../../models/product-home";
import { Images } from "../../../models/product";
import { SlideConfig } from "./slider-config";

import { SlickCarouselModule } from "ngx-slick-carousel";


@Component({
    standalone: true,
    selector: 'home-carousel',
    templateUrl: './home-carousel.component.html',
    styleUrls: ['./home-carousel.component.scss'],
    imports:[NgFor, NgIf,NgClass, NgTemplateOutlet, SlickCarouselModule]
  })
  export class CarouselComponent {

  selectedIndex = 0
  notFound = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
  @Input() items!: Images[]
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true
};
  
  afterChange(e: any) {
    this.selectedIndex = e.currentSlide;
  }
  
  beforeChange(e: any) {
   // console.log(e);
  }
  imageNotFound(index: number){
    this.items[index].imageUrl = this.notFound
  }
 
  }