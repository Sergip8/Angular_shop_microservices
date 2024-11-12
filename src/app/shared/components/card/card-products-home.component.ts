import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { ProductData } from "../../../models/product";
import { CurrencyPipe } from "@angular/common";



@Component({
    
    selector: 'app-card-home',
    standalone: true,
    imports: [CurrencyPipe],
    template: `
    <div class="my-5">
        <div class=" w-full flex flex-col justify-center text-2xl px-4 h-12 bg-slate-100 dark:bg-slate-400 border-b-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100">
            Nombre 
        </div>
        <div class="flex gap-[1px]">
                @for (item of data; track $index) {
                <div class="group flex w-full max-w-xs flex-col overflow-hidden border-gray-100 bg-white  dark:bg-gray-400 dark:border-gray-600 ">
                <a class="relative flex h-50 overflow-hidden" href="#">
                  <img class=" top-0 right-0 h-full w-full object-cover" (error)="errorImage($index)" [src]="item.images[0].imageUrl" alt="product image" />
                
                  <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                    <button class="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </a>
                <div class="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 class="dark:text-gray-100 text-xl tracking-tight text-slate-900">{{item.product.name }}</h5>
                  </a>
                  <div class="mt-2 mb-5 flex items-center justify-between">
                    <div class="">
                        <div class="dark:text-gray-300 text-lg text-slate-900 line-through">{{item.price.highPrice | currency: '$ ':'symbol' :'1.0-0'}}</div>
                        <div class="dark:text-gray-200 text-2xl font-bold text-slate-900">{{item.price.lowPrice | currency: '$ ':'symbol' :'1.0-0'}}</div>
                    </div>
                  </div>
                  <button class="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            }
    
            </div>

    </div>
    `,
    styles: [`
        
    `],

  })
  export class CardHomeComponent {

    @Input() data!: ProductData[]
    @Output() selected = new EventEmitter<string>()
    notFound = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
    isErrorImg = false

    errorImage(i: number){
        this.data[i].images[0].imageUrl = this.notFound
      }

  }