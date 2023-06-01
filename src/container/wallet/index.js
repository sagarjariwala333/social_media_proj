import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import { RecordViewWrapper, Action } from './Style';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Modal } from '../../components/modals/antd-modals';
import { AddUser } from '../pages/style';
import { Dropdown } from '../../components/dropdown/dropdown';
import {
  axiosDataRead,
  axiosDataDelete,
  axiosCrudGetData,
  axiosDataSubmit,
  axiosDataUpdate,
} from '../../redux/wallet/actionCreator';
import Heading from '../../components/heading/heading';

const Wallet = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { team, isLoading } = useSelector((state) => {
    return {
      team: state.wallet.data,
      isLoading: state.wallet.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    teamtoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { teamtoUpdate } = state;

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);

  const dataSource = [];

  const onHandleDelete = (id) => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        axiosDataDelete({
          id,
          getData: () => {
            dispatch(axiosCrudGetData());
          },
        }),
      );
    }
    return false;
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      teamtoUpdate: data,
    });
  };

  if (team.length)
    team.map((item, key) => {
      const { teamid, amount, type, date, status } = item;
      return dataSource.push({
        key: key + 1,
        teamid,
        amount,
        type,
        date,
        status,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(team, teamid)} to="#">
                    <span>Edit</span>
                  </Link>
                  <Link onClick={() => onHandleDelete(teamid)} to="#">
                    <span>Delete</span>
                  </Link>
                </>
              }
              action={['click']}
            >
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="more-vertical" size={16} />
              </Button>
            </Dropdown>
          </Action>
        ),
      });
    });

  const columns = [
    {
      title: 'Team Id',
      dataIndex: 'teamid',
      key: 'teamid',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('actions'),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  const onSelectChange = (selectedRowKey) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const data = [
  //   { label: 'One', value: '1' },
  //   { label: 'Two', value: '2' },
  //   { label: 'Three', value: '3' },
  //   { label: 'Four', value: '4' },
  //   { label: 'Five', value: '5' },
  // ];
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
    team.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...team,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
        },
      ]),
    );
    form.resetFields();
  };

  const handleEditOk = (values) => {
    onCancel();
    const updateteam = team;

    updateteam.map((user) => {
      if (user.id === teamtoUpdate.id) {
        const team = user;
        team.id = teamtoUpdate.id;
        team.name = values.name;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updateteam));
    form.resetFields();
  };

  return (
    <RecordViewWrapper>
      <PageHeader
        className="scheduleheader padlefzero"
        buttons={[
          <div key={1}>
            <p className="subtitle">Total Teams</p>
            <Heading as="h1">123</Heading>
          </div>,

          <div key={1} style={{ paddingLeft: '10px' }}>
            <p className="subtitle">Total Teams</p>
            <Heading as="h1">123</Heading>
          </div>,

          <div key={1} style={{ paddingLeft: '10px' }}>
            <p className="subtitle">Total Teams</p>
            <Heading as="h1">123</Heading>
          </div>,
        ]}
        ghost
        title={[
          <div key={1}>
            <Heading as="h1">
              Wallet
            </Heading>
          </div>,
          <div key={1}>
            <Dropdown
              content={
                <>
                  <Link to="#">
                    <span>Deposit</span>
                  </Link>
                  <Link to="#">
                    <span>Refund</span>
                  </Link>
                 
                </>
              }
            >
              <Input placeholder="Select Type" value="Select Type" />
            </Dropdown>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
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
            </Cards>
          </Col>
        </Row>
        <Modal type={state.modalType} title={t('team')} visible={state.visible} footer={null} onCancel={handleCancel}>
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="team" onFinish={handleOk}>
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
          title={t('team')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="team" onFinish={handleEditOk}>
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

export default Wallet;
