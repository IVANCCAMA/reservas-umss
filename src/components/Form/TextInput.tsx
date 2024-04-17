import React from 'react';

interface TextInputProps {
  name: string;
  label: string;
  value: string;
  onChange?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  datalist?: string[];
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
  required = false,
  minLength = 0,
  maxLength = 40,
  placeholder = '',
  autoComplete = '',
  datalist = []
}) => {
  return (
    <div className='my-3'>
      <label htmlFor={name} className='form-label'>{label}</label>

      <input
        required={required}
        autoComplete={autoComplete || undefined}
        id={name}
        name={name}
        list={`datalist-${name}`}
        className='form-control'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => onFocus(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        minLength={minLength || undefined}
        maxLength={maxLength || undefined}
        placeholder={placeholder || undefined}
      />

      <datalist id={`datalist-${name}`}>
        {datalist.map((value, index) => (
          <option key={`datalist-${name}-item-${index}`} value={value}/>
        ))}
      </datalist>
    </div>
  );
};

export default TextInput;
