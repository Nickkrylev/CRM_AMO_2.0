import React from 'react';

import "./CustomSelect.css"

const CustomSelect = ({ name, label, options }) => {
  return (
    <div className="tab-content-row">
      <div className="tab-content-title">{label}</div>
        <select name={name} className='custom-content-input'>
          <option value="">Выбрать</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </div>
  );
};

export default CustomSelect;