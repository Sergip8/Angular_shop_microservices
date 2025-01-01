import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { GroupedProperties, Product, ProductData, ProductDetailsRequest, ProductRequest, ProductResponse } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../models/pagination';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductService } from '../../../_core/services/product.service';
import { CommentService } from '../../../_core/services/comment.service';
import { Comment, CommentHeader } from '../../../models/comments';
import { DetailProductResponse } from '../../../models/details-product';

const baseUrl = "http://localhost:8000/api/ProductApi"

@Component({
  selector: 'app-product-res',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
 
})
export class ProductDetailsComponent implements OnInit {

  @Input() link!: string
  productData!: ProductData
  productComments!: CommentHeader
  loading = false
  page= 1
  size = 3
  productId = 0
  properties: GroupedProperties[] = []
 
  constructor(private productService: ProductService, private commentService: CommentService){
    
  }
  ngOnInit(): void {
    const splitLink = this.link.split("-")
    const idStr = splitLink[splitLink.length -1]
    if(!Number.isNaN(idStr))
      this.productId = Number(idStr)
    console.log(this.productId)
    console.log(this.link)
    this.getProductByLink()
    this.getProductComments()
  }
  getProductByLink(){
    if(this.link){
      this.loading = true
      this.productService.getProductByLink({link: this.link, page:this.page, size: this.size}).subscribe({
        next: data => {
          this.productData = data
          this.properties = this.transformData(data.properties)
          console.log(data)
        },
        error: e => {console.log(e)},
        complete: () => this.loading = false
      })

    }
  }
  getProductComments(){
    if(this.productId != 0){
      console.log(this.productId)
      this.loading = true
      this.commentService.getCommentsByProductId(this.productId, this.page, this.size).subscribe({
        next: data => {
          this.productComments = data.data
          console.log(data)
        },
        error: e => {console.log(e)},
        complete: () => this.loading = false
      })

    }
  }
  storeComment(comment: Comment){
    let headerComment =  {...this.productComments}
    console.log(this.productData.comment)
    if(headerComment.commentHeaderId !== 0){
      console.log("exist comment header")
      
      headerComment.overallScore = ((headerComment.overallScore*headerComment.commentCount) + comment.score)/(headerComment.commentCount+1)  
      headerComment.commentCount++
    }else{
      console.log("new comment header")
      headerComment = new CommentHeader()
      headerComment.productId = this.productData.id
      headerComment.overallScore = comment.score  
    }
    comment.commentHeaderId = headerComment.commentHeaderId
    headerComment.comments = [comment]
    console.log(comment)
    console.log(headerComment)
    this.commentService.storeComment(headerComment).subscribe({ 
      error: e  => console.log(e)  
    })
  }

  transformData(data: any): GroupedProperties[] 
   {
    // Mapear y agrupar por propertyTypeName
    const groupedMap = new Map<string, GroupedProperties>();
  
    let propertyTypeIdCounter = 1; // Contador para generar propertyTypeId
    let propertyValueIdCounter = 1; // Contador para generar propertyValueId
  
    data.forEach((item: any) => {
      const propertyTypeName = item.property.propertyType.propertyTypeName;
  
      // Si el tipo ya existe, lo usamos, si no, lo creamos
      if (!groupedMap.has(propertyTypeName)) {
        groupedMap.set(propertyTypeName, {
          propertyType: {
            propertyTypeName,
            propertyTypeId: propertyTypeIdCounter++
          },
          values: []
        });
      }
  
      const grouped = groupedMap.get(propertyTypeName);
      if (grouped) {
        grouped.values.push({
          propertyValueId: propertyValueIdCounter++, // Generamos un ID único
          propertyName: item.property.propertyName,
          propertyValueName: item.propertyValueName
        });
      }
    });
  
    // Convertir el Map a un array de GroupedProperties
    return Array.from(groupedMap.values());
  };
  
}
