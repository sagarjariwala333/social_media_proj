import React, { useState } from 'react';
import Lottie from "lottie-react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'; 
import { Form,Button,Row, Col } from 'antd';
import { AuthWrapper } from './style';  
import groovyWalkAnimation from "../../../../demoData/thankyou.json";

function SignupPage3() {
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = (values) => {

    setState({ ...state, values });
  };

 

  return (
    <AuthWrapper>
       
       <Row>
          <Col xxl={24} xl={24} lg={24} md={25} xs={24}>
              <div>
                <div className="logobox">
                <img
                    src={ require(`../../../../static/img/newlogo.png`)}
                    alt=""
                  />
                 <h5>One mySetu </h5>
                </div>               
              </div>
          </Col>
        </Row>
        <Row>
        <Col xxl={24} xl={24} lg={24} md={25} xs={24}>
          <div className="auth-contents  registerform thankyoupage">
          <div className="imgbox">
                {/* <img
                    src={ require(`../../../../static/img/img_thankyou.jpg`)}
                    alt=""
                  /> */
                  
                  <Lottie animationData={groovyWalkAnimation} />}
                </div>
        <Form name="register" onFinish={handleSubmit} layout="vertical"> 
          <Form.Item>
            {/* <Button className="btn-create" htmlType="submit" type="primary" size="large">
              Create Account
            </Button> */}

            <Button className="btn-create" type="primary" size="large">
              <NavLink to="/">Get Started Now</NavLink>
            </Button>
          </Form.Item> 
           
        </Form>
      </div>
          </Col>
      </Row>
    
     
    </AuthWrapper>
  );
}

export default SignupPage3;
