import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Spin, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
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
} from '../../../redux/systemsetting/contractoragency/actionCreator';

const Contractoragency = (props) => {
  const {handleRoute}=props;
  handleRoute('contractoragency');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contractoragency, isLoading } = useSelector((state) => {
    return {
      contractoragency: state.contractoragency.data,
      isLoading: state.contractoragency.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    contractoragencytoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { contractoragencytoUpdate } = state;
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
    dispatch(axiosDataSearch(e.target.value, contractoragency));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      contractoragencytoUpdate: data,
    });
  };

  if (contractoragency.length)
    contractoragency.map((item, key) => {
      const { id, name, email, address, contactno, status } = item;
      return dataSource.push({
        key: key + 1,
        name,
        email,
        address,
        contactno,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(contractoragency, id)} to="#">
                    <span>Edit</span>
                  </Link>
                  <Link onClick={() => onHandleDelete(id)} to="#">
                    <span>Delete</span>
                  </Link>
                  <Link to={`contractoremployee/${id}`}>
                    <span>Add Employee</span>
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
      title: t('contractoragency'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('address'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('contactno'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
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
    contractoragency.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...contractoragency,
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
    const updatecontractoragency = contractoragency;

    updatecontractoragency.map((user) => {
      if (user.id === contractoragencytoUpdate.id) {
        const contractoragency = user;
        contractoragency.id = contractoragencytoUpdate.id;
        contractoragency.name = values.name;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatecontractoragency));
    form.resetFields();
  };

  return (
    <RecordViewWrapper className='bodycontainer'>
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
        title={t('contractoragency')}
      />
      <Main className='mainContainer'>
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
          title={t('contractoragency')}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contractoragency" onFinish={handleOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('name')}
                          name="name"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('email')}
                          name="email"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('address')}
                          name="address"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('contactno')}
                          name="contactno"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter Contact no" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <span>Status</span>
                        <Switch defaultChecked />
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
          title={t('contractoragency')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contractoragency" onFinish={handleEditOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('name')}
                          name="name"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('email')}
                          name="email"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('address')}
                          name="address"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter address" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={contractoragencytoUpdate.name}
                          label={t('contactno')}
                          name="contactno"
                          rules={[{ required: true, message: 'Agency Name required!' }]}
                        >
                          <Input placeholder="Enter Contact no" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <span>Status</span>
                        <Switch defaultChecked />
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

Contractoragency.propTypes={
  handleRoute:propTypes.func
}

export default Contractoragency;
