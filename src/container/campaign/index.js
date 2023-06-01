import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Spin, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Modal } from '../../components/modals/antd-modals';
import { AddUser } from '../pages/style';
import { axiosDataRead, axiosDataSubmit, axiosDataUpdate } from '../../redux/campaign/actionCreator';
import Heading from '../../components/heading/heading';

const Campaign = () => {
  const Option = Select;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { campaign, isLoading } = useSelector((state) => {
    return {
      campaign: state.campaign.data,
      isLoading: state.campaign.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    campaigntoUpdate: {},
    social_media: '',
  });
  const { selectedRowKeys } = state;
  const { campaigntoUpdate } = state;

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);

  const dataSource = [];

  if (campaign.length)
    campaign.map((item, key) => {
      const { campaignid, url, netcredits, status } = item;
      return dataSource.push({
        key: key + 1,
        campaignid,
        url,
        netcredits,
        status,
      });
    });

  const columns = [
    {
      title: 'Campaign Id',
      dataIndex: 'campaignid',
      key: 'campaignid',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Net Credits',
      dataIndex: 'netcredits',
      key: 'netcredits',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
    },
  ];
  const onSelectChange = (selectedRowKey) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = (values) => {
    onCancel();
    const arrayData = [];
    campaign.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...campaign,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
        },
      ]),
    );
    form.resetFields();
  };

  const onSocialMediaChange = (e) => {
    setState({
      ...state,
      social_media: e.toString().toLowerCase(),
    });
  };

  const handleSubmit = () => {};

  const handleEditOk = (values) => {
    onCancel();
    const updatecampaign = campaign;

    updatecampaign.map((user) => {
      if (user.id === campaigntoUpdate.id) {
        const campaign = user;
        campaign.id = campaigntoUpdate.id;
        campaign.name = values.name;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatecampaign));
    form.resetFields();
  };

  return (
    <RecordViewWrapper>
      <Main>
        <PageHeader
          className="scheduleheader padlefzero"
          buttons={[
            <div key={1} className="search-box">
              <p className="subtitle">Total Campaigns</p>
              <Heading as="h1">123</Heading>
            </div>,
          ]}
          ghost
          title={[
            <div key={1}>
              <Heading as="h1">Campaign</Heading>
            </div>,
          ]}
        />

        
          <Cards headless>
            <Row justify="center">
              <Col xl={16} md={16} xs={24}>
                <div className="common addempform user-work-form">
                  <BasicFormWrapper>
                    <Form style={{ width: '100%' }} form={form} name="work" onFinish={handleSubmit}>
                      <Row gutter={25}>
                        <Col lg={12} xs={12}>
                          <Form.Item name="empcode" label="Social Media">
                            <Select
                              showSearch
                              placeholder="Social Media"
                              optionFilterProp="children"
                              onChange={onSocialMediaChange}
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="youtube">YouTube</Option>
                              <Option value="facebook">FaceBook</Option>
                              <Option value="instagram">Instagram</Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col lg={12} xs={12}>
                          <Form.Item name="url" label="URL">
                            <Input placeholder="URL" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col lg={12} xs={12}>
                          <Form.Item name="likes" label="Like Credits">
                            <Input placeholder="Like Credits" />
                          </Form.Item>
                        </Col>

                        <Col lg={12} xs={12}>
                          <Form.Item name="shares" label="Share Credits">
                            <Input placeholder="Share Credits" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col lg={12} xs={12}>
                          <Form.Item name="comments" label="Comment Credits">
                            <Input placeholder="Comment Credits" />
                          </Form.Item>
                        </Col>

                       {(state.social_media==='youtube') &&
                        <Col lg={12} xs={12}>
                          <Form.Item name="subscribe" label="Subscribe Credits">
                            <Input placeholder="Subscribe Credits" />
                          </Form.Item>
                        </Col>}

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
                            <Link to="social">Submit</Link>
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  </BasicFormWrapper>
                </div>
              </Col>
            </Row>
          </Cards>
        

        <Cards headless>
          <Row gutter={15}>
            <Col className="w-100" md={24}>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{ pageSize: 10, showSizeChanger: true }}
                      dataSource={dataSource}
                      columns={columns}
                    />
                  </TableWrapper>
                </div>
              )}
            </Col>
          </Row>
        </Cards>
        <Modal
          type={state.modalType}
          title={t('campaign')}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="campaign" onFinish={handleOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('firstname')}
                          name="firstname"
                          rules={[{ required: true, message: 'First Name required!' }]}
                        >
                          <Input placeholder="Enter firstname" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('lastname')}
                          name="lastname"
                          rules={[{ required: true, message: 'Last Name required!' }]}
                        >
                          <Input placeholder="Enter email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('agency')}
                          name="agency"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('email')}
                          name="email"
                          rules={[{ required: true, message: 'Email required!' }]}
                        >
                          <Input placeholder="Enter Email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('address')}
                          name="email"
                          rules={[{ required: true, message: 'Address required!' }]}
                        >
                          <Input placeholder="Enter Address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('contactno')}
                          name="email"
                          rules={[{ required: true, message: 'Contact No required!' }]}
                        >
                          <Input placeholder="Enter Contact no" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Button htmlType="submit" size="default" type="primary" key="submit">
                      {t('save')}
                    </Button>
                  </Form>
                </BasicFormWrapper>
              </FormValidationWrap>
            </AddUser>
          </div>
        </Modal>
        <Modal
          type={state.modalType}
          title={t('campaign')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="campaign" onFinish={handleEditOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('firstname')}
                          name="firstname"
                          rules={[{ required: true, message: 'First Name required!' }]}
                        >
                          <Input placeholder="Enter firstname" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('lastname')}
                          name="lastname"
                          rules={[{ required: true, message: 'Last Name required!' }]}
                        >
                          <Input placeholder="Enter email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('agency')}
                          name="agency"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('email')}
                          name="email"
                          rules={[{ required: true, message: 'Email required!' }]}
                        >
                          <Input placeholder="Enter Email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('address')}
                          name="email"
                          rules={[{ required: true, message: 'Address required!' }]}
                        >
                          <Input placeholder="Enter Address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('contactno')}
                          name="email"
                          rules={[{ required: true, message: 'Contact No required!' }]}
                        >
                          <Input placeholder="Enter Contact no" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Button htmlType="submit" size="default" type="primary" key="submit">
                      {t('save')}
                    </Button>
                  </Form>
                </BasicFormWrapper>
              </FormValidationWrap>
            </AddUser>
          </div>
        </Modal>
      </Main>
    </RecordViewWrapper>
  );
};

export default Campaign;
