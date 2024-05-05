import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CheckboxInputProps {
  name: string;
  label: React.ReactNode;
  value: number | string | readonly string[] | undefined;
  handleChange?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleFocus?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleBlur?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  afterChange?: (newValue: string | readonly string[] | number | undefined) => void;
  afterFocus?: (newValue: string | readonly string[] | number | undefined) => void;
  afterBlur?: (newValue: string | readonly string[] | number | undefined) => void;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
}

const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  CheckboxInputProps & ReturnType<UseFormRegister<any>>
>(({
  name,
  label,
  value,
  onChange = () => { },
  onBlur = () => { },
  handleChange = () => { },
  handleFocus = () => { },
  handleBlur = () => { },
  afterChange = () => { },
  afterFocus = () => { },
  afterBlur = () => { },
  required = undefined,
  checked = undefined,
  error = undefined,
  disabled = undefined
}, ref) => (
  <div className='form-check align-content-center'>
    <label htmlFor={name} className='form-check-label px-2'>{label}</label>

    <input
      ref={ref}
      disabled={disabled}
      checked={ref !== undefined ? checked : undefined}
      required={required}
      id={name}
      name={name}
      type='checkbox'
      value={value}
      className='form-check-input'
      onChange={(e) => {
        const newValue = handleChange(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
        onChange(e);
        afterChange(e.target.value);
      }}
      onFocus={(e) => {
        const newValue = handleFocus(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
        afterFocus(e.target.value);
      }}
      onBlur={(e) => {
        const newValue = handleBlur(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
        onBlur(e);
        afterBlur(e.target.value);
      }}
    />
    {error && (<span className="text-danger">{error}</span>)}
  </div>
))

export default CheckboxInput;
