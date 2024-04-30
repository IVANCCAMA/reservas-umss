import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface NumberInputProps {
  name: string;
  label: React.ReactNode;
  handleChange?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleFocus?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleBlur?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  required?: boolean;
  minNumber?: number;
  maxNumber?: number;
  placeholder?: string;
  autoComplete?: string;
  step?: string;
  error?: string;
  disabled?: boolean;
}

const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps & ReturnType<UseFormRegister<any>>
>(({
  name,
  label,
  onChange = () => { },
  onBlur = () => { },
  handleChange = () => { },
  handleFocus = () => { },
  handleBlur = () => { },
  required = false,
  minNumber = 0,
  maxNumber = 500,
  placeholder = undefined,
  autoComplete = undefined,
  step = 'any',
  error = undefined,
  disabled = undefined
}, ref) => (
  <div className='input-component'>
    <label htmlFor={name} className='form-label fw-bold'>{label}</label>

    <input
      ref={ref}
      required={required}
      autoComplete={autoComplete || undefined}
      id={name}
      name={name}
      type='number'
      className='form-control'
      onChange={(e) => {
        const newValue = handleChange(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
        onChange(e);
      }}
      onFocus={(e) => {
        const newValue = handleFocus(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
      }}
      onBlur={(e) => {
        const newValue = handleBlur(e.target.value);
        if (newValue) {
          e.target.value = newValue;
        }
        onBlur(e);
      }}
      min={minNumber || undefined}
      max={maxNumber || undefined}
      placeholder={placeholder || undefined}
      step={step}
      disabled={disabled}
    />
    {error && (<span className="text-danger">{error}</span>)}
  </div>
))

export default NumberInput;
