import React, { useState } from 'react';
import Lottie from "lottie-react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthWrapper } from './style';
import groovyWalkAnimation from "../../../../demoData/signup.json";
import Heading from '../../../../components/heading/heading';

function SignUp() {
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <Row>
        <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
          <div>
            <div className="logobox">
              <img src={require(`../../../../static/img/newlogo.png`)} alt="" />
              <h5>One mySetu </h5>
            </div>
            <div className="leftimg martopzero" >
              <Lottie animationData={groovyWalkAnimation} />
              {/*  <img
                    src={ require(`../../../../static/img/img_user1.jpg`)}
                    alt=""
                  /> */}
            </div>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
          <div className="auth-contents  registerform">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Heading as="h3">Sign Up Now</Heading>
              <Form.Item name="companyname" rules={[{ required: true, message: 'Please input company name!' }]}>
                <Input placeholder="Company Name" />
              </Form.Item>
              <Form.Item name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                <Input placeholder="Full Name" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                <Input placeholder="Enter Email" />
              </Form.Item>
              <Form.Item name="mobileno" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
                <Input placeholder="Mobile No." />
              </Form.Item>

              <Form.Item>
                {/* <Button className="btn-create" htmlType="submit" type="primary" size="large">
              Create Account
            </Button> */}

                <Button className="btn-create" type="primary" size="large">
                  <NavLink to="/finish">Next</NavLink>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </AuthWrapper>
  );
}

export default SignUp;
