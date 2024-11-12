import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeInOut } from '../../utils/animations';
import { Pagination } from '../../../models/pagination';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  animations: [fadeInOut]
})
export class PaginationComponent implements OnInit {

  rowPerPage = [
    10,20,50,100
  ]
  ngOnInit(): void {
    this.currentPage = this.pagination.page
    const numPages = Math.ceil(this.pagination.count/this.pagination.size)
    for (let i = 1; i <= numPages; i++) {
      this.pages.push(i);
    }
    console.log(this.pagination)
  }

  currentPage = 1

  pages: number[] = []
  @Input() pagination: Pagination = new Pagination()
  @Output() goToPage = new EventEmitter<Pagination>()

  prev() {
    if(this.currentPage>1){
      this.currentPage--
      this.pagination.page = this.currentPage
      this.goToPage.emit(this.pagination)
    }
    }
    next() {
      if(this.currentPage<this.pages.length){
        this.currentPage +=1
        console.log(this.currentPage)
        this.pagination.page = this.currentPage
        this.goToPage.emit(this.pagination)
      }
    }
}
