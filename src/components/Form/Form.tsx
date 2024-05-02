import React, { ReactNode, useState } from 'react';

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children: ReactNode;
  title?: string;
  onClickCancel?: () => void;
}

const Form: React.FC<FormProps> = ({
  children,
  title = '',
  onClickCancel = () => { },
  ...rest
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    rest?.onSubmit?.(e); // Llama al onSubmit pasado como parte de rest, si existe
    setIsSubmitting(false);
  };

  // const childrenModified = React.Children.map(children, (child) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, {
  //       className: `${child.props.className ?? ''} input-form`
  //     });
  //   }
  //   return child;
  // });

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-8">
          <form {...{ ...rest, onSubmit: handleOnSubmit }}>
            {title && (<h2 className="text-md-center">{title}</h2>)}

            {children}

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-success me-md-5"
                disabled={isSubmitting}
                style={{ width: "86px" }}
              >
                {isSubmitting ? 'Enviando...' : 'Registrar'}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={isSubmitting}
                onClick={onClickCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
