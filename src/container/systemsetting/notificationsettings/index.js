import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Radio, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RecordViewWrapper } from './Style';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';

const dateFormat = 'MM/DD/YYYY';

function ViewPage() {
  const { t } = useTranslation();
  const { Option } = Select;
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
        title="General Info"
      />
      <Cards headless>
      <Row justify="center">
      
        <Col xl={10} md={16} xs={24}>
          <div className="user-work-form">
            <BasicFormWrapper>
              <Form style={{ width: '100%' }} form={form} name="work" onFinish={handleSubmit}>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="empcode" label={t('empcode')}>
                      <Input placeholder="Employee Code" />
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
                    <Form.Item name="middlename" label={t('middlename')}>
                      <Input placeholder="Middle Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="lastname" label={t('lastname')}>
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="email" label={t('email')}>
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="address" label={t('address')}>
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="contactno" label={t('contactno')}>
                      <Input placeholder="Contact No" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item name="dob" rules={[{ type: 'object', whitespace: true }]} label={t('dob')}>
                      <DatePicker format={dateFormat} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item name="doj" rules={[{ type: 'object', whitespace: true }]} label={t('doj')}>
                      <DatePicker format={dateFormat} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item
                      label={t('l1reportee')}
                      name="l1reportee"
                      rules={[{ required: true, message: 'Designation required!' }]}
                    >
                      <Select
                        showSearch
                        placeholder="L1 Reportee"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item
                      label={t('l2reportee')}
                      name="l2reportee"
                      rules={[{ required: true, message: 'Designation required!' }]}
                    >
                      <Select
                        showSearch
                        placeholder="L2 Reportee"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item
                      label={t('designation')}
                      name="designation"
                      rules={[{ required: true, message: 'Designation required!' }]}
                    >
                      <Select
                        showSearch
                        placeholder="Designation"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item
                      label={t('position')}
                      name="position"
                      rules={[{ required: true, message: 'Position required!' }]}
                    >
                      <Select
                        showSearch
                        placeholder="Position"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="status" initialValue="active" label="Status">
                  <Radio.Group>
                    <Radio value="active">Active</Radio>
                    <Radio value="deactivated">Deactivated</Radio>
                    <Radio value="blocked">Blocked</Radio>
                  </Radio.Group>
                </Form.Item>

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
    </RecordViewWrapper>
  );
}

export default ViewPage;
