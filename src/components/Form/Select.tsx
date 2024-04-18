import React from 'react';

interface option {
  value: string;
  title: string;
  hidden?: boolean;
}

interface SelectProps {
  name: string;
  label: string;
  options: option[] | string[];
  onChange?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  value?: number | string | undefined;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
  required = false,
  defaultValue = 'default',
  placeholder = '',
  value = undefined
}) => {
  return (
    <div className='my-3'>
      <label htmlFor={name} className='form-label'>{label}</label>

      <select
        required={required}
        id={name}
        name={name}
        className='form-select'
        defaultValue={options.length !== 0 ? defaultValue : undefined}
        value={options.length === 0 ? defaultValue : value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => onFocus(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      >
        {placeholder && (
          <option disabled hidden value='default'>{placeholder}</option>
        )}

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
    </div>
  );
};

export default Select;
