import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import { Row, Col, Spin, Table, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import { Action,RecordViewWrapper } from './Style';
import groovyWalkAnimation from "../../../demoData/animation.json";
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
  axiosDataSubmit
} from '../../../redux/systemsetting/tenant/actionCreator';

const ViewPage = () => {

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { tenant, isLoading } = useSelector(state => {
    return {
      tenant: state.tenant.data,
      isLoading: state.tenant.loading,
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



  const showEditModal = data => {
    setState({
      ...state,
      editVisible: true,
      tenanttoUpdate: data,
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

  const handleOk = values => {
    onCancel();
    const arrayData = [];
    tenant.map(data => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...tenant,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime()
        },
      ]),
    );
    form.resetFields();
  };

  const onHandleSearch = e => {
    dispatch(axiosDataSearch(e.target.value, tenant));
  };


  const onHandleDelete = id => {
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


  if (tenant.length)
  tenant.map((item, key) => {
      const {  id, name, servertime, dbusername, dbpassword, portno, dbprefix } = item;
      return dataSource.push({
        key: key + 1,
        name,
        servertime,
        dbusername, 
        dbpassword, 
        portno, 
        dbprefix,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(tenant, id)} to="#">
                    <span>{t("edit")}</span>
                  </Link>
                  <Link onClick={() => onHandleDelete(id)} to="#">
                    <span>{t("delete")}</span>
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
        )

      });
    });


  const columns = [
    {
      title: t("tenantname"),
      dataIndex: 'name', 
      key: 'name',
    },
    {
      title: t("servername"),
      dataIndex: 'servertime',
      key: 'servertime',
    },
    {
      title: t("dbusername"),
      dataIndex: 'dbusername',
      key: 'dbusername',
    },
    {
      title: t("dbpassword"),
      dataIndex: 'dbpassword',
      key: 'dbpassword',
    },
    {
      title: t("dbportno"),
      dataIndex: 'portno',
      key: 'portno'
    },
    {
      title: t("dbprefix"),
      dataIndex: 'dbprefix',
      key: 'dbprefix'
    },
    {
      title: t("actions"),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const onSelectChange = selectedRowKey => {
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

  return (
    <RecordViewWrapper>
      <PageHeader
        ghost
        title={t("tenantname")}

        subTitle={
          <div>
            <Button onClick={showModal} className="btn-add_new" size="default" key="1" type="primary">
              <Link to="#">
                <FeatherIcon icon="plus" size={14} /> <span>{t("addnew")}</span>
              </Link>
            </Button>
          </div>
        }

        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder={t("searchhere")} />
          </div>,
        ]}
      />
      <Main>

      <Lottie
      animationData={groovyWalkAnimation} 
      />

        
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

              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                &nbsp;

                

              </div>
            </Cards>
          </Col>
        </Row>
      </Main>


      <Modal
          type={state.modalType}
          title={t("tenantname")}
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
              <BasicFormWrapper>
                
              <Form form={form} name="name" onFinish={handleOk}>

              <Row gutter={25}>
                <Col lg={12} xs={12}>
                  <Form.Item label={t("tenantname")} name="tenantname" rules={[{ required: true, message: 'Tenant Name required!' }]}>
                    <Input placeholder="Enter tenant name" />
                  </Form.Item>
                </Col>

                <Col lg={12} xs={12}>
                  <Form.Item label={t("servername")} name="servername" rules={[{ required: true, message: 'Server Name required!' }]}>
                    <Input placeholder="Enter tenant name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={25}>
                <Col lg={12} xs={12}>
                  <Form.Item label={t("username")} name="username" rules={[{ required: true, message: 'Username required!' }]}>
                      <Input placeholder="Enter Username" />
                  </Form.Item>
                </Col>

                <Col lg={12} xs={12}>
                <Form.Item label={t("password")} name="password" rules={[{ required: true, message: 'Password required!' }]}>
                      <Input placeholder="Enter Password" />
                </Form.Item>
                </Col>
              </Row>

              <Row gutter={25}>
                <Col lg={12} xs={12}>
                  <Form.Item label={t("portno")} name="portno" rules={[{ required: true, message: 'Port no required!' }]}>
                    <Input placeholder="Enter Porn no" />
                  </Form.Item>
                </Col>

                <Col lg={12} xs={12}>
                  <Form.Item label={t("prefix")} name="prefix" rules={[{ required: true, message: 'Prefix required!' }]}>
                    <Input placeholder="Enter Prefix" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={25}>
                <Col lg={24} xs={24}>
                  <Button htmlType="submit" size="default" type="primary" key="submit">
                    {t("submit")}
                  </Button>
                </Col>
              </Row>

              </Form>
              </BasicFormWrapper>
              </FormValidationWrap>
            </AddUser>
          </div>
        </Modal>


        <Modal
          type={state.modalType}
          title={t("tenantname")}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
            <FormValidationWrap>
              <BasicFormWrapper>

              <Form form={form} name="name" onFinish={handleOk}>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item label={t("tenantname")} name="tenantname" rules={[{ required: true, message: 'Tenant Name required!' }]}>
                      <Input placeholder="Enter tenant name" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item label={t("servername")} name="servername" rules={[{ required: true, message: 'Server Name required!' }]}>
                      <Input placeholder="Enter tenant name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item label={t("username")} name="username" rules={[{ required: true, message: 'Username required!' }]}>
                        <Input placeholder="Enter Username" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                  <Form.Item label={t("password")} name="password" rules={[{ required: true, message: 'Password required!' }]}>
                        <Input placeholder="Enter Password" />
                  </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={12} xs={12}>
                    <Form.Item label={t("portno")} name="portno" rules={[{ required: true, message: 'Port no required!' }]}>
                      <Input placeholder="Enter Porn no" />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={12}>
                    <Form.Item label={t("prefix")} name="prefix" rules={[{ required: true, message: 'Prefix required!' }]}>
                      <Input placeholder="Enter Prefix" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col lg={24} xs={24}>
                    <Button htmlType="submit" size="default" type="primary" key="submit">
                      {t("submit")}
                    </Button>
                  </Col>
                </Row>

              </Form>

              </BasicFormWrapper>
            </FormValidationWrap>

            </AddUser>
          </div>
        </Modal>
        

    </RecordViewWrapper>
  );
}

export default ViewPage;
