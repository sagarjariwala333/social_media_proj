import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, TimePicker, Input, Spin, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
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
} from '../../../redux/systemsetting/shift/actionCreator';

const Shift = (props) => {
  const {handleRoute}=props;
  handleRoute("shift");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { shift, isLoading } = useSelector((state) => {
    return {
      shift: state.shift.data,
      isLoading: state.shift.loading,
    };
  });

  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    shifttoUpdate: {},
  });

  const { selectedRowKeys } = state;

  const { shifttoUpdate } = state;

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
    dispatch(axiosDataSearch(e.target.value, shift));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      shifttoUpdate: data,
    });
  };

  if (shift.length)
    shift.map((item, key) => {
      const { id, name, starttime, endtime, status } = item;
      return dataSource.push({
        key: key + 1,
        name,
        starttime,
        endtime,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(shift, id)} to="#">
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
      title: t('shift'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('starttime'),
      dataIndex: 'starttime',
      key: 'starttime',
    },
    {
      title: t('endtime'),
      dataIndex: 'endtime',
      key: 'endtime',
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
    shift.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...shift,
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
    const updateshift = shift;

    updateshift.map((user) => {
      if (user.id === shifttoUpdate.id) {
        const shift = user;
        shift.id = shifttoUpdate.id;
        shift.name = values.name;
        shift.appliedtosafeact = values.appliedtosafeact;
        shift.appliedtounsafeact = values.appliedtounsafeact;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updateshift));
    form.resetFields();
  };
  const format = 'HH:mm';
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
        title={t('shift')}
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
        <Modal type={state.modalType} title={t('shift')} visible={state.visible} footer={null} onCancel={handleCancel}>
        <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contactEdit" onFinish={handleOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={shifttoUpdate.name}
                          label="Shift Name"
                          name="name"
                          rules={[{ required: true, message: 'Shift Name required!' }]}
                        >
                          <Input placeholder="Enter shift name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('starttime')}
                          name="starttime"
                          rules={[{ required: true, message: 'Start Time required!' }]}
                        >
                          <TimePicker defaultValue={moment('12:08', format)} format={format} />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('endtime')}
                          name="endtime"
                          rules={[{ required: true, message: 'End Time required!' }]}
                        >
                          <TimePicker defaultValue={moment('12:08', format)} format={format} />
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
          title={t('shift')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="contactEdit" onFinish={handleEditOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          initialValue={shifttoUpdate.name}
                          label="Shift Name"
                          name="name"
                          rules={[{ required: true, message: 'Shift Name required!' }]}
                        >
                          <Input placeholder="Enter shift name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('starttime')}
                          name="starttime"
                          rules={[{ required: true, message: 'Start Time required!' }]}
                        >
                          <TimePicker defaultValue={moment('12:08', format)} format={format} />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('endtime')}
                          name="endtime"
                          rules={[{ required: true, message: 'End Time required!' }]}
                        >
                          <TimePicker defaultValue={moment('12:08', format)} format={format} />
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

Shift.propTypes={
  handleRoute: propTypes.func
}
export default Shift;
