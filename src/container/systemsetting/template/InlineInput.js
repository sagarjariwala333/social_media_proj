import React, { useState } from 'react';
import { Input, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const InlineInput = ({ value, onChangeValue, name, level = 0, ...rest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChangeValue({ target: { name, value: text } });
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleClick();
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission
      handleBlur();
    }
  };
  return (
    <div tabIndex={0} onClick={handleClick} role="button" onKeyDown={handleKeyDown}>
      {!text || isEditing ? (
        <Input
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onPressEnter={handleBlur}
          onKeyPress={handleKeyPress}
          {...rest}
        />
      ) : level === 0 ? (
        text
      ) : (
        <Title level={level}>{text}</Title>
      )}
    </div>
  );
};

export default InlineInput;

InlineInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  onChangeValue: PropTypes.func,
};
