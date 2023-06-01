import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Select, Form, Input, Spin, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useGeolocated } from 'react-geolocated';
import { RecordViewWrapper, Action } from './Style';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
/* import { Checkbox } from '../../../components/checkbox/checkbox'; */
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
} from '../../../redux/systemsetting/site/actionCreator';

const Site = (props) => {
  const { handleRoute } = props;
  handleRoute('site');
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const { Option } = Select;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { site, isLoading } = useSelector((state) => {
    return {
      site: state.site.data,
      isLoading: state.site.loading,
    };
  });

  let lat;
  let log;

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    sitetoUpdate: {},
  });
  const { selectedRowKeys } = state;
  const { sitetoUpdate } = state;
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
    dispatch(axiosDataSearch(e.target.value, site));
  };

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      sitetoUpdate: data,
    });
  };

  if (site.length)
    site.map((item, key) => {
      const { id, name, country, state, city, postcode, status } = item;
      return dataSource.push({
        key: key + 1,
        name,
        country,
        state,
        city,
        postcode,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(site, id)} to="#">
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
      title: t('site'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: t('state'),
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: t('city'),
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: t('postalcode'),
      dataIndex: 'postcode',
      key: 'postcode',
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
    site.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...site,
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
    const updatesite = site;

    updatesite.map((user) => {
      if (user.id === sitetoUpdate.id) {
        const site = user;
        site.id = sitetoUpdate.id;
        site.name = values.name;
        site.appliedtosafeact = values.appliedtosafeact;
        site.appliedtounsafeact = values.appliedtounsafeact;
      }
      return true;
    });
    dispatch(axiosDataUpdate(updatesite));
    form.resetFields();
  };

  function handleGeolocation() {
    console.log(coords.latitude + coords.longitude);
  }

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
          <div>
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="sitematrix">
              <span>Site Matrix</span>
            </Link>
          </Button>
        </div>,
        ]}
        ghost
        title="Site"
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


                  <div className='matrixtable'>
                      <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="wd150">title</th>
                                <th className="wd45"><div className="titlebox">Florida bmnbmbmn<span>US, North America</span></div></th>
                                <th  className="wd45"><div className="titlebox">Florida <span>US, North America</span></div></th>
                                <th  className="wd45"><div className="titlebox">Florida <span>US, North America</span></div></th>
                                <th  className="wd45"><div className="titlebox">Florida <span>US, North America</span></div></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                <td className="wd150">Pavan Maruti<span>pavanmaruti27@gmail.com</span></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                            </tr>
                            <tr>
                                <td className="wd150">Sujan Valand <span>sujanvaland@gmail.com</span></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                                <td  className="wd45"><input type="checkbox"/></td>
                            </tr>   
                          </tbody>         
                        </table>
                  </div>
            </Cards>
          </Col>
        </Row>
        <Modal
          type={state.modalType}
          title={t('site')}
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
                          label={t('sitename')}
                          name="name"
                          rules={[{ required: true, message: 'Site Name required!' }]}
                        >
                          <Input placeholder="Enter site name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          name="appliedfor"
                          label={t('appliedto')}
                          rules={[{ required: true, message: 'Applied for required!' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select applied for"
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
                        <Form.Item
                          name="country"
                          label={t('country')}
                          rules={[{ required: true, message: 'Country for required!' }]}
                        >
                          <Select
                            showSearch
                            placeholder={t('country')}
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
                        <Form.Item
                          label={t('state')}
                          name="state"
                          rules={[{ required: true, message: 'State is required!' }]}
                        >
                          <Input placeholder="Enter state" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('city')}
                          name="city"
                          rules={[{ required: true, message: 'City is required!' }]}
                        >
                          <Input placeholder="Enter city" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('postalcode')}
                          name="postcode"
                          rules={[{ required: true, message: 'POstal Code is required!' }]}
                        >
                          <Input placeholder="Enter Postal Code" />
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item label={t('addr1')} name="addressline_1">
                          <Input.TextArea placeholder="Address Line 1" />
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item label={t('addr2')} name="addressline_2">
                          <Input.TextArea placeholder="Address Line 2" />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Form.Item label={t('latitude')} name="latitude">
                          <Input placeholder={t('latitude')} defaultValue={lat} />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Form.Item label={t('longitude')} name="longitude">
                          <Input placeholder={t('logitude')} defaultValue={log} />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={handleGeolocation} size="default" key="1" type="primary">
                          <Link to="#">
                            <FeatherIcon icon="map-pin" size={14} />
                          </Link>
                        </Button>
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
        <Modal
          type={state.modalType}
          title={t('site')}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
                <BasicFormWrapper>
                  <Form form={form} name="name" onFinish={handleEditOk}>
                    <Row gutter={10}>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('sitename')}
                          name="name"
                          rules={[{ required: true, message: 'Site Name required!' }]}
                        >
                          <Input placeholder="Enter site name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          name="appliedfor"
                          label={t('appliedto')}
                          rules={[{ required: true, message: 'Applied for required!' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select applied for"
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
                        <Form.Item
                          name="country"
                          label={t('country')}
                          rules={[{ required: true, message: 'Country for required!' }]}
                        >
                          <Select
                            showSearch
                            placeholder={t('country')}
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
                        <Form.Item
                          label={t('state')}
                          name="state"
                          rules={[{ required: true, message: 'State is required!' }]}
                        >
                          <Input placeholder="Enter state" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('city')}
                          name="city"
                          rules={[{ required: true, message: 'City is required!' }]}
                        >
                          <Input placeholder="Enter city" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item
                          label={t('postalcode')}
                          name="postcode"
                          rules={[{ required: true, message: 'POstal Code is required!' }]}
                        >
                          <Input placeholder="Enter Postal Code" />
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item label={t('addr1')} name="addressline_1">
                          <Input.TextArea placeholder="Address Line 1" />
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Form.Item label={t('addr2')} name="addressline_2">
                          <Input.TextArea placeholder="Address Line 2" />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Form.Item label={t('latitude')} name="latitude">
                          <Input placeholder={t('latitude')} defaultValue={lat} />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Form.Item label={t('longitude')} name="longitude">
                          <Input placeholder={t('logitude')} defaultValue={log} />
                        </Form.Item>
                      </Col>

                      <Col lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={handleGeolocation} size="default" key="1" type="primary">
                          <Link to="#">
                            <FeatherIcon icon="map-pin" size={14} />
                          </Link>
                        </Button>
                      </Col>

                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Switch defaultChecked>Active</Switch>
                      </Col>
                    </Row>
                    <div className="modalButton">
                      <Button htmlType="submit" size="default" type="primary" key="submit">
                        {t('save')}
                      </Button>
                    </div>
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

Site.propTypes = {
  handleRoute: propTypes.func,
};

export default Site;
