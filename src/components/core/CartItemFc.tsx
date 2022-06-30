import React, { ChangeEvent, FC, useState } from "react"
import { Button, Image, Input } from "antd" 
import { API } from "../../config"
import { CartItem, updateCart, deleteItem } from "../../helpers/carts"

interface Props {
    products: CartItem
    setCart: (arg: CartItem[]) => void
}
export const CartItemFc:FC<Props> = ({products, setCart}) => {
    //这里的count和value要指定products
    const [count, setCount] = useState<number>(products.count);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        let count = parseInt(event.target.value)
        setCart(updateCart(products._id, count));
        setCount(count);
    }
    return (
        <tr className="ant-table-row">
          <td className="ant-table-cell">
            <Image width={120} src={`${API}/product/photo/${products._id}`} />
          </td>
          <td className="ant-table-cell">{products.name}</td>
          <td className="ant-table-cell">{products.price}</td>
          <td className="ant-table-cell">{products.category.name}</td>
          <td className="ant-table-cell">
            <Input type="number" value={count} onChange={handleChange} />
          </td>
          <td className="ant-table-cell">
            <Button
              onClick={() => setCart(deleteItem(products._id))}
              danger
              type="primary"
            >
              删除
            </Button>
          </td>
        </tr>
      )
}
