import { Typography } from "antd"
import React, { FC, useEffect } from "react";
import { CartItem } from "../../helpers/carts";

const {Title} = Typography; 

interface Props {
    cart: CartItem []
    setTotalPrice: (price: number) => void
}
export const TotalPrice: FC<Props> = ({ cart, setTotalPrice }) => {
    const getTotalPrice = () => {
        // console.log(cart)
        return cart
          .reduce((currentValue, nextValue) => {
              console.log(currentValue, nextValue.price, nextValue.count);
            return (currentValue += (nextValue.price * nextValue.count) || 0)
          }, 0)
          .toFixed(2)
      }
    
      useEffect(() => {
        setTotalPrice(parseFloat(getTotalPrice()))
      }, [cart, getTotalPrice])
    
      return <Title level={5}>商品总价: {getTotalPrice()}</Title>

}