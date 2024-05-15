import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface option {
  value: string | readonly string[] | number | undefined;
  title: string;
  hidden?: boolean;
}

interface SelectProps {
  // name: string;
  label: React.ReactNode;
  options: option[] | string[];
  handleChange?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleFocus?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  handleBlur?: (newValue: string | readonly string[] | number | undefined) => string | undefined;
  afterChange?: (newValue: string | readonly string[] | number | undefined) => void;
  afterFocus?: (newValue: string | readonly string[] | number | undefined) => void;
  afterBlur?: (newValue: string | readonly string[] | number | undefined) => void;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps & ReturnType<UseFormRegister<any>>>(
  (
    {
      name,
      label,
      options,
      onChange = () => {},
      onBlur = () => {},
      handleChange = () => {},
      handleFocus = () => {},
      handleBlur = () => {},
      afterChange = () => {},
      afterFocus = () => {},
      afterBlur = () => {},
      required = false,
      multiple = false,
      defaultValue = undefined,
      placeholder = undefined,
      error = undefined,
    },
    ref,
  ) => (
    <div className="input-component">
      <label htmlFor={name} className="form-label fw-bold">
        {label}
      </label>

      <select
        ref={ref}
        required={required}
        multiple={multiple}
        id={name}
        name={name}
        className="form-select"
        defaultValue={defaultValue}
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
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option: string | option, index: number) => (
          <option
            key={`${name}-${index}`}
            value={typeof option === 'string' ? option : option.value}
            hidden={typeof option === 'string' ? undefined : option.hidden}
          >
            {typeof option === 'string' ? option : option.title}
          </option>
        ))}
      </select>
      {error && <span className="text-danger">{error}</span>}
    </div>
  ),
);

export default Select;
