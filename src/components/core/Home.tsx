import { Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/product.action';
import { AppState } from '../../store/reducers';
import { ProductState } from '../../store/reducers/product.reducer';
import { Layout } from './Layout';
import { ProductItem } from './ProductItem';
import { Search } from './Search';
export const Home = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  //指定空格，表示只进行一次调用
  useEffect( () => {
    dispatch(getProducts("createAt"));
    dispatch(getProducts("sold"));
  },[]);
  const { createAt, sold }  = useSelector<AppState, ProductState>( state => state.products);
  // console.log(sold);

  return (
        <Layout title="首页" subTitle="商城精选" >
          <Search />
          <Title level={5}>最新上架</Title>
          <Row gutter={[16, 16]}>
            {createAt.result.map(item => (
              <Col key={item._id} span="6">
                <ProductItem products={item}/>
              </Col>
            ))}
          </Row>
          <Title level={5}>最受欢迎</Title>
          <Row gutter={[16, 16]}>
            {sold.result.map(item => (
              <Col key={item._id} span="6">
                <ProductItem products={item}/>
              </Col>
            ))}
          </Row>
        </Layout>
  )
}
