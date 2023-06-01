import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import { RecordViewWrapper, Action } from './Style';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Modal } from '../../../components/modals/antd-modals';
import { AddUser } from '../../pages/style';
import { Dropdown } from '../../../components/dropdown/dropdown';
import {
  axiosDataRead,
  axiosDataSearch,
  axiosDataDelete,
  axiosCrudGetData,
  axiosDataSubmit,
  axiosDataUpdate,
} from '../../../redux/team/actionCreator';

const Contractoremployee = (props) => {
  const {handleRoute} = props;
  handleRoute('contractoremployee');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contractoremployee, isLoading } = useSelector((state) => {
    return {
      contractoremployee: state.contractoremployee.data,
      isLoading: state.contractoremployee.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    contractoremployeetoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { contractoremployeetoUpdate } = state;
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

  const onHandleSearch = (e) => {
    dispatch(axiosDataSearch(e.target.value, contractoremployee));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      contractoremployeetoUpdate: data,
    });
  };

  if (contractoremployee.length)
    contractoremployee.map((item, key) => {
      const { id, firstname, lastname, agency, email, address, contactno } = item;
      return dataSource.push({
        key: key + 1,
        firstname,
        lastname,
        agency,
        email,
        address,
        contactno,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(contractoremployee, id)} to="#">
                    <span>Edit</span>
                  </Link>
                  <Link onClick={() => onHandleDelete(id)} to="#">
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
      title: t('firstname'),
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: t('lastname'),
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: t('agency'),
      dataIndex: 'agency',
      key: 'agency',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('contactno'),
      dataIndex: 'contactno',
      key: 'contactno',
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

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
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
    contractoremployee.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...contractoremployee,
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
    const updatecontractoremployee = contractoremployee;

    updatecontractoremployee.map((user) => {
      if (user.id === contractoremployeetoUpdate.id) {
        const contractoremployee = user;
        contractoremployee.id = contractoremployeetoUpdate.id;
        contractoremployee.name = values.name;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatecontractoremployee));
    form.resetFields();
  };

  return (
    <RecordViewWrapper>
      <PageHeader
        className="scheduleheader padlefzero"
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
          <div>
            <Button onClick={showModal} className="btn-add_new" size="default" key="1" type="primary">
              <Link to="#">
                <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
              </Link>
            </Button>
          </div>,
        ]}
        ghost
        title={t('contractoremployee')}
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
        <Modal
          type={state.modalType}
          title={t('contractoremployee')}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contractoremployee" onFinish={handleOk}>
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
          title={t('contractoremployee')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contractoremployee" onFinish={handleEditOk}>
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

Contractoremployee.propTypes={
  handleRoute:propTypes.func
}

export default Contractoremployee;
