import React from 'react';

interface CheckboxInputProps {
  name: string;
  label: string;
  value: string;
  onChange?: (newValue: boolean) => void;
  onFocus?: (newValue: boolean) => void;
  onBlur?: (newValue: boolean) => void;
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
        onChange={(e) => onChange(e.target.checked)}
        onFocus={(e) => onFocus(e.target.checked)}
        onBlur={(e) => onBlur(e.target.checked)}
      />
    </div>
  );
};

export default CheckboxInput;
