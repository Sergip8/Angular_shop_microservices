import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Comment, CommentHeader } from "../../models/comments"

const baseUrl = "https://localhost:8006/api/Comment"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient){}

    getProductByLink(comment: CommentHeader){
        return this.http.post(baseUrl, comment)
    }
    getComments(commentHeaderId: number, page: number, size: number){
      return this.http.get<Comment[]>(baseUrl +`/page/${commentHeaderId}/${page}/${size}`)
    }
}