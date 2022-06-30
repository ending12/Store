import React, { useEffect } from 'react'
import { Layout } from './Layout'
import { Button, Form, Input, InputNumber, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SignupPayload, signup, restState } from '../../store/actions/auth.action';
import { AuthState } from '../../store/reducers/auth.reducer';
import { AppState } from '../../store/reducers';
import { Link } from 'react-router-dom';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 10 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    password: '${label} 请填入正确的密码'
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
// const validatePassword = {
//   required: '请填写 ${label} ', 
//   type: {

//   }
// }
const Signup = () => {

  //使用dispatch获取 saga
  const dispatch = useDispatch();
  //使用useSelector获取注册结果 返回结果要使用泛型确定类型
  const auth = useSelector<AppState, AuthState >(state => state.auth);
  //关联表单对象
  const [ form ] = Form.useForm();

  //注册表单提交
  const onFinish = (value: SignupPayload) => {
    dispatch(signup(value));
    // console.log(value);
    // console.log(API);
  };

  //1 使用useEffect监听auth注册结果的变化情况 注册成功清空表单
  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields();//清空表单
    } 
  }, [auth, form]);
 
  //2 显示注册成功信息
  function showSuccess () {
    if (auth.signup.loaded && auth.signup.success) {
      return (
        <Result
          status="success"
          title="注册成功"
          subTitle="welcome"
          extra={[
            <Button type="primary" key="console">
              <Link to='/signin'>登录</Link>
            </Button>
          ]}
        />
      )
    } 
  }

  //3 显示注册失败
  function showFail() {
    if (auth.signup.loaded && !auth.signup.success) {
      return (
        <Result
          status="warning"
          title="注册失败"
          subTitle={auth.signup.message}
          extra={[
            <Button type="primary" key="console">
              <Link to='/signup'>重新注册</Link>
            </Button>
          ]}
        />
      )
    } 
  }
  //4 重置注册表单
  useEffect(() => {
    return () => {
      dispatch(restState());
    }  
  }, [dispatch])

  //表单组件
  function showForm() {
    return (
      <Form form= { form } {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name='name' label="昵称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' label="密码" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name= 'email' label="邮箱" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name= 'age' label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='phone' label="手机号码">
          <Input />
        </Form.Item>
        <Form.Item name='introduction' label="自我介绍">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button size="middle" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout title="注册" subTitle="WelCome">
      <div>
        {showSuccess() || showForm()}
        {showFail()} 
        {/* {showForm()} */}
      </div>
    </Layout>
  )
}

export default Signup