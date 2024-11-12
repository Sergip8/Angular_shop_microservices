export class Category{

    categoryId: number = 0
    categoryName: string = ""
    categoryLevel: number = 0
    categoryParentId: number = 0
    //productIds: number[]
}
export interface CategoryRequest{
    data: Category | Category[]
    count: number
    success: boolean
    message: string
}
export class CategoryDataRequest{
    categoryId: number = 0
    categoryName: string = ""
    categoryLevel: number = 0
    categoryParentId = 0

}