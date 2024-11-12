
export class Coupon{
    couponId: number = 0
    couponCode: string = ""
    discountAmount: number = 0
    minAmount: number = 0
    expirationDate: Date = new Date
    activationCount: number = 0
}

export interface CouponRequest{
    data: any
    count: number
    success: boolean
    message: string
}