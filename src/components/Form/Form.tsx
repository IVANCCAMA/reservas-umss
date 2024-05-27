import React, { ReactNode, useState } from 'react';
import { string } from 'yup';

interface FormProps {
  children: any;
  onSubmit: () => void;
  title?: string;
  onClickCancel?: () => void;
  btnName1?: string;
  btnName2?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit = () => {},
  title = '',
  onClickCancel = () => {},
  btnName1 = 'Enviar',
  btnName2 = 'Cancelar',
  ...rest
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    console.log('hola');

    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(); // Llama al onSubmit pasado como parte de rest, si existe
    setIsSubmitting(false);
  };

  return (
    <form
      {...{
        ...rest,
        className: `${rest.className || ''} form-component`,
        onSubmit: handleOnSubmit,
      }}
    >
      {title && <h2 className="text-md-center">{title}</h2>}

      {children}

      <div className="d-flex justify-content-center pt-3">
        <button type="submit" className="btn btn-success me-md-5" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : btnName1}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
          disabled={isSubmitting}
          onClick={onClickCancel}
        >
          {btnName2}
        </button>
      </div>
    </form>
  );
};

export default Form;
