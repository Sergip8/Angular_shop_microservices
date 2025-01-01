import { FilterList } from "../public/product/product-filter/filter-item"
import { Brand } from "./brand"
import { Category, CategoryDataRequest, CategoryRequest } from "./category"
import { CommentHeader } from "./comments"
import { Inventory } from "./inventory"

export class Product{
    id: number = 0
    name: string = ""
    previous_price: number = 0
    current_price: number = 0
    link: string = ""
    //categoryName: string = ""
    description: string = ""
}
// export class ProductWrite{
//     productId: number = 0
//     name: string = ""
//     price: number = 0
//     imageUrl: string = ""
//     categoryName: string = ""
//     description: string = ""
//     brandId: number = 0
//     categoryIds: number[] = []
// }
// export class ProductRead{
//     productId: number = 0
//     name: string = ""
//     price: number = 0
//     imageUrl: string = ""
//     categoryName: string = ""
//     description: string = ""
//     brandId: number = 0
//     categoryProductDTO: CategoryRead[] = []
// }
export interface ProductData{
    id: number
    name: string
    previous_price: number
    current_price: number
    link: string
    //categoryName: string = ""
    description: string
    brand: Brand,
    categories: CategoryDataRequest[]
    inventory: Inventory
    images: Images[]
    comment: CommentHeader
    properties: GroupedProperties[]
}
export class ProductWrite{
    productId: number = 0
    name: string = ""
    price: number = 0
    description: string = ""
    brandId: number = 0
    imageUrls: Images[] = []
    categoryIds: number[] = []
}

export interface PriceRange{
    highPrice: number 
    lowPrice: number 
}
export class Images{
    imageLabel: string = ""
    imageUrl: string = ""
}

export interface ProductRequest{
    products: ProductData[] | ProductData
    brands: Brand[]
    categories: Category[]
    properties: PropertyValue[]
    count: number
    success: boolean
    message: string
}
export interface ProductDetailsRequest{
    products: ProductData
    brands: Brand
    categories: Category[]
    properties: PropertyValue[]
    count: number
    success: boolean
    message: string
}
export class ProductResponse{
    page: number = 1
    size: number = 20
    query: string =""
    filters: FilterList[] = []
    order: Order = new Order
}
export class Order{
    field: string = ""
    direction: string = ""
}
export interface CartProduct{
    id: number
    name: string
    current_price: number
    //imageUrl: string
    description: string 
    quantity: number
}
export interface Cart{
    cartId: number
    cartHeader: Header
    cartProducts: CartProduct[]
   
}
export enum QtyDirection{
    MINUS,
    PLUS
  }
export class Header{
    couponCode: string = ""
    discount: number = 0
    cartTotal: number = 0
}
export interface PropertyTypeRequest
{
    propertyTypeName: string
    propertyTypeId: number
}

export interface GroupedProperties
{
    propertyType: PropertyTypeRequest
    values: PropertyValue[]
}

export interface PropertyValue
{
    propertyValueId: number
    propertyName: string 
    propertyValueName: string
}
