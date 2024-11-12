export class ProductPropertyType{
    propertyTypeId: number = 0
    propertyTypeName: string = ""
    propertyTypeDescription: string =""
    propertyTypeOrder: number = 0
    properties: ProductProperty[] = [new ProductProperty]
}

export class ProductProperty{
    propertyId: number = 0
    isPrincipal: boolean = false
    propertyName: string = ""
    propertyTypeId: number = 0
    propertyOrder: number = 0
    propertyValues: ProductPropertyValues[] = [new ProductPropertyValues]
}
export interface ProductPropertyTypeRequest{
    count: number
    success: boolean
    message: string
    data: ProductPropertyType | ProductPropertyType[]
}
export class ProductPropertyValues{
    propertyValueId: number = 0
    propertyValueName: string = ""
    propertyId: number = 0
}

