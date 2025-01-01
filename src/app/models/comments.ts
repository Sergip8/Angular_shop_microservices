export class CommentHeader{
    commentHeaderId: number = 0
    overallScore: number = 0
    qtyForStar: string = ""
    commentCount: number = 1
    productId: number = 0
    scoreList: number[] =[] 
    comments: Comment[] = []
}
export class Comment{
    commentId: number = 0
    title: string = ""
    content: string = ""
    createdDate: Date = new Date
    score: number = 0
    votes: number = 0
    commentHeaderId: number = 0
    userDetails: CommentUserDetails = new CommentUserDetails
}
export class CommentUserDetails{
    userId: string = "1"
    name: string = "user"
    email: string = "user"
}