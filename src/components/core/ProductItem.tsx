import { Button, Card, Col, Image, Row, Typography } from "antd";
import { push } from "connected-react-router";
import moment from "moment";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../config";
import { addItem } from "../../helpers/carts";
import { Products } from "../../store/models/products";

//使用?:表示可进行省略的属性
interface Props {
    products: Products,
    showViewProduct?: boolean
    showCartBtn?: boolean
}

//组件之间接收参数还是在函数的（）中接收参数参数
export const ProductItem: FC<Props> = ({
    products,
    showViewProduct = true,
    showCartBtn = true
}) => {
    const { Title, Paragraph } = Typography;
    const dispatch = useDispatch()

    const addToCart = () => {
      addItem(products, () => {
        dispatch(push("/cart"))
      })
    }
  
    const showButtons = () => {
        let buttonArray = []
        if (showViewProduct)
          buttonArray.push(
            <Button type="link">
              <Link to={`/product/${products._id}`}>查看详情</Link>
            </Button>
          )
        if (showCartBtn) {
          buttonArray.push(
            <Button type="link" onClick={addToCart}>
              加入购物车
            </Button>
          )
        }
        return buttonArray
      }


    return (
        <Card
      cover={
        <Image style={{width:250,height:180}}
          src={`${API}/product/photo/${products._id}`}
          alt={products.name}
        />
      }
      actions={showButtons()}
    >
      <Title level={5}>{products.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{products.description}</Paragraph>
      <Row>
        <Col span="12">销量: {products.sold}</Col>
        <Col span="12" style={{ textAlign: "right" }}>
          价格: {products.price}
        </Col>
      </Row>
      <Row>
        <Col span="12">
          上架时间: {moment(products.createAt).format("YYYY-MM-DD")}
        </Col>
        <Col span="12" style={{ textAlign: "right" }}>
          所属分类: {products.category.name}
        </Col>
      </Row>
    </Card>
  
    )
}