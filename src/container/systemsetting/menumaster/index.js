import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Table, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import { Action, RecordViewWrapper } from './Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { AddUser } from '../../pages/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';

import {
  axiosDataRead,
  axiosDataDelete,
  axiosCrudGetData,
  axiosDataSearch,
  axiosDataSubmit,
} from '../../../redux/systemsetting/menumaster/actionCreator';

const ViewPage = () => {
  const { t } = useTranslation();
  const { Option } = Select;

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { menumaster, isLoading } = useSelector((state) => {
    return {
      menumaster: state.menumaster.data,
      isLoading: state.menumaster.loading,
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    shifttoUpdate: {},
  });

  const { selectedRowKeys } = state;

  const dataSource = [];

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      menumastertoUpdate: data,
    });
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
    menumaster.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...menumaster,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
        },
      ]),
    );
    form.resetFields();
  };

  const onHandleSearch = (e) => {
    dispatch(axiosDataSearch(e.target.value, menumaster));
  };

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

  if (menumaster.length)
    menumaster.map((item, key) => {
      const { id, name, icon, path, parent } = item;
      return dataSource.push({
        key: key + 1,
        name,
        icon,
        path,
        parent,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(menumaster, id)} to="#">
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
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('icon'),
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: t('path'),
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: t('parent'),
      dataIndex: 'parent',
      key: 'parent',
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

  console.log('menumaster data received..');
  console.log(menumaster);
  console.log(isLoading);

  return (
    <RecordViewWrapper>
      <PageHeader
        ghost
        title={t('menu')}
        subTitle={
          <div>
            <Button onClick={showModal} className="btn-add_new" size="default" key="1" type="primary">
              <Link to="#">
                <FeatherIcon icon="plus" size={14} /> <span>{t('addnew')}</span>
              </Link>
            </Button>
          </div>
        }
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
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

              <div style={{ minHeight: 'calc(100vh - 320px)' }}>&nbsp;</div>
            </Cards>
          </Col>
        </Row>
      </Main>

      <Modal
        type={state.modalType}
        title={t('menumaster')}
        visible={state.visible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <AddUser>
            <FormValidationWrap>
              <BasicFormWrapper>
                <Form form={form} name="name" onFinish={handleOk}>
                  <Form.Item label={t('name')} name="name" rules={[{ required: true, message: 'Name required' }]}>
                    <Input placeholder="Enter name" />
                  </Form.Item>

                  <Form.Item
                    label={t('iconculture')}
                    name="name"
                    rules={[{ required: true, message: 'Icon required!' }]}
                  >
                    <Input placeholder="Enter icon" />
                  </Form.Item>

                  <Form.Item label={t('path')} name="path" rules={[{ required: true, message: 'Path required!' }]}>
                    <Input placeholder="Enter path" />
                  </Form.Item>

                  <Form.Item
                    label={t('parent')}
                    name="parent"
                    rules={[{ required: true, message: 'Parent required!' }]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Parent"
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
        title="menumaster"
        visible={state.editVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <AddUser>
            <FormValidationWrap>
              <BasicFormWrapper>
                <Form form={form} name="name" onFinish={handleOk}>
                  <Form.Item label={t('name')} name="name" rules={[{ required: true, message: 'Name required' }]}>
                    <Input placeholder="Enter name" />
                  </Form.Item>

                  <Form.Item
                    label={t('iconculture')}
                    name="name"
                    rules={[{ required: true, message: 'Icon required!' }]}
                  >
                    <Input placeholder="Enter icon" />
                  </Form.Item>

                  <Form.Item label={t('path')} name="path" rules={[{ required: true, message: 'Path required!' }]}>
                    <Input placeholder="Enter path" />
                  </Form.Item>

                  <Form.Item
                    label={t('parent')}
                    name="parent"
                    rules={[{ required: true, message: 'Parent required!' }]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Parent"
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

                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    {t('save')}
                  </Button>
                </Form>
              </BasicFormWrapper>
            </FormValidationWrap>
          </AddUser>
        </div>
      </Modal>
    </RecordViewWrapper>
  );
};

export default ViewPage;
