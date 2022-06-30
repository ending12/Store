import { CategoryName } from "./category"

export interface Products {
    _id: string
    sold?: number
    name: string
    description: string
    price: number
    category: CategoryName
    photo: FormData
    quantity: number
    shipping: boolean
    createAt: string
}

export interface Price {
    id: number
    name: string
    array: [number?, number?]
}