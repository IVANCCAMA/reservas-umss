import React, { useState } from 'react';

interface FormProps {
  children: any;
  onSubmit: () => void;
  title?: string;
  onClickCancelTo?: () => void;
  ismodal: boolean;
  onClickCancel?: () => void;
  btnName1?: string;
  btnName2?: string;
  className: string;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit = () => {},
  title = '',
  onClickCancelTo = () => {},
  ismodal = false,
  onClickCancel = () => {},
  btnName1 = 'Enviar',
  btnName2 = 'Cancelar',
  ...rest
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(); // Llama al onSubmit pasado como parte de rest, si existe
    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <div className={`row ${ismodal ? '' : 'py-md-3'} justify-content-center`}>
        <div className={`${ismodal ? '' : 'col-md-8'}`}>
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
        </div>
      </div>
    </div>
  );
};

export default Form;
