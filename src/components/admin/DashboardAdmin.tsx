import { Button, Col, Descriptions, Menu, Row } from "antd";
import React from "react";
import { isAuth } from "../../helpers/auth";
import { Layout } from "../core/Layout";
import { UserOutlined, OrderedListOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import { Jwt } from "../../store/models/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/actions/category.action";
import { AppState } from "../../store/reducers";
import { CategoryState } from "../../store/reducers/category.reducer";

export const DashboardAdmin: React.FC = () => {

  const {user: {name, email}} = isAuth() as Jwt;
  const dispatch = useDispatch();
  const category = useSelector<AppState, CategoryState>( state => state.category);
  const getList = () => {
    dispatch(getCategory())
    console.log(category.category.result);
  }

    return (
      <Layout title="管理员 Dashboard" subTitle="">
        <Row>
          <Col span={4}>
          <Title level={5} >管理员链接</Title>
          <Menu>
            <Menu.Item icon={<ShoppingCartOutlined/>}>
              <Link to="/create/category">添加分类</Link>
            </Menu.Item>
            <Menu.Item>
              <UserOutlined />
              <Link to="/create/product">添加产品</Link>
            </Menu.Item>
            <Menu.Item>
              <OrderedListOutlined />
              <Link to="/admin/orders">订单列表</Link>
            </Menu.Item>
            <Menu.Item>
            <Button type="primary" onClick={getList}>获取分类</Button>

            </Menu.Item>
          </Menu>
          </Col>
          <Col span={20}>
              <Descriptions title="管理员信息" bordered>
              <Descriptions.Item label="呢称">{name}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
              <Descriptions.Item label="角色">管理员</Descriptions.Item>
            </Descriptions>
          </Col>
      </Row>
      </Layout>
      )
}