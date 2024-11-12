export interface FilterItem{
    title: string
    isSingle: boolean
    list: FilterList[]
    

}
export interface FilterList{
    type: string
    id: number
    label: string
    
}