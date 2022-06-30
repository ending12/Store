import { User } from "./auth"
import { Products } from "./products"

export interface OrderProduct {
  _id: string
  count: number
  products: Products
}

export interface Order {
  _id: string
  products: OrderProduct[]
  trade_no: number
  amount: number
  address: string
  status: string
  updated: Date
  user: User
  createdAt: string
}
