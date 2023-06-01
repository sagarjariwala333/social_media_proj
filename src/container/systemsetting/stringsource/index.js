import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Table, Form, Input } from 'antd';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, TableWrapper, BasicFormWrapper, FormValidationWrap } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { AddUser } from '../../pages/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import {
  axiosDataRead,
  axiosDataUpdate,
  axiosDataDelete,
  axiosCrudGetData,
  axiosDataSearch,
  axiosDataSubmit
} from '../../../redux/systemsetting/stringsource/actionCreator';


const ViewPage = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { stringsource, isLoading } = useSelector(state => {
    return {
      stringsource: state.stringsource.data,
      isLoading: state.stringsource.loading,
    };
  });


  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    isEdit: false,
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



  const showEditable = (data,id) => {
    stringsource.map((item)=>{
      if(item.id === id){
        item.isEdit = true;
      };
      return item;
    });
    setState({
      ...state,
      stringsource
    });
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

  const onHandleCancel = (data,id) => {
    stringsource.map((item)=>{
      if(item.id === id)
      {
        item.isEdit=false;
      }
      return item;
    });
    setState({
      ...state,
      stringsource
    });
  }

  const onSaveHandle = (data,id) => {

    stringsource.map((item)=>{
      if(item.id === id){
        item.isEdit = false;
      };
      return item;
    });
    setState({
      ...state,
      stringsource
    });

    dispatch(axiosDataUpdate(data));
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

  const onChange = (value, item, prop) => {
    stringsource.map((x)=>{
      if(item.id === x.id){
        item[prop] = value;
      };
      return item;
    });
    setState({
      ...state,
      stringsource
    });
  }

  const handleOk = values => {
    onCancel();
    const arrayData = [];
    stringsource.map(data => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      axiosDataSubmit([
        ...stringsource,
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
    dispatch(axiosDataSearch(e.target.value, stringsource));
  };


  


  if (stringsource.length)
  stringsource.map((item, key) => {
      const {  id, language, value, isEdit, resource } = item;
      return dataSource.push({
        key: key + 1,
        language,
        resource:(
          <div> 
            {
              (!isEdit) ?
              (
                <h3>{resource}</h3>
              ):
              (
                <Input placeholder={ resource } value={resource} onChange={ (e) => onChange(e.target.value,item,"resource") }/>
              )
            }
          </div>
        ),
        value:(
          <div> 
            {
              (!isEdit) ?
              (
                <h3>{value}</h3>
              ):
              (
                <Input placeholder="Enter value" value={ value } onChange={ (e) => onChange(e.target.value,item,"value") }  />
              )
            }
          </div>
        ), 
        action: (
          <div>
            
           <Button onClick={() => showEditable(item,id)} htmlType="submit" size="default" type="primary" key="submit">
                Edit
           </Button>

           <Button onClick={() => onSaveHandle(item,id)} htmlType="submit" size="default" type="primary" key="submit">
                Save
           </Button>

           {
            (!isEdit) ? 
            (
              <Button onClick={() => onHandleDelete(item,id)} htmlType="submit" size="default" type="primary" key="submit">
                Delete
              </Button>
            ) :
            (
              <Button onClick={() => onHandleCancel(item,id)} htmlType="submit" size="default" type="primary" key="submit">
                Cancel
              </Button>
            )

            }
          
          </div>
        )

      });
    });

 

  const columns = [
    {
      title: t('language'),
      dataIndex: 'language', 
      key: 'language',
    },
    {
      title: t('resources'),
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: t('values'),
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: t('actions'),
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    }
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

  let languageid = 0;

  const getidFromState = () => {
    const location = useLocation();
    return (location.state.id === undefined && location.state.id === null) ? 0 : location.state.id;
  }

  const getLanguageid = () => {
    languageid = (languageid === 0) ? getidFromState : languageid;
    return languageid;
  }

  languageid = getLanguageid;
  console.log("Language id = ");
  console.log(languageid);

 /*  console.log("stringsource data received..");
      console.log(stringsource);
      console.log(isLoading);

      const location = useLocation();
      console.log(location.state.id); */

  return (
    <RecordViewWrapper>
      <PageHeader
        ghost
        title={t('viewresources')}

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
          title="stringsource"
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <FormValidationWrap>
              <BasicFormWrapper>
                
              <Form form={form} name="name" onFinish={handleOk}>

              <Form.Item label={t("language")} name="language" rules={[{ required: true, message: 'Language required' }]}>
                <Input placeholder="Enter language name" />
              </Form.Item>

              <Form.Item label={t("resources")} name="name" rules={[{ required: true, message: 'Language resource required!' }]}>
                    <Input placeholder="Enter language name" />
              </Form.Item>

              <Form.Item label={t("values")} name="name" rules={[{ required: true, message: 'Value required!' }]}>
                <Input placeholder="Enter language name" />
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
          title={t("stringsources")}
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
            <FormValidationWrap>
              <BasicFormWrapper>

              <Form form={form} name="name" onFinish={handleOk}>

              <Form.Item label={t("language")} name="language" rules={[{ required: true, message: 'Language required' }]}>
                
                <Input placeholder="Enter language name" />
              
              </Form.Item>

              <Form.Item label={t("resources")} name="name" rules={[{ required: true, message: 'Language resource required!' }]}>
                    <Input placeholder="Enter language name" />
              </Form.Item>

              <Form.Item label={t("values")} name="name" rules={[{ required: true, message: 'Value required!' }]}>
                <Input placeholder="Enter language name" />
              </Form.Item>

              <Button htmlType="submit" size="default" type="primary" key="submit">
                {t("save")}
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
