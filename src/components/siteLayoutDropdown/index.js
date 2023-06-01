import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';
import { axiosDataRead } from '../../redux/facility/actionCreator';

function SiteLayoutDropdown({ showSearch = true, dropdownData, onChange }) {
  console.log({ showSearch, onChange, dropdownData });
  const [dropdownFormData, setDropdownFormData] = useState(dropdownData || {});
  const dispatch = useDispatch();
  const {
    levels,
    isLoading,
    facility1,
    isLoading1,
    facility2,
    isLoading2,
    facility3,
    isLoading3,
    facility4,
    isLoading4,
    facility5,
    isLoading5,
    facility6,
    isLoading6,
  } = useSelector((state) => {
    return {
      levels: state.facility.data,
      isLoading: state.facility.loading,

      facility1: state.facility1.data,
      isLoading1: state.facility1.loading,

      facility2: state.facility2.data,
      isLoading2: state.facility2.loading,

      facility3: state.facility3.data,
      isLoading3: state.facility3.loading,

      facility4: state.facility4.data,
      isLoading4: state.facility4.loading,

      facility5: state.facility5.data,
      isLoading5: state.facility5.loading,

      facility6: state.facility6.data,
      isLoading6: state.facility6.loading,
    };
  });

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);
  if (isLoading) {
    return <></>;
  }

  const handleOnChange = (index, value) => {
    const { id, name } = levels[index];

    const data = levels.filter((item) => item.id > id).map((item) => ({ [item.name]: '' }));

    const objData = data.reduce((acc, cur) => {
      const key = Object.keys(cur)[0];
      acc[key] = cur[key];
      return acc;
    }, {});

    setDropdownFormData((prev) => ({ ...prev, ...objData, [name]: value }));
    onChange({ name, value });
  };

  const getFacilityList = (list, id) => {
    const facilityLevel = `facility${id + 1}`;
    console.log({ facilityLevel, list });
    const data = dropdownFormData[levels[id].name]
      ? list.filter((item) => item[facilityLevel] === dropdownFormData[levels[id].name] && item.status === 'active')
      : [];

    return data;
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filteroptions = (input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase());

  // console.log({ levels, dropdownFormData });
  return (
    <Row align="middle" gutter={10}>
      {!isLoading1 && facility1.length > 0 && levels[0].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_1"
            name="Level_1"
            label={levels[0].unitname}
            rules={[{ required: true, message: `${levels[0].unitname} required!` }]}
          >
            <CustomSelect
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_1"
              name="level_1"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={facility1.filter((item) => item.status === 'active')}
              placeholder={`Please Select ${levels[0].unitname}`}
              value={dropdownFormData[levels[0].name]}
              onSelect={(value) => {
                handleOnChange(0, value);
              }}
              onChange={(value) => {
                handleOnChange(0, value);
              }}
            />
          </Form.Item>
        </Col>
      )}

      {!isLoading2 && facility2.length > 0 && levels[1].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_2"
            name="Level_2"
            label={levels[1].unitname}
            dependencies={['Level_1']}
            rules={[
              {
                required: true,
                message: `${levels[1].unitname} required!`,
              },
            ]}
          >
            <CustomSelect
              dependency={dropdownFormData[levels[0].name]}
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_2"
              name="level_2"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={getFacilityList(facility2, 0)}
              placeholder={`Please Select ${levels[1].unitname}`}
              value={dropdownFormData[levels[1].name] || undefined}
              onSelect={(value) => {
                handleOnChange(1, value);
              }}
              onChange={(value) => {
                handleOnChange(1, value);
              }}
            />
          </Form.Item>
        </Col>
      )}

      {!isLoading3 && facility3.length > 0 && levels[2].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_3"
            name="Level_3"
            label={levels[2].unitname}
            rules={[{ required: true, message: `${levels[2].unitname} required!` }]}
          >
            <CustomSelect
              dependency={dropdownFormData[levels[1].name]}
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_3"
              name="level_3"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={getFacilityList(facility3, 1)}
              placeholder={`Please Select ${levels[2].unitname}`}
              value={dropdownFormData[levels[2].name] || undefined}
              onSelect={(value) => {
                handleOnChange(2, value);
              }}
              onChange={(value) => {
                handleOnChange(2, value);
              }}
            />
          </Form.Item>
        </Col>
      )}

      {!isLoading4 && facility4.length > 0 && levels[3].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_4"
            name="Level_4"
            label={levels[3].unitname}
            rules={[{ required: true, message: `${levels[3].unitname} required!` }]}
          >
            <CustomSelect
              dependency={dropdownFormData[levels[2].name]}
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_4"
              name="level_4"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={getFacilityList(facility4, 2)}
              placeholder={`Please Select ${levels[3].unitname}`}
              value={dropdownFormData[levels[3].name] || undefined}
              onSelect={(value) => {
                handleOnChange(3, value);
              }}
              onChange={(value) => {
                handleOnChange(3, value);
              }}
            />
          </Form.Item>
        </Col>
      )}

      {!isLoading5 && facility5.length > 0 && levels[4].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_5"
            name="Level_5"
            label={levels[4].unitname}
            rules={[{ required: true, message: `${levels[4].unitname} required!` }]}
          >
            <CustomSelect
              dependency={dropdownFormData[levels[3].name]}
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_5"
              name="level_5"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={getFacilityList(facility5, 3)}
              placeholder={`Please Select ${levels[4].unitname}`}
              value={dropdownFormData[levels[4].name] || undefined}
              onSelect={(value) => {
                handleOnChange(4, value);
              }}
              onChange={(value) => {
                handleOnChange(4, value);
              }}
            />
          </Form.Item>
        </Col>
      )}

      {!isLoading6 && facility6.length > 0 && levels[5].status === 'active' && (
        <Col lg={8} md={8} xs={24}>
          <Form.Item
            key="Level_6"
            name="Level_6"
            label={levels[5].unitname}
            rules={[{ required: true, message: `${levels[5].unitname} required!` }]}
          >
            <CustomSelect
              dependency={dropdownFormData[levels[4].name]}
              showSearch={showSearch}
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={filteroptions}
              key="Select_Level_6"
              name="level_6"
              fieldNames={{ value: 'id', label: 'name' }}
              size="large"
              options={getFacilityList(facility6, 4)}
              placeholder={`Please Select ${levels[5].unitname}`}
              value={dropdownFormData[levels[5].name] || undefined}
              onSelect={(value) => {
                handleOnChange(5, value);
              }}
              onChange={(value) => {
                handleOnChange(5, value);
              }}
            />
          </Form.Item>
        </Col>
      )}
    </Row>
  );
}

SiteLayoutDropdown.propTypes = {
  dropdownData: PropTypes.arrayOf(PropTypes.Object),
  showSearch: PropTypes.bool,
  onChange: PropTypes.func,
};
export default SiteLayoutDropdown;
