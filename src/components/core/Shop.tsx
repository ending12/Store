import { Button, Col, Empty, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterProduct } from '../../store/actions/product.action';
import { AppState } from '../../store/reducers';
import { ProductState } from '../../store/reducers/product.reducer';
import CheckBox  from './Checkbox';
// import { useSelector } from 'react-redux'
import { Layout } from './Layout';
import { ProductItem } from './ProductItem';
import { RadioBox } from './RadioBox';

/**useSelector
 * 该Hooks是用来访问redux的state的
 * @returns JSX
 */
export const Shop = () => {
  //商品呈现 和过滤
  const dispatch = useDispatch()
  const [skip, setSkip] = useState<number>(0)

  const products = useSelector<AppState, ProductState>(state => state.products)

  const [myFilters, setMyFilter] = useState<{
    category: string[]
    price: number[]
  }>({ category: [], price: [] })

  useEffect(() => {
    setSkip(0)
  }, [myFilters])

  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip }))
  }, [myFilters, skip])

  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <CheckBox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters })
        }}
      />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters })
        }}
      />
    </Space>
  )
  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {products.filter.result.data.map(item => (
        <Col key={item._id} span="6">
          <ProductItem products={item} />
        </Col>
      ))}
    </Row>
  )

  const loadMoreButton = () => {
    return (
      <Row>
        {products.filter.result.size >= 4 && (
          <Button onClick={loadMore}>加载更多</Button>
      )}
      </Row>
    )
  }

  const loadMore = () => {
    setSkip(skip + 4)
  }

  const noData = () => {
    return <Row>{products.filter.result.size === 0 && <Empty />}</Row>
  }

  return (
    <Layout title="购物商城" subTitle="买买买" >
       <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">
          {productDOM()} {loadMoreButton()} {noData()}
        </Col>
      </Row>   
    </Layout>
  )
}
