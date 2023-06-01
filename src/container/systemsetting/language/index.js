import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Table, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Action,RecordViewWrapper } from './Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { AddUser } from '../../pages/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';
import {
  axiosDataRead,
  axiosDataSearch,
  axiosDataSubmit
} from '../../../redux/systemsetting/language/actionCreator';

const ViewPage = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { language, isLoading } = useSelector(state => {
    return {
      language: state.language.data,
      isLoading: state.language.loading,
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
      languagetoUpdate: data,
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
    language.map(data => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...language,
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
    dispatch(axiosDataSearch(e.target.value, language));
  };



  if (language.length)
  language.map((obstype, key) => {
      const {  id, language, languageculture, languagecode, published } = obstype;
      return dataSource.push({
        key: key + 1,
        language, 
        languageculture, 
        languagecode, 
        published,
        action: (
          <Action className="table-actions">
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => showEditModal(language, id)} to="#">
                    <span>Edit</span>
                  </Link>
                   
                  <Link to=
                  {{
                    pathname: "/admin/stringsource/",
                    state: {id}
                  }}
                  >
                  
                    <span>View String Resources</span>
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
      title: 'Language',
      dataIndex: 'language', 
      key: 'language',
    },
    {
      title: 'Language Culture',
      dataIndex: 'languageculture',
      key: 'languageculture',
    },
    {
      title: 'Language Code',
      dataIndex: 'languagecode',
      key: 'languagecode',
    },
    {
      title: 'Published',
      dataIndex: 'published',
      key: 'published',
    },
    {
      title: 'Actions',
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

  console.log("language data received..");
      console.log(language);
      console.log(isLoading);

  return (
    <RecordViewWrapper>
      <PageHeader
        ghost
        title="language"

        subTitle={
          <div>
            <Button onClick={showModal} className="btn-add_new" size="default" key="1" type="primary">
              <Link to="#">
                <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
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

              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                &nbsp;

                

              </div>
            </Cards>
          </Col>
        </Row>
      </Main>


      <Modal
          type={state.modalType}
          title="language"
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
              <BasicFormWrapper>
                
              <Form form={form} name="name" onFinish={handleOk}>

              <Form.Item label="Language" name="language" rules={[{ required: true, message: 'Language required' }]}>
                <Input placeholder="Enter language name" />
              </Form.Item>

              <Form.Item label="Language Culture" name="name" rules={[{ required: true, message: 'Language culture required!' }]}>
                    <Input placeholder="Enter culture" />
              </Form.Item>

              <Form.Item label="Language Code" name="name" rules={[{ required: true, message: 'Language code required!' }]}>
                <Input placeholder="Enter language code" />
              </Form.Item>

              <Form.Item label="Published" name="name" rules={[{ required: true, message: 'Published required!' }]}>
                <Input placeholder="Enter published" />
              </Form.Item>

              <Button htmlType="submit" size="default" type="primary" key="submit">
                Save
              </Button>

              </Form>
              </BasicFormWrapper>
              </FormValidationWrap>
            </AddUser>
          </div>
        </Modal>


        <Modal
          type={state.modalType}
          title="language"
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
            <FormValidationWrap>
              <BasicFormWrapper>

              <Form form={form} name="name" onFinish={handleOk}>

              <Form.Item label="Language" name="name" rules={[{ required: true, message: 'Port no required!' }]}>
                <Input placeholder="Enter language name" />
              </Form.Item>

              <Form.Item label="Language Culture" name="name" rules={[{ required: true, message: 'Port no required!' }]}>
                    <Input placeholder="Enter language culture" />
              </Form.Item>

              <Form.Item label="Language Code" name="name" rules={[{ required: true, message: 'Port no required!' }]}>
                <Input placeholder="Enter language code" />
              </Form.Item>

              <Form.Item label="Published" name="name" rules={[{ required: true, message: 'Port no required!' }]}>
                <Input placeholder="Enter published" />
              </Form.Item>

              <Button htmlType="submit" size="default" type="primary" key="submit">
                Save
              </Button>

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
