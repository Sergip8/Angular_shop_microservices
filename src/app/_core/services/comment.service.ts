import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Comment, CommentHeader } from "../../models/comments"

const baseUrl = "http://localhost:8000/api/Comment"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient){}

    storeComment(comment: CommentHeader){
        return this.http.post(baseUrl, comment)
    }
    getComments(commentHeaderId: number, page: number, size: number){
      return this.http.get<Comment[]>(baseUrl +`/page/${commentHeaderId}/${page}/${size}`)
    }
    getCommentsByProductId(productId: number, page: number, size: number){
      return this.http.get<any>(baseUrl +`/${productId}/${page}/${size}`)
    }

}