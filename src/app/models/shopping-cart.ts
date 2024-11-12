import { Product } from "./product"

export class CartHeader{
    cartHeaderId: number = 0
    userId: string = ""
    couponCode: string = ""
    discount: number = 0
    cartTotal: number = 0
}
export class CartDetails{
    cartDetailsId: number = 0
    cartHeaderId: number = 0
    productId: number = 0
    count: number = 0
}
export class CartDb{
    cartHeader: CartHeader = new CartHeader
    cartDetails: CartDetails[] = []
}