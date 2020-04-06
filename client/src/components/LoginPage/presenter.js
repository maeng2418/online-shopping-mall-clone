import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// xs   <   sm   <   md   <   lg   <   xl   <   xxl
//     576      768      992      1200     1600
// span 24를 최대로 본다.
// offset은 앞에 공간.

const LoginPage = (props) => {
  return (
    <div style={{ display: 'flex', margin: 'auto' }}>
      <Form initialValues={{ remember: true, email: props.email }} style={{ minWidth: '360px', display: 'flex', flexDirection: "column" }} onFinish={props.onSubmitHandler}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '이메일을 입력하세요!',
            },
          ]}
        >
          <Input
            id="email"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: '.5rem' }} />}
            placeholder="Enter your email"
            type="email"
            defaultValue={props.email}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '패스워드를 입력하세요!',
            },
          ]}
        >
          <Input.Password
            id="password"
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: '.5rem' }} />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Email 기억하기</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
            로그인
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage