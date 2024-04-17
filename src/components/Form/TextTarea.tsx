import React from 'react';

interface TextTareaProps {
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
  textarea?: number;
}

const TextTarea: React.FC<TextTareaProps> = ({
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
  textarea = 0
}) => {
  return (
    <div className='my-3'>
      <label htmlFor={name} className='form-label'>{label}</label>

      <textarea
        required={required}
        autoComplete={autoComplete || undefined}
        id={name}
        name={name}
        rows={textarea}
        className='form-control'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => onFocus(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        minLength={minLength || undefined}
        maxLength={maxLength || undefined}
        placeholder={placeholder || undefined}
      />
    </div>
  );
};

export default TextTarea;
