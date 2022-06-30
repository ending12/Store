import { Col, Row } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductById } from "../../store/actions/product.action"
import { AppState } from "../../store/reducers"
import { ProductState } from "../../store/reducers/product.reducer"
import { Layout } from "./Layout"
import { ProductItem } from "./ProductItem"

export const Product = () => {
    const dispatch = useDispatch();
    const { products }  = useSelector<AppState, ProductState>( state => state.products);
    const { productId } = useParams< { productId: string } >();
    console.log(products);
    console.log(productId);
    useEffect(() => {
        dispatch(getProductById({ productId }));
    },[])
    return (
        <Layout title="商品名称" subTitle="商品描述">
          <Row gutter={36}>
            <Col span="18">
              <ProductItem showViewProduct={false} products={products.result} />
            </Col>
            <Col span="6">right</Col>
          </Row>
        </Layout>
      )
}