import { Button, Form, Input, message } from "antd";
import Axios from "axios";
import React, {  useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../store/models/auth";
import { Layout } from "../core/Layout";

export const Category = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { offset: 0, span: 10 },
      };
    const [name, setName] = useState<string>("");
    const {user, token } = isAuth() as Jwt;
    const [form] = Form.useForm();
    useEffect(() => {
        async function addCategory() {
            try {
                let responce = await Axios.post <{ name: string}>(`${API}/category/create/${user._id}`,
                {name: name},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                message.success(`【${ responce.data.name }】 分类添加成功`);
            } catch (error: any) {
                message.error(error.response.data.error);
            }
        }
        if(name) {
            addCategory();
        }
    }, [name, token, user._id]);
    
    const onFinish = (value: { name: string }) => {
        console.log(value)
        setName(value.name)
      }
    const onReset = () => {
        form.resetFields();
    }
    return (
      <Layout title="添加分类" subTitle="">
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item  name="name" label="分类名称">
            <Input />
          </Form.Item>
          <Form.Item  wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              添加分类
            </Button>
            <Button style={{left: '2%'}} type="primary" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>

        <Button style={{ left: '47%', right: '50%' }}>
          <Link to="/admin/dashboard">返回 Dashboard</Link>
        </Button>
      </Layout>
    )
} 