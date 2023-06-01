import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Form, Select, Input, Spin, Switch } from 'antd';
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
} from '../../../redux/systemsetting/department/actionCreator';

const { Option } = Select;
const Department = (props) => {
  const {handleRoute}=props;
  handleRoute('department');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { department, isLoading } = useSelector((state) => {
    return {
      department: state.department.data,
      isLoading: state.department.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    departmenttoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { departmenttoUpdate } = state;
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
    dispatch(axiosDataSearch(e.target.value, department));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      departmenttoUpdate: data,
    });
  };

  if (department.length)
    department.map((item, key) => {
      const { id, name, departmenthead, status } = item;
      return dataSource.push({
        key: key + 1,
        name,
        departmenthead,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(department, id)} to="#">
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
      title: t('department'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('departmenthead'),
      dataIndex: 'departmenthead',
      key: 'departmenthead',
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
    department.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...department,
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
    const updatedepartment = department;

    updatedepartment.map((user) => {
      if (user.id === departmenttoUpdate.id) {
        const department = user;
        department.id = departmenttoUpdate.id;
        department.name = values.name;
        department.appliedtosafeact = values.appliedtosafeact;
        department.appliedtounsafeact = values.appliedtounsafeact;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatedepartment));
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
        title={t('department')}
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
          title={t('department')}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="name" onFinish={handleOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('departmentname')}
                          name="name"
                          rules={[{ required: true, message: 'Department required!' }]}
                        >
                          <Input placeholder="Enter department name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('departmenthead')}
                          name="departmenthead"
                          rules={[{ required: true, message: 'Department head required!' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Department head for"
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
        title="Site" 
        visible={state.editVisible} 
        footer={null} 
        onCancel={handleCancel}>
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="name" onFinish={handleEditOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('departmentname')}
                          name="name"
                          rules={[{ required: true, message: 'Department required!' }]}
                        >
                          <Input placeholder="Enter department name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('departmenthead')}
                          name="departmenthead"
                          rules={[{ required: true, message: 'Department head required!' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Department head for"
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
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Switch defaultChecked>Active</Switch>
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

Department.propTypes={
  handleRoute:propTypes.func
}

export default Department;
