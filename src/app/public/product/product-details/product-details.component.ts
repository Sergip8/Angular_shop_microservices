import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Product, ProductData, ProductDetailsRequest, ProductRequest, ProductResponse } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../models/pagination';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductService } from '../../../_core/services/product.service';
import { CommentService } from '../../../_core/services/comment.service';
import { Comment, CommentHeader } from '../../../models/comments';
import { DetailProductResponse } from '../../../models/details-product';

const baseUrl = "http://localhost:5000/api/ProductApi"

@Component({
  selector: 'app-product-res',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
 
})
export class ProductDetailsComponent implements OnInit {

  @Input() link!: string
  productData!: ProductData
  loading = false
  page= 1
  size = 3
 
  constructor(private productService: ProductService, private commentService: CommentService){
    
  }
  ngOnInit(): void {
    console.log(this.link)
    this.getProductByLink()
  }
  getProductByLink(){

    if(this.link){
      this.loading = true
      this.productService.getProductByLink({link: this.link, page:this.page, size: this.size}).subscribe({
        next: data => {
          this.productData = data.data
          console.log(data)
        },
        error: e => {console.log(e)},
        complete: () => this.loading = false
      })

    }
  }

  storeComment(comment: Comment){

    let headerComment =  {...this.productData.comment}
    console.log(this.productData.comment)
    if(headerComment.commentHeaderId !== 0){
      console.log("exist comment header")
      
      headerComment.overallScore = ((headerComment.overallScore*headerComment.commentCount) + comment.score)/(headerComment.commentCount+1)  
      headerComment.commentCount++
    }else{
      console.log("new comment header")
      headerComment = new CommentHeader()
      headerComment.productId = this.productData.product.productId
      headerComment.overallScore = comment.score

    }
    comment.commentHeaderId = headerComment.commentHeaderId
    headerComment.comments = [comment]
    console.log(headerComment)
    this.commentService.getProductByLink(headerComment).subscribe({ 
      error: e  => console.log(e)  
    })
  }

}
