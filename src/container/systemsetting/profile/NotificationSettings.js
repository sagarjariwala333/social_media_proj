import React, { useState } from 'react';
import { Row, Col, Form, Switch, Checkbox, Tooltip } from 'antd'; 
import { useTranslation } from 'react-i18next';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import Heading from '../../../components/heading/heading';

function ViewPage() {
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
      <PageHeader className="scheduleheader padlefzero" ghost title="Notification Settings" />
      <Main>
        <Cards headless>
          <Row justify="center">
            <Col xl={14} md={14} xs={24}>
              <div className="user-work-form  notificationsetting">
                <BasicFormWrapper>
                  <Form style={{ width: '100%' }} form={form} name="work" onFinish={handleSubmit}>
                    <div className="notificationallowbox greenback">
                      <Row gutter={25}>
                        <Col lg={24} xs={24}>
                          <Heading as="h1" className="mainheading">
                            {t('Enable notifications via')}
                          </Heading>
                        </Col>
                      </Row>
                      <Row gutter={25}>
                        <Col lg={24} xs={24}>
                          <Heading>Type of notifications that you can receive</Heading>
                        </Col>
                      </Row>
                      <Row gutter={25}>
                        <Col lg={4} xs={4}>
                          <span>Push</span>
                          <br />
                          <Switch defaultChecked />
                        </Col>

                        <Col lg={4} xs={4}>
                          <span>Email</span>
                          <br />
                          <Switch defaultChecked />
                        </Col>

                        <Col lg={4} xs={4}>
                          <span>SMS</span>
                          <br />
                          <Switch defaultChecked />
                        </Col>
                      </Row>
                    </div>

                    <div className="notificationallowbox">
                      <Row gutter={25}>
                        <Col lg={24} xs={24}>
                          <Heading as="h1" className="mainheading">
                            Task
                          </Heading>
                        </Col>
                      </Row>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Task assigned
                            <Tooltip title={t('taskassignednotificationtooltip')} className='tolltipbox'>
                            <FeatherIcon icon="alert-circle"/>                              
                              {/* <FontAwesome
                                name="exclamation-circle"
                                className="super-crazy-colors"
                                size="1x"
                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                              /> */}
                            </Tooltip>
                            </Heading>
                           
                          </Col>
                        </Row>
                        <Row gutter={25}>
                          <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Task Completed</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                          <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Task Comments and media added</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>
                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Task reminders due soon</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>
                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Task reminders overdue </Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="notificationallowbox">
                      <Row gutter={25}>
                        <Col lg={24} xs={24}>
                          <Heading as="h1" className="mainheading">
                            Schedules
                          </Heading>
                        </Col>
                      </Row>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Scheduled reminder</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Scheduled due soon</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">Scheduled overdue</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="notificationallowbox">
                      <Row gutter={25}>
                        <Col lg={24} xs={24}>
                          <Heading as="h1" className="mainheading">
                            Safety Observation
                          </Heading>
                        </Col>
                      </Row>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">On new Observation submit by me</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">On new Observation submit by my team</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>

                      <div className="subbox">
                        <Row gutter={25}>
                          <Col lg={24} xs={24}>
                            <Heading as="h6">On new issue assigned</Heading>
                          </Col>
                        </Row>
                        <Row gutter={25}>
                        <Col lg={4} xs={4}>
                            <span>Push </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>Email </span>

                            <Checkbox defaultChecked />
                          </Col>

                          <Col lg={4} xs={4}>
                            <span>SMS </span>

                            <Checkbox defaultChecked />
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <Form.Item>
                      <div className="add-user-bottom ">
                        <Button
                          className="ant-btn ant-btn-light"
                          type="default"
                          onClick={() => {
                            return form.resetFields();
                          }}
                        >
                          Submit
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

export default ViewPage;
