import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  TimePicker,
  DatePicker,
  Typography,
  Upload,
  message,
  // Image,
  Collapse,
  // Card,
} from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import { RecordViewWrapper } from './Style';
import { Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { axiosDataRead } from '../../../redux/systemsetting/tenant/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';

// const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const timeFormat = 'HH:mm';
const dateFormat = 'DD/MM/YYYY';
const getOptions = (optionType) => {
  switch (optionType) {
    case 'Yes No List':
      return [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ];
    case 'Employee List':
      return [
        { value: 'Emp1', label: 'Emp1' },
        { value: 'Emp2', label: 'Emp2' },
        { value: 'Emp3', label: 'Emp3' },
      ];
    default:
      return [];
  }
};
const PreviewForm = ({ displayFormData }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    shifttoUpdate: {},
    formData: [...displayFormData],
    uploadLoading: false,
    imageUrl: '',
  });

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
      setState((prev) => prev);
    }
  }, [dispatch]);

  useEffect(() => {
    setState((prev) => ({ ...prev, formData: displayFormData }));
  }, [displayFormData]);

  const onChange = (e, indexes, keyValue = 'value') => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    const { name, value } = e.target;

    let newValue = value;
    const controlType = name.split('-')[0];
    console.log({ name, controlType });
    if (controlType === 'Time') {
      newValue = moment(value).format(timeFormat);
    } else if (controlType === 'DateTime') {
      newValue = moment(value).format(dateFormat);
    }

    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, i) => {
        if (i !== pageIndex) return page;
        return {
          ...page,
          sections: page.sections.map((section, j) => {
            if (j !== sectionIndex) return section;
            return {
              ...section,
              fields: section.fields.map((f, id) => {
                if (id !== fieldIndex) return f;
                return {
                  ...f,
                  [keyValue]: newValue,
                };
              }),
            };
          }),
        };
      });
      return { ...prev, formData: updatedFormObject };
    });
  };

  const handleAddNote = (indexes) => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, i) => {
        if (i !== pageIndex) return page;
        return {
          ...page,
          sections: page.sections.map((section, j) => {
            if (j !== sectionIndex) return section;
            return {
              ...section,
              fields: section.fields.map((f, id) => {
                if (id !== fieldIndex) return f;
                return {
                  ...f,
                  showNote: true,
                  tempNote: f?.note || '',
                };
              }),
            };
          }),
        };
      });
      return { ...prev, formData: updatedFormObject };
    });
  };
  const handleSaveNote = (indexes) => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, i) => {
        if (i !== pageIndex) return page;
        return {
          ...page,
          sections: page.sections.map((section, j) => {
            if (j !== sectionIndex) return section;
            return {
              ...section,
              fields: section.fields.map((f, id) => {
                if (id !== fieldIndex) return f;
                return {
                  ...f,
                  showNote: false,
                  note: f?.tempNote || '',
                  tempNote: '',
                };
              }),
            };
          }),
        };
      });
      return { ...prev, formData: updatedFormObject };
    });
  };
  const handleCancelNote = (indexes) => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, i) => {
        if (i !== pageIndex) return page;
        return {
          ...page,
          sections: page.sections.map((section, j) => {
            if (j !== sectionIndex) return section;
            return {
              ...section,
              fields: section.fields.map((f, id) => {
                if (id !== fieldIndex) return f;
                return {
                  ...f,
                  showNote: false,
                  tempNote: '',
                };
              }),
            };
          }),
        };
      });
      return { ...prev, formData: updatedFormObject };
    });
  };
  const handleDelelteNote = (indexes) => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, i) => {
        if (i !== pageIndex) return page;
        return {
          ...page,
          sections: page.sections.map((section, j) => {
            if (j !== sectionIndex) return section;
            return {
              ...section,
              fields: section.fields.map((f, id) => {
                if (id !== fieldIndex) return f;
                return {
                  ...f,
                  showNote: false,
                  note: '',
                  tempNote: '',
                };
              }),
            };
          }),
        };
      });
      return { ...prev, formData: updatedFormObject };
    });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onHandleChange = (info) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setState({
          imageUrl,
          uploadLoading: false,
        }),
      );
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const renderControlType = (item, optionsData, indexes) => {
    const { pageIndex, sectionIndex, fieldIndex } = indexes;

    const controlType = item.control_type;

    const keyLabel = `${controlType}-${item?.label}-${pageIndex}-${sectionIndex}-${fieldIndex}`;
    switch (controlType) {
      case 'Text':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please input  ${item.label}!` }]}
          >
            <Input
              key={keyLabel}
              name={keyLabel}
              onChange={(e) => {
                onChange(e, indexes);
              }}
              value={item?.value || ''}
            />
          </Form.Item>
        );

      case 'Number':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please input  ${item.label}!` }]}
          >
            <Input
              key={keyLabel}
              name={keyLabel}
              onChange={(e) => {
                onChange(e, indexes);
              }}
              value={item?.value || ''}
              type="number"
              placeholder="Enter number"
            />
          </Form.Item>
        );
      case 'Time':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please enter ${item.label}!` }]}
          >
            <TimePicker
              format={timeFormat}
              name={keyLabel}
              key={item?.label}
              value={item?.value || ''}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
            />
          </Form.Item>
        );
      case 'DateTime':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please enter ${item.label}!` }]}
          >
            <DatePicker
              format={dateFormat}
              name={keyLabel}
              key={item?.label}
              value={item?.value || ''}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
            />
          </Form.Item>
        );
      case 'Select':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please select ${item.label}!` }]}
          >
            <Select
              key={keyLabel}
              name={keyLabel}
              value={item?.value || ''}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
              placeholder="Select an option"
              options={optionsData}
            />
          </Form.Item>
        );

      case 'MultiSelect':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please select  ${item.label}!` }]}
          >
            <Select
              key={keyLabel}
              name={keyLabel}
              value={item?.value || ''}
              mode="multiple"
              placeholder="Select multiple options"
              options={optionsData}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
            />
          </Form.Item>
        );
      case 'Checkbox':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please select  ${item.label}!` }]}
          >
            <CheckboxGroup
              options={optionsData}
              value={item?.value || ''}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
            />
          </Form.Item>
        );
      case 'Radio':
        return (
          <Form.Item
            key={keyLabel}
            label={item?.label || 'Label'}
            name={keyLabel}
            rules={[{ required: item?.required, message: `Please select  ${item.label}!` }]}
          >
            <Radio.Group
              options={optionsData}
              value={item?.value || ''}
              onChange={(value) => {
                onChange({ target: { value, name: keyLabel } }, indexes);
              }}
            />
          </Form.Item>
        );
      case 'Instruction':
        return (
          <Cards bordered className="" key={keyLabel} name={keyLabel}>
            {item?.label}
          </Cards>
        );

      default:
        return null;
    }
  };

  const renderField = (item, pageIndex, sectionIndex, fieldIndex) => {
    const indexes = { pageIndex, sectionIndex, fieldIndex };
    const optionsData =
      item.control_type === 'Select' ||
      item.control_type === 'MultiSelect' ||
      item.control_type === 'Checkbox' ||
      item.control_type === 'Radio'
        ? getOptions(item?.options)
        : [];

    const keyLabel = `${item.control_type}-${item?.label}-${pageIndex}-${sectionIndex}-${fieldIndex}`;

    return (
      <>
        {/* <Form.Item key={item?.label} label={item?.label || 'Label'} name="label"> */}
        {/* <ControlComponent /> */}

        {renderControlType(item, optionsData, indexes)}
        {!item?.showNote && item.note && <Title level={5}>{item?.note || ''}</Title>}

        {/* <Image
          width={200}
          src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg"
          placeholder={
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
              width={200}
            />
          }
        /> */}
        {item?.showNote && (
          <div>
            <Form.Item key={keyLabel} name={keyLabel}>
              <Input
                placeholder="Please Enter Note"
                key={keyLabel}
                name={keyLabel}
                onChange={(e) => {
                  onChange(e, indexes, 'tempNote');
                }}
                value={item?.tempNote || ''}
              />
              <div className='buttonbox'>
                  <Button
                    size="small"
                    raised
                    type="primary"
                    disabled={!item?.tempNote}
                    onClick={() => handleSaveNote(indexes)}
                  >
                    Save
                  </Button>
                  <Button size="small" raised outlined type="primary" onClick={() => handleCancelNote(indexes)}>
                    Cancel
                  </Button>
                  <Button size="small" raised outlined type="danger" onClick={() => handleDelelteNote(indexes)}>
                    Delete
                  </Button>
              </div>
            </Form.Item>
          </div>
        )}

        {!item?.showNote && (
          <Button size="default" type="white" raised onClick={() => handleAddNote(indexes)}>
            <FeatherIcon icon="layers" />
            Note
          </Button>
        )}

        <Upload
          // name="avatar"
          // listType="picture-card"
          // className="avatar-uploader"
          showUploadList={false}
          // action="https://run.mocky.io/v3/9e0fcae5-e0b8-4c1a-ab87-fe3907da9717"
          beforeUpload={beforeUpload}
          onChange={onHandleChange}
        >
          <Button size="default" type="white" raised>
            <UploadOutlined /> Click to Upload
          </Button>
          {/* {state.imageUrl}
          {state.uploadLoading} */}
        </Upload>

        {/* </Form.Item> */}
      </>
    );
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPageIndex((prev) => prev - 1);
  };

  const repeatSection = (pageIndex, sectionIndex, RepeatedSection) => {
    setState((prev) => {
      const updatedFormObject = prev.formData.map((page, index) => {
        if (index === pageIndex) {
          let sectionList = [...page.sections];
          sectionList = sectionList.map((section, i) => {
            if (i === sectionIndex) {
              return { ...section, repeated: false };
            }
            return section;
          });

          sectionList.splice(sectionIndex + 1, 0, RepeatedSection);
          return { ...page, sections: [...sectionList] };
        }

        return page;
      });
      return { ...prev, formData: updatedFormObject };
    });
  };

  return (
    <RecordViewWrapper>
      <Main className='templetePreview'>
        <Row gutter={2}>
          <Col lg={24} xs={24}>
            <Form form={form} name="contactEdit" layout="vertical" onFinish={onFinish}>
              {/* {state.formData.map((item, index) => renderField(item, index))} */}

              {state.formData
                .filter((page, pageIndex) => currentPageIndex === pageIndex)
                .map((page) => {
                  return (
                    <Cards headless key={currentPageIndex}>
                      <Title level={2}>{page.page_title}</Title>

                      {page.sections.map((section, sectionIndex) => {
                        return (
                          <Cards key={sectionIndex} headless>
                            <Collapse collapsible="header" defaultActiveKey={[`${sectionIndex}`]}>
                              <Panel header={section.section_title} key={`${sectionIndex}`}>
                                <small>{`Section ${sectionIndex + 1}`}</small>
                                {section.fields.map((field, index) => (
                                  <div style={{ marginBottom: '10px' }}>
                                    {renderField(field, currentPageIndex, sectionIndex, index)}
                                  </div>
                                ))}
                              </Panel>
                            </Collapse>

                            {section?.repeated && (
                              <Button
                                size="small"
                                raised
                                type="primary"
                                onClick={() => repeatSection(currentPageIndex, sectionIndex, section)}
                              >
                                <FeatherIcon icon="plus" />
                                {section.section_title}
                              </Button>
                            )}
                            {/* <Panel header={section.section_title} key="1">
                                {section.fields.map((field, index) =>
                                  renderField(field, currentPageIndex, sectionIndex, index),
                                )}
                              </Panel> */}
                            {/* <small>{`Section ${sectionIndex + 1}`}</small>
                            <Title level={4}>{section.section_title}</Title>
                            <Panel header={section.section_title} key="1">
                              {section.fields.map((field, index) =>
                                renderField(field, currentPageIndex, sectionIndex, index),
                              )}
                            </Panel> */}
                          </Cards>
                        );
                      })}

                      <small>{`Page ${currentPageIndex + 1}`}</small>
                    </Cards>
                  );
                })}
              <Row>
                <Col span={2}>
                  {currentPageIndex !== 0 && (
                    <Button key={`prev-${currentPageIndex}`} size="small" type="white" raised on onClick={handlePrev}>
                      <FeatherIcon icon="arrow-left" />
                    </Button>
                  )}
                </Col>
                <Col span={2} offset={20}>
                  {state.formData.length - 1 !== currentPageIndex && (
                    <Button key={`next-${currentPageIndex}`} size="small" type="white" raised onClick={handleNext}>
                      <FeatherIcon icon="arrow-right" />
                    </Button>
                  )}
                </Col>
              </Row>

              <Button style={{ marginTop: '20px' }} htmlType="submit" size="default" type="primary" key="submit">
                {t('save')}
              </Button>
            </Form>
            <div className='jsondatabox'>
            {JSON.stringify(state.formData)}
            </div>
            {/* {isLoading ? (
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
              )} */}

            
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default PreviewForm;

PreviewForm.propTypes = {
  displayFormData: PropTypes.func.isRequired,
};
