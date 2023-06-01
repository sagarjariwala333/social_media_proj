import React, { useState } from 'react';
import { Row, Col, Form, Input} from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RecordViewWrapper } from './Style';
import { BasicFormWrapper, Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';

function ProfilePage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    values: '',
  });
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  return (
    <RecordViewWrapper>
      <PageHeader
        className="scheduleheader padlefzero"
        ghost
        title="Profile"
      />
      <Main>
      <Cards headless>
      <Row justify="center">
      
        <Col xl={16} md={16} xs={24}>
          <div className="common addempform user-work-form">
            <BasicFormWrapper>
              <Form style={{ width: '100%' }} form={form} name="work" onFinish={handleSubmit}>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="memberid" label="Member Id">
                      <Input placeholder="Member Id" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="firstname" label={t('firstname')}>
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="lastname" label="Last Name">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="email" label="Email">
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="password" label="Password">
                      <Input placeholder="Password" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="phoneno" label="Phone No">
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="address" label="Address">
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="package" rules={[{ type: 'object', whitespace: true }]} label="Package">
                    <Input placeholder="Package" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="inviter" rules={[{ type: 'object', whitespace: true }]} label="Inviter">
                    <Input placeholder="Inviter" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item
                      label="Placement"
                      name="placement"
                      rules={[{ required: true, message: 'Placement required!' }]}
                    >
                     <Input placeholder="Placement" />
                    </Form.Item>
                  </Col>

                
                </Row>

                

                <Form.Item>
                  <div className="add-user-bottom text-right">
                    <Button
                      className="ant-btn ant-btn-light"
                      type="default"
                      onClick={() => {
                        return form.resetFields();
                      }}
                    >
                      Reset
                    </Button>
                    <Button htmlType="submit" type="primary">
                      <Link to="social">Next</Link>
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </div>
        </Col>
       
      </Row>
      </Cards>
      </Main>
    </RecordViewWrapper>
  );
}

export default ProfilePage;
