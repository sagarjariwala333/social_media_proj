import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FeatherIcon from 'feather-icons-react';
import PreviewForm from './PreviewForm';
import InlineInput from './InlineInput';
import { RecordViewWrapper } from './Style';
import { Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { axiosDataRead } from '../../../redux/systemsetting/tenant/actionCreator';

const { TextArea } = Input;

const DefaultFormField = {
  label: '',
  required: false,
  control_type: 'Text',
  options: null,
  max_length: 100,
};

const DefaultSection = {
  section_title: 'Default Section Title',
  repeated: false,
  fields: [DefaultFormField],
};

const DefaultPage = {
  page_title: 'Default Page Title',
  sections: [
    {
      ...DefaultSection,
    },
  ],
};

const ControlType = [
  {
    value: 'Text',
    label: 'Text',
  },
  {
    value: 'Select',
    label: 'Select',
  },
  {
    value: 'Number',
    label: 'Number',
  },
  {
    value: 'MultiSelect',
    label: 'MultiSelect',
  },
  {
    value: 'Instruction',
    label: 'Instruction',
  },
  {
    value: 'Checkbox',
    label: 'Checkbox',
  },
  {
    value: 'Radio',
    label: 'Radio',
  },
  {
    value: 'Location',
    label: 'Location',
  },
  {
    value: 'Time',
    label: 'Time',
  },
  {
    value: 'DateTime',
    label: 'DateTime',
  },
];

const OptionsList = [
  {
    value: 'Employee List',
    label: 'Employee List',
  },
  {
    value: 'Tenet List',
    label: 'Tenet List',
  },
  {
    value: 'Country List',
    label: 'Country List',
  },
  {
    value: 'Yes No List',
    label: 'Yes No List',
  },
];
// const { Option } = Select;

const ViewPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    shifttoUpdate: {},
    formData: [DefaultPage],
  });

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
      setState((prev) => prev);
    }
  }, [dispatch]);

  const handleAddRow = (pageIndex, sectionIndex) => {
    let formDataList = [...state.formData];
    formDataList = formDataList.map((item, index) => {
      if (index === pageIndex) {
        const sectionList = item.sections.map((section, i) => {
          if (sectionIndex === i) {
            return { ...section, fields: [...section.fields, DefaultFormField] };
          }
          return section;
        });
        return { ...item, sections: [...sectionList] };
      }

      return item;
    });

    setState((prev) => ({ ...prev, formData: formDataList }));
  };
  const handleAddPage = () => {
    setState((prev) => ({ ...prev, formData: [...prev.formData, DefaultPage] }));
  };

  const handleAddSection = (pageIndex) => {
    let formDataList = [...state.formData];
    formDataList = formDataList.map((item, index) => {
      if (index === pageIndex) {
        return { ...item, sections: [...item.sections, DefaultSection] };
      }

      return item;
    });

    setState((prev) => ({ ...prev, formData: formDataList }));
  };

  // const handleDuplicateSection = (pageIndex, sectionIndex) => {
  //   let formDataList = [...state.formData];
  //   formDataList = formDataList.map((item, index) => {
  //     if (index === pageIndex) {
  //       const sectionList = [...item.sections];
  //       const sectionItem = item.sections.find((section, i) => i === sectionIndex);
  //       sectionList.splice(sectionIndex, 0, sectionItem);
  //       return { ...item, sections: [...sectionList] };
  //     }

  //     return item;
  //   });

  //   setState((prev) => ({ ...prev, formData: formDataList }));
  // };

  const handleDeletePage = (pageIndex) => {
    const formDataList = state.formData.filter((item, i) => i !== pageIndex);
    setState((prev) => ({ ...prev, formData: [...formDataList] }));
  };

  const handleDeleteSection = (pageIndex, sectionIndex) => {
    let formDataList = [...state.formData];
    formDataList = formDataList.map((item, index) => {
      if (index === pageIndex) {
        const sectionList = item.sections.filter((section, i) => i !== sectionIndex);
        return { ...item, sections: [...sectionList] };
      }

      return item;
    });

    setState((prev) => ({ ...prev, formData: formDataList }));
  };

  const handleDeleteRow = (pageIndex, sectionIndex, fieldIndex) => {
    let formDataList = [...state.formData];
    formDataList = formDataList.map((item, index) => {
      if (index === pageIndex) {
        const sectionList = item.sections.map((section, i) => {
          if (sectionIndex === i) {
            const fieldList = section.fields.filter((field, i) => i !== fieldIndex);
            return { ...section, fields: fieldList };
          }
          return section;
        });

        return { ...item, sections: [...sectionList] };
      }

      return item;
    });

    setState((prev) => ({ ...prev, formData: formDataList }));
  };

  const onChange = (e, indexes) => {
    const { name, value, type, checked } = e.target;
    const { pageIndex, sectionIndex, fieldIndex } = indexes;
    // console.log(pageIndex, sectionIndex, fieldIndex, name, value, e);

    const newValue = type === 'checkbox' ? checked : value;
    if (name === 'page_title') {
      setState((prev) => {
        const updatedFormObject = prev.formData.map((page, i) => {
          if (i !== pageIndex) return page;
          return {
            ...page,
            page_title: newValue,
          };
        });
        return { ...prev, formData: updatedFormObject };
      });
    } else if (name === 'section_title' || name === 'repeated') {
      setState((prev) => {
        const updatedFormObject = prev.formData.map((page, i) => {
          if (i !== pageIndex) return page;
          return {
            ...page,
            sections: page.sections.map((section, j) => {
              if (j !== sectionIndex) return section;
              return {
                ...section,
                [name]: newValue,
              };
            }),
          };
        });
        return { ...prev, formData: updatedFormObject };
      });
    } else {
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
                    [name]: newValue,
                  };
                }),
              };
            }),
          };
        });
        return { ...prev, formData: updatedFormObject };
      });
    }
  };

  const renderField = (item, pageIndex, sectionIndex, fieldIndex) => {
    const indexes = { pageIndex, sectionIndex, fieldIndex };
    return (
      <>
        <div className="fliedsbox">
          <ul>
          <li>
            <Form.Item>
              {item.control_type === 'Instruction' ? (
                <TextArea
                  rows={10}
                  cols={50}
                  size="small"
                  placeholder="Enter Instruction"
                  value={item?.label}
                  name="label"
                  onChange={(e) => {
                    onChange(e, indexes);
                  }}
                />
              ) : (
                <InlineInput
                  size="small"
                  placeholder="Enter Label"
                  value={item?.label || ''}
                  name="label"
                  onChangeValue={(e) => {
                    onChange(e, indexes);
                  }}
                />
              )}
            </Form.Item>
          </li>
          <li>
            <Form.Item>
              <Select
                size="small"
                value={item?.control_type}
                name="control_type"
                placeholder="Select Control Type"
                className="sDash_fullwidth-select"
                options={ControlType}
                onChange={(value) => {
                  onChange({ target: { value, name: 'control_type' } }, indexes);
                }}
              />
            </Form.Item>
          </li>
          {(item.control_type === 'Select' ||
            item.control_type === 'MultiSelect' ||
            item.control_type === 'Checkbox' ||
            item.control_type === 'Radio') && (
            <li>
              <Form.Item>
                <Select
                  size="small"
                  name="options"
                  value={item?.options}
                  placeholder="Select Options List"
                  className="sDash_fullwidth-select"
                  options={OptionsList}
                  onChange={(value) => {
                    onChange({ target: { value, name: 'options' } }, indexes);
                  }}
                />
              </Form.Item>
            </li>
          )}
          {item.control_type === 'Text' && (
            <li>
              <Form.Item>
                <Input
                  size="small"
                  placeholder="Max Length"
                  value={item?.max_length}
                  type="number"
                  name="max_length"
                  onChange={(e) => {
                    onChange(e, indexes);
                  }}
                />
              </Form.Item>
            </li>
          )}

          {state.formData[pageIndex].sections[sectionIndex].fields.length !== 1 && (
            <li>
              <Button
                htmlType="submit"
                size="small"
                raised
                onClick={() => handleDeleteRow(pageIndex, sectionIndex, fieldIndex)}
              >
                <FeatherIcon icon="trash" />
               
              </Button>
            </li>
          )}
          </ul>
          {item.control_type !== 'Instruction' && (
          <ul>
            <li>
              <Form.Item>
                <Checkbox
                  size="small"
                  name="required"
                  checked={item?.required}
                  onChange={(e) => {
                    onChange(e, indexes);
                  }}
                >
                  Required
                </Checkbox>
              </Form.Item>
            </li>
          </ul>
        )}
        </div>

        
      </>
    );
  };

  return (
    <RecordViewWrapper className='tempeltepage'>
      <Main>
        <Row gutter={2}>
          <Col lg={16} xs={24}>
            <Cards headless className="padzero">
              <div className="EditpageBox">
              <Form form={form} name="contactEdit">
                {state.formData.map((page, pageIndex) => {
                  return (
                    <Cards key={pageIndex} className="padzero"> 
                    <div className='newpageBox'>
                      <div>
                      <small>{`Page ${pageIndex + 1}`}</small>
                      <InlineInput
                        size="small"
                        level={2}
                        placeholder="Enter Page Title"
                        value={page.page_title}
                        name="page_title"
                        onChangeValue={(e) => {
                          onChange(e, { pageIndex });
                        }}
                      />
                    </div>
                      {state.formData.length !== 1 && (
                        <Button size="small" raised  onClick={() => handleDeletePage(pageIndex)}>
                          <FeatherIcon icon="trash" />
                          
                        </Button>
                      )}
                      </div>
                      <div className='pageinnerbox'>
                      {page.sections.map((section, sectionIndex) => {
                        return (
                          <div key={sectionIndex} className="padzero">
                            <div className='custompageheader'>
                              <div>
                                  <small>{`Section ${sectionIndex + 1}`}</small>

                                  <InlineInput
                                    size="small"
                                    level={4}
                                    placeholder="Enter Section Title"
                                    value={section.section_title}
                                    name="section_title"
                                    onChangeValue={(e) => {
                                      onChange(e, { pageIndex, sectionIndex });
                                    }}
                                  />
                              </div>

                            <Form.Item>
                              <Checkbox
                                size="small"
                                name="repeated"
                                checked={section?.repeated}
                                onChange={(e) => {
                                  onChange(e, { pageIndex, sectionIndex });
                                }}
                              >
                                Repeated
                              </Checkbox>
                            </Form.Item>
                            {state.formData[pageIndex].sections.length !== 1 && (
                              <Button
                                size="small"
                                raised 
                                onClick={() => handleDeleteSection(pageIndex, sectionIndex)}
                              >
                                <FeatherIcon icon="trash" /> 
                              </Button>
                            )}
                            </div>
                            {section.fields.map((field, index) => renderField(field, pageIndex, sectionIndex, index))}
                            <div className="sectionbuttons">
                          
                            <Button
                              size="small"
                              raised
                              type="primary"
                              onClick={() => handleAddRow(pageIndex, sectionIndex)}
                            >
                              <FeatherIcon icon="plus" />
                              Add Field
                            </Button>
                            </div>
                          </div>
                        );
                      })}
                    <div className="sectionbuttons addsectionbtn">
                      <Button size="small" raised type="primary" onClick={() => handleAddSection(pageIndex)}>
                        <FeatherIcon icon="plus" />
                        Add Section
                      </Button>
                    </div>
                    </div>
                    </Cards>
                  );
                })}
                {/* // renderField(item, index))} */}
                <div className="addpagebuttonsection">
                <Button size="small" raised type="primary" onClick={handleAddPage}>
                  <FeatherIcon icon="plus" />
                  Add Page
                </Button>              
                  <Button size="small" raised type="primary" key="submit">
                    {t('save')}
                  </Button>
                </div>
              </Form>
              {JSON.stringify(state.formData)}
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
              </div>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>&nbsp;</div>
            </Cards>
          </Col>
          <Col lg={8} xs={24} className='templeterightBox'>         
              <PreviewForm displayFormData={JSON.parse(JSON.stringify(state.formData))} />
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
