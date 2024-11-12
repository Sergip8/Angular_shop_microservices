import { CurrencyPipe, DecimalPipe, NgClass, NgFor, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'star-score',
    standalone: true,
    imports: [
        NgClass, NgFor, NgStyle, DecimalPipe
    ],
    template: ` 
   <div class="flex items-center">
    <div *ngFor="let i of [].constructor(5); let a = index">
      <div [ngClass]="a< roundScore(score) ? 'text-yellow-300': 'text-gray-100'">
      <div [ngClass]="'w-'+starSize">
          <svg  class="me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>

      </div>

      </div>

    </div>
   
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-100">{{score | number:'1.2-2'}}</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-100">out of</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-100">5</p>
</div>
    `,
    styles: [`
    `]
  })
  export class StarScoreComponent  {

    @Input() score!: number 
    @Input() starSize: number = 4

    roundScore(score: number){
      return Math.round(score)
    }
  }