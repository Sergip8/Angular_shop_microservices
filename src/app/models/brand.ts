export interface Brand{
    brandId: number
    brandName: string

}

export interface BrandRequest{
    data: Brand | Brand[]
    count: number
    success: boolean
    message: string
}