import { Button, Form, Input, message, Select, Upload } from "antd";
import Axios from "axios";
import React, {  useEffect, useState }  from "react";
import { API } from "../../config";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../store/models/auth";
import { Layout } from "../core/Layout";
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { RcFile } from "antd/lib/upload";
import { AppState } from "../../store/reducers";
import { CategoryState } from "../../store/reducers/category.reducer";
import { getCategory } from "../../store/actions/category.action";

export const AddProduct = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { offset: 0, span: 10 },
      };

    const dispatch = useDispatch();
    // 使用useState和useEffect保存状态
    useEffect(() => {
        dispatch(getCategory());
    },[dispatch]);
    const {user, token} = isAuth() as Jwt;

    const [file, setFile] = useState<RcFile>();
    //上传为图片
    const props = {
        accept: "image/*",
        beforeUpload: function (file: RcFile) {//原生upload会在图片上传时自动发送请求，这里要取消默认行为，等表单提交后一起发送
            setFile(file);
            return false;
        }
    }
    
    const category = useSelector<AppState, CategoryState>(
        state => state.category
    );

    const onFinish = (product: any) => {
        const formData = new FormData();

        for(let attr in product) {
            formData.set(attr, product[attr]);
        }

        if( typeof file !== "undefined") {
            formData.set("photo", file);
        }

        Axios.post(`${API}/product/create/${user._id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        ).then(
            () => {
                message.success("商品添加成功");
            },
            () => {
                message.error("商品添加失败");
            }
        )
    }

    return (
        <Layout title="添加商品" subTitle="">
            <Form {...layout} onFinish={onFinish} initialValues={{ category: "" }}>
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}   labelCol={{ span: 8 }}>
          <Upload  {...props}>
            <Button icon={<UploadOutlined />}>上传商品封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="商品描述">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="商品价格">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">
          <Select>
            <Select.Option value="">请选择分类</Select.Option>
            {category.category.result.map(item => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="商品数量">
          <Input />
        </Form.Item>
        <Form.Item name="shipping" label="是否需要运输">
          <Select>
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 12 }} >
          <Button type="primary" htmlType="submit">
            添加商品
          </Button>
        </Form.Item>
      </Form>
        </Layout>
    )
}