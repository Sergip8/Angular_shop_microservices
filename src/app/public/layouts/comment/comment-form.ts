import { NgClass, NgFor } from "@angular/common"
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Comment } from "../../../models/comments"


@Component({
    selector: 'comment-form',
    standalone: true,
    imports: [
       NgFor, NgClass, ReactiveFormsModule
    ],
    template: ` 
   <div class="w-full">
   <form class=" w-full" [formGroup]="commentForm">
   <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calificación</label>

    <div class="flex my-2" (mouseleave)="hoverStars = 0">
   
        <div *ngFor="let i of [].constructor(5); let a = index">
        <div [ngClass]="a+1 <= hoverStars || starSelected > a? 'text-yellow-300': 'text-gray-100'" (click)="clickStar(a+1)" (mouseover)="starHover(a+1)">
            <svg  class="me-1 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        </div>
         </div>

    </div>
   
   <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese un titulo</label>
    <input formControlName="title" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="indique un titulo" />
  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
  <textarea formControlName="content" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  <button (click)="onSubmit()" type="submit" class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Accept</button>

</form>
 
</div>
    `,
    styles: [`
    `]
  })
  export class CommentFormComponent  {
onSubmit() {
  this.commentFormData.emit({
    commentId: 0,
    title: this.commentForm.value.title,
    content: this.commentForm.value.content,
    createdDate: new Date,
    score: this.starSelected,
    votes: 0,
    commentHeaderId: 0
  })
}

    commentForm: FormGroup = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
    })

    constructor(){

    }
  starHover(index: number) {
   this.hoverStars = index
  
  }
  clickStar(index: number){
    if(this.starSelected == index){
      this.starSelected = 0
      return
    }
    this.starSelected = index
    console.log(this.starSelected)
  }
   

  @Output() commentFormData = new EventEmitter<Comment>()
    hoverStars = 0
    starSelected = 0
  }