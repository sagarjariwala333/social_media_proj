import React, { useState } from 'react';
import moment from 'moment-timezone';

const TimezonePicker = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const getTimezoneOptions = () => {
    const timezones = moment.tz.names();
    return timezones.map((timezone) => {
      const displayText = `(UTC${moment.tz(timezone).format('Z')}) ${timezone}`;
      return (
        <option key={timezone} value={timezone}>
          {displayText}
        </option>
      );
    });
  };

  return (
    <div>
      {/* <label htmlFor="timezone-select">Select a timezone:</label> */}
      <select id="timezone-select" value={selectedTimezone} onChange={handleTimezoneChange}>
        <option value="">Select a timezone</option>
        {getTimezoneOptions()}
      </select>
    </div>
  );
};

export default TimezonePicker;
