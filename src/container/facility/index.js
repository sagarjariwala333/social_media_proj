import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper, Action } from './Style';
import { Main, BasicFormWrapper, FormValidationWrap } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { AddUser } from '../pages/style';
import { Dropdown } from '../../components/dropdown/dropdown';
import { axiosDataRead, axiosDataDelete, axiosCrudGetData, axiosDataSubmit } from '../../redux/facility/actionCreator';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';

const ViewPage = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { facility } = useSelector((state) => {
    return {
      facility: state.facility.data,
      isLoading: state.facility.loading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    facilitytoUpdate: {},
  });
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
      facilitytoUpdate: data,
    });
  };

  if (facility.length)
    facility.map((obstype, key) => {
      const { id, name, unitname, status } = obstype;
      return dataSource.push({
        key: key + 1,
        name,
        unitname,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(facility, id)} to="#">
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

  const handleOk = (values) => {
    onCancel();
    const arrayData = [];
    facility.map((data) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...facility,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
        },
      ]),
    );
    form.resetFields();
  };

  return (
    <RecordViewWrapper className='bodycontainer'>
      <PageHeader ghost title="Site Layout" />
      <Main className='mainContainer'>
        <AddUser>
          <FormValidationWrap>
            <BasicFormWrapper>
              <div className="common">
                <Cards headless>
                  <Form form={form} name="name" onFinish={handleOk}>
                    <Row gutter={25}>
                      <Col lg={8} xs={8}>
                        <Form.Item label="Site" name="l1" rules={[{ required: true, message: 'Site required!' }]}>
                          <Select
                            showSearch
                            placeholder="Site"
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
                      <Col lg={8} xs={8} className="checkdivbox">
                        <Form.Item name="allsites">
                          <Checkbox>Apply to all Sites</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={25}>
                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 1" name="l1" rules={[{ required: true, message: 'Level required!' }]}>
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>

                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 2" name="l2">
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>

                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 3" name="l3">
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={25}>
                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 4" name="l4">
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>

                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 5" name="l5">
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>

                      <Col lg={8} xs={8}>
                        <Form.Item label="Level 6" name="l6">
                          <Input placeholder="Enter level" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <div className="buttonareabox">
                      <Button htmlType="submit" size="default" type="primary" key="submit">
                        Cancel
                      </Button>
                      <Button htmlType="submit" size="default" type="primary" key="submit">
                        Save
                      </Button>
                    </div>
                  </Form>
                </Cards>
              </div>
            </BasicFormWrapper>
          </FormValidationWrap>
        </AddUser>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
