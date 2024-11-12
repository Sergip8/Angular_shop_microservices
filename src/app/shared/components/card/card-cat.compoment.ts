import { NgStyle } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { SlickCarouselModule } from "ngx-slick-carousel";

@Component({
  selector: "app-card-cat",
  standalone: true,
  imports: [SlickCarouselModule, NgStyle],
  template: `
  <div>
    <div class="border-gray-200 border-b-[1px] w-full flex flex-col justify-center text-2xl px-4 h-12 bg-slate-100 dark:bg-slate-400 dark:border-gray-600 text-gray-700 dark:text-gray-100">
             Nombre 
         </div>
     <ngx-slick-carousel
       class="flex justify-center items-center py-2 bg-slate-100 dark:bg-gray-400 border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-100"
       #slickModal="slick-carousel"
       [config]="slideConfig"
       (beforeChange)="beforeChange($event)"
       (afterChange)="afterChange($event)"
     >
       @for (icon of icons; track $index) {
       <div ngxSlickItem class="w-60" >
         <div (click)="catSelected(icon)" class="w-fit cursor-pointer">
             <img [src]="icon.iconPath" alt="" width="60" class="ms-2 dark:text-gray-100 text-gray-300" />
             <p [ngStyle]="{ 'margin-left': icon.m + 'px' }">{{ icon.name }}</p>
         </div>
       </div>
       }
     </ngx-slick-carousel>
     <div class="w-full flex">
       <button class=" rounded-lg absolute -mt-16  left-10" (click)="slickModal.slickPrev()">
         <svg
           class=" fill-slate-500"
           width="30px"
           height="30px"
           viewBox="-4.5 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
         >
           <g transform="translate(-385.000000, -6679.000000)">
             <g id="icons" transform="translate(56.000000, 160.000000)">
               <path
                 d="M338.61,6539 L340,6537.594 L331.739,6528.987 L332.62,6528.069 L332.615,6528.074 L339.955,6520.427 L338.586,6519 C336.557,6521.113 330.893,6527.014 329,6528.987 C330.406,6530.453 329.035,6529.024 338.61,6539"
                 id="arrow_left-[#334]"
               ></path>
             </g>
           </g>
         </svg>
       </button>
       <button class="rounded-lg absolute -mt-16 right-10" (click)="slickModal.slickNext()">
         <svg
           class=" fill-slate-500"
           width="30px"
           height="30px"
           viewBox="-4.5 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
         >
           <g transform="translate(-425.000000, -6679.000000)">
             <g id="icons" transform="translate(56.000000, 160.000000)">
               <path
                 d="M370.39,6519 L369,6520.406 L377.261,6529.013 L376.38,6529.931 L376.385,6529.926 L369.045,6537.573 L370.414,6539 C372.443,6536.887 378.107,6530.986 380,6529.013 C378.594,6527.547 379.965,6528.976 370.39,6519"
                 id="arrow_right-[#333]"
               ></path>
             </g>
           </g>
         </svg>
       </button>
     </div>

  </div>
  `,
  styles: [`
    .slick-slide{
    display: flex;
    justify-content: center;
}
    `],
})
export class CardCatComponent {
catSelected(item: { iconPath: string; name: string; m: number; }) {
    console.log(item)
}
  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
  };
  icons = [
    {
      iconPath: "./assets/images/icons/cat-icons/tv-card.svg",
      name: "Televisores",
      m: 0,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/cellphone-card.svg",
      name: "Celulares",
      m: 4,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/fridge-card.svg",
      name: "Electro",
      m: 15,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/computer-card.svg",
      name: "Equipos",
      m: 10,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/food-card.svg",
      name: "Despensa",
      m: 4,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/toys-card.svg",
      name: "Juguetes",
      m: 6,
    },
    {
      iconPath: "./assets/images/icons/cat-icons/car-card.svg",
      name: "Vehiculos",
      m: 6,
    },
  ];
  @Output() selected = new EventEmitter<string>();

  afterChange(e: any) {
    //this.selectedIndex = e.currentSlide;
  }

  beforeChange(e: any) {
    // console.log(e);
  }
}
