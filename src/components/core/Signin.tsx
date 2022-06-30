import React from 'react';
import { Layout } from './Layout';
import { Button, Checkbox, Form, Input, message, Result } from 'antd';
import {  UserOutlined, LockOutlined }  from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signin, SigninPayload } from '../../store/actions/auth.action';
import { AuthState } from '../../store/reducers/auth.reducer';
import { AppState } from '../../store/reducers';
import { Link, Redirect } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';
export const Signin:React.FC = () => {
    
    // const onFinish = (values: any) => {
    //     console.log('Success:', values);
    //   };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      //表单布局
      const formItemLayout = {
          wrapperCol: { offset: 8, span: 10},
      };

    
  // 1．获取登录结果
    //获取登录API的数据
    //使用dispatch获取 saga
    const dispatch = useDispatch();
    //使用useSelector获取注册结果 返回结果要使用泛型确定类型
    const auth = useSelector<AppState, AuthState >(state => state.auth);
    //注册表单提交
    const onFinish = (value: SigninPayload) => {
      dispatch(signin(value));
      // console.log(value);
      // console.log(API);
    };
    
    //2，登录失败显示错误信息
      //登录失败 显示登录失败信息
      function loginFail() {
        if (auth.signin.loaded && !auth.signin.success) {
          return (
            <Result
              status="warning"
              title="登录失败"
              subTitle={auth.signin.message}
              // extra={[
              //   <Button type="primary" key="console">
              //     <Link to='/signin'>重新登录</Link>
              //   </Button>
              // ]}
            />
          );
        }
      }
    // 3，登录成功根据角色跳转到对应的管理页面
    //登录成功 重定向到Dashboard页面
    function redirectToDashboard() {
      const auth = isAuth();
      if(auth) {
        message.success("登录成功");
        //解构赋值
        const { user: {role} } = auth as Jwt;
        if(role === 0) {
          return <Redirect to="/user/dashboard"/>
        } else {
          return <Redirect to="/admin/dashboard"/>
        }

      }
    }
    //4．处理导航链接已登录隐藏[登录，注册]显示[dashboard]


    function showForm() {
      return (
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        { ...formItemLayout }
        >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="./">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item  wrapperCol={{ offset: 11, span: 12 }}>
        <Button  size="middle" type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        || <Link to="/signup">注册</Link>
      </Form.Item>
    </Form>
      );
    }
      
  return (
    <Layout title="登录" subTitle="每一本书，让你更成为自己">
          {loginFail()}
          {redirectToDashboard()}
          {showForm()}
            {/* <Form
            {...formItemLayout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input  size="large"/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password size="large" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>记住</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 12 }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
            </Form> */}
    </Layout>
  )
}
