import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

function CustomSelect({ value, dependency, ...rest }) {
  const [curValue, setCurValue] = useState(value);

  useEffect(() => {
    setCurValue(undefined);
  }, [dependency]);

  useEffect(() => {
    setCurValue(value);
  }, [value]);

  console.log({ curValue });
  return <Select value={curValue} {...rest} />;
}

CustomSelect.propTypes = {
  value: PropTypes.number,
  dependency: PropTypes.number,
};

export default CustomSelect;
