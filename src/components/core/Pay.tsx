import { Button } from "antd"
import axios from "axios"
import React from "react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { API } from "../../config"
import { isAuth } from "../../helpers/auth"
import { CartItem } from "../../helpers/carts"
import { Jwt } from "../../store/models/auth"

interface Props {
    totalPrice: number
    address: string
    cart: CartItem[]
  }
  
export const Pay: FC<Props> = ({ totalPrice, address, cart }) => {
    const getPayUrl = () => {
        axios
          .post(`${API}/alipay`, {
            totalAmount: totalPrice,
            subject: "测试订单标题",
            body: "测试订单描述",
            products: cart.map(products => ({
              count: products.count,
              products: products._id
            })),
            address: address,
            userId: (isAuth() as Jwt).user._id
          })
          .then(response => {
            window.location.href = response.data.result
          })
      }
    
      const showButton = () => {
        return isAuth() ? (
          <Button onClick={getPayUrl}>提交订单</Button>
        ) : (
          <Button>
            <Link to="/signin">登录</Link>
          </Button>
        )
      }
    
      return <>{showButton()}</>
}