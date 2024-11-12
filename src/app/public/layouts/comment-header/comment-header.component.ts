import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Comment, CommentHeader } from '../../../models/comments';
import { CommentComponent } from '../comment/comment.component';
import { StarHeaderComponent } from '../comment/comment-header-stars';
import { StarScoreComponent } from '../details-main-info-card/star-score';
import { CommentFormComponent } from '../comment/comment-form';
import { CommentService } from '../../../_core/services/comment.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../models/pagination';


@Component({
  selector: 'comment-header',
  standalone: true,
  imports: [CommentComponent, StarHeaderComponent, StarScoreComponent, CommentFormComponent, PaginationComponent],
  templateUrl: './comment-header.component.html',
  styleUrl: './comment-header.component.css',
})
export class CommentHeaderComponent implements OnInit {

  page= 1
  size = 3
  private commentService = inject(CommentService)
  pagination!: Pagination

  @Input() commentHeader!: CommentHeader
  @Output() comment = new EventEmitter<Comment>()
  

  constructor(){
    
  }
  ngOnInit(): void {
    this.pagination = {page: this.page, size: this.size, count: this.commentHeader.commentCount}
  }
  getPageCommets(){
    console.log(this.page)
    this.commentService.getComments(this.commentHeader.commentHeaderId, this.page, this.size).subscribe({
      next: data => {
        if(data){
          console.log(data)
          this.commentHeader.comments = data
        }
      }
    })
  }
  goToPage(page: number){
    console.log(page)
    this.page = page
    this.getPageCommets()
  }
 
}
