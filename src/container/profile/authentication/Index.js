
import React from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';


const AuthLayout = (WraperContent) => {
  return function () {

    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 4000, 
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    const isLoginPage = window.location.pathname === "/";
    console.log(window.location.pathname);
    return (
      <Row>
        {
        isLoginPage ? (
          <>
            <Col xxl={12} xl={12} lg={12} md={8} xs={24}>
              <Aside className="loginpage">
                <div className="auth-side-content">
                  <Content>
                    <Heading as="h1">
                    <img src={require(`../../../static/img/newlogo.png`)} alt="" />
                     <span> One mySetu </span>
                    </Heading>


                    <Slider {...settings}>
                      <div>
                        <img src={require(`../../../static/img/img_loginback.jpg`)} alt="" />                      
                        <div className="logintext">
                          <h2>Your Safety | Our Concern</h2>
                          <p>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate
                            the visual form of a document or a typeface without relying on meaningful content.{' '}
                          </p>
                        </div>
                      </div>
                      <div>
                        <img src={require(`../../../static/img/banner2.jpg`)} alt="" />      
                        <div className="logintext">
                          <h2>Your Safety | Our Concern</h2>
                          <p>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate
                            the visual form of a document or a typeface without relying on meaningful content.{' '}
                          </p>
                        </div>
                      </div>
                      <div>
                      <img src={require(`../../../static/img/banner3.jpg`)} alt="" />     
                      <div className="logintext">
                          <h2>Your Safety | Our Concern</h2>
                          <p>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate
                            the visual form of a document or a typeface without relying on meaningful content.{' '}
                          </p>
                        </div>
                      </div>                       
                    </Slider>


                 
                  </Content>
                </div>
              </Aside>
            </Col>

            <Col xxl={12} xl={12} lg={12} md={16} xs={24}>
              <WraperContent />
            </Col>
          </>
        ) : (
          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <WraperContent />
          </Col>
        )}
      </Row>
    );
  };
};

export default AuthLayout;
