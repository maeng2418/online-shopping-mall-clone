import React from 'react';
import { Form, Input, Button } from 'antd';
// iPhone(320) S5(360) iPhone6/7/8/X(375) iPhone+(414) iPad(768) iPad-Pro(1024)
// xs   <   sm   <   md   <   lg   <   xl   <   xxl
//     576      768      992      1200     1600
// span 24를 최대로 본다.
// offset은 앞에 공간.
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const RegisterPage = (props) => (
  <div style={{ display: 'flex', margin: 'auto' }}>
    <Form hideRequiredMark={true} style={{ minWidth: '360px', display: 'flex', flexDirection: 'column' }} {...formItemLayout} onFinish={props.onSubmitHandler} >
      <Form.Item name="name" required label="Name" labelAlign="left" hasFeedback>
        <Input
          id="name"
          placeholder="Enter your name"
          type="text"
        />
      </Form.Item>
      <Form.Item name="lastName" required label="Last Name" labelAlign="left" hasFeedback>
        <Input
          id="lastName"
          placeholder="Enter your Last Name"
          type="text"
        />
      </Form.Item>
      <Form.Item name="email" required label="Email" labelAlign="left" hasFeedback>
        <Input
          id="email"
          placeholder="Enter your Email"
          type="email"
        />
      </Form.Item>
      <Form.Item name="password" required label="Password" labelAlign="left" hasFeedback>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </Form.Item>

              <Form.Item name="confirmPassword" required label="Confirm" labelAlign="left" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" style={{ minWidth: '100%' }} type="primary">
                  회원 가입
                </Button>
              </Form.Item>
    </Form>
  </div>
);

export default RegisterPage;
