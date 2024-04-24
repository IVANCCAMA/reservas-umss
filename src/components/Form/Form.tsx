import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormProps {
  children: ReactNode;
  title?: string;
  requiredConnection?: boolean;
  onSubmit: () => void;
  onClickCancelRedirectTo?: string;
  onClickCancel?: () => void;
  iconoError?: any;
}

const Form: React.FC<FormProps> = ({
  children,
  title = '',
  requiredConnection = false,
  onSubmit,
  onClickCancelRedirectTo = '',
  onClickCancel,
  iconoError = null
}) => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [isAcceptButtonDisabled, setIsAcceptButtonDisabled] = useState(false);

  const handleOnlineStatusChange = () => {
    setIsOnline(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setIsAcceptButtonDisabled(true);
    if (!requiredConnection || isOnline) {
      await onSubmit();
    } else {
      // modal error conection
    }
    setIsAcceptButtonDisabled(false);
  };

  const handleOnClickCancel = () => {
    if (onClickCancel) {
      onClickCancel();
    }
    if (onClickCancelRedirectTo) {
      navigate(onClickCancelRedirectTo);
    }
  }

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <form className="modal-box" id="form" onSubmit={handleOnSubmit}>
            <div className="inter-modal">
              {title && (
                <h2 className="text-md-center">{title}</h2>
              )}

              {children}

              <div className="campo">
                <div className="btn-box">
                  <button
                    type="submit"
                    className="btn btn-success me-5"
                    disabled={isAcceptButtonDisabled}>
                    Registrar
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    Cancelar
                  </button>
                </div>
              </div>
              
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered ">
                  <div className="modal-content pt-md-3">
                    <div className="modal-body text-center">
                      <div>
                        <img src={iconoError} alt="icono de error" />
                      </div>
                      <div className="py-md-3">
                        ¿Estás seguro que desea <br /> cancelar el registro de <br /> ambiente?
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                          onClick={handleOnClickCancel}
                        >
                          <p className="mx-4 my-auto">Si</p>
                        </button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                          <p className="mx-4 my-auto">No</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
