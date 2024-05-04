import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TimeInputProps {
  name: string;
  label: React.ReactNode;
  handleChange?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleFocus?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleBlur?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  afterChange?: (newValue: string | readonly string[] | number | undefined) => void;
  afterFocus?: (newValue: string | readonly string[] | number | undefined) => void;
  afterBlur?: (newValue: string | readonly string[] | number | undefined) => void;
  required?: boolean;
  minTime?: string;
  maxTime?: string;
  error?: string;
  step?: string;
}

const TimeInput = React.forwardRef<
  HTMLInputElement,
  TimeInputProps & ReturnType<UseFormRegister<any>>
>(({
  name,
  label,
  onChange = () => { },
  onBlur = () => { },
  handleChange = () => { },
  handleFocus = () => { },
  handleBlur = () => { },
  afterChange = () => { },
  afterFocus = () => { },
  afterBlur = () => { },
  required = false,
  minTime= '2024-01-01',
  maxTime= '2024-12-31',
  error = undefined,
  step = undefined
}, ref) => (
  <div className='input-component'>
    <label htmlFor={name} className='form-label fw-bold'>{label}</label>

    <input
      ref={ref}
      required={required}
      id={name}
      name={name}
      type='time'
      className='form-control'
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
      min={minTime || undefined}
      max={maxTime || undefined}
      step={step}
    />
    {error && (<span className="text-danger">{error}</span>)}
  </div>
))

export default TimeInput;
