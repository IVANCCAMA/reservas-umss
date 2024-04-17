import React from 'react';

interface CheckboxInputProps {
  name: string;
  label: string;
  value: string;
  onChange?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  required?: boolean;
  checked?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  label,
  value,
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
  required = false,
  checked = false
}) => {
  return (
    <div className='form-check'>
      <label htmlFor={name} className='form-check-label'>{label}</label>

      <input
        checked={checked}
        required={required}
        id={name}
        name={name}
        type='checkbox'
        className='form-check-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => onFocus(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      />
    </div>
  );
};

export default CheckboxInput;
