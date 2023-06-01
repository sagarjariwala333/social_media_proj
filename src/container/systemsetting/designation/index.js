import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Input, Spin, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
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
} from '../../../redux/systemsetting/designation/actionCreator';

const Designation = (props) => {
  const {handleRoute}=props;
  handleRoute('designation');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { designation, isLoading } = useSelector((state) => {
    return {
      designation: state.designation.data,
      isLoading: state.designation.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    designationtoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { designationtoUpdate } = state;
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
    dispatch(axiosDataSearch(e.target.value, designation));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      designationtoUpdate: data,
    });
  };

  if (designation.length)
    designation.map((item, key) => {
      const { id, name, status } = item;
      return dataSource.push({
        key: key + 1,
        name,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(designation, id)} to="#">
                    <span>{t('edit')}</span>
                  </Link>
                  <Link onClick={() => onHandleDelete(id)} to="#">
                    <span>{t('delete')}</span>
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
      title: t('designation'),
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
    designation.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...designation,
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
    const updatedesignation = designation;

    updatedesignation.map((user) => {
      if (user.id === designationtoUpdate.id) {
        const designation = user;
        designation.id = designationtoUpdate.id;
        designation.name = values.name;
        designation.appliedtosafeact = values.appliedtosafeact;
        designation.appliedtounsafeact = values.appliedtounsafeact;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatedesignation));
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
        title={t('designation')}
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
          title={t('designation')}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="designation" onFinish={handleOk}>
                    <Form.Item
                      label="Designation Name"
                      name="name"
                      rules={[{ required: true, message: 'Designation required!' }]}
                    >
                      <Input placeholder="Enter designation name" />
                    </Form.Item>
                    <Col>
                      <span>Status</span>
                      <Switch defaultChecked />
                    </Col>
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
          title={t('designation')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contactEdit" onFinish={handleEditOk}>
                    <Form.Item
                      initialValue={designationtoUpdate.name}
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: 'Designation required!' }]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>

                    <Col>
                      <span>Status</span>
                      <Switch defaultChecked />
                    </Col>

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

Designation.propTypes={
  handleRoute:propTypes.func
}

export default Designation;
