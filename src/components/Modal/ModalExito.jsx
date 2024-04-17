import { Modal } from 'bootstrap';
import iconoError from '../../assets/Images/iconoError.png';
import iconoExito from '../../assets/Images/iconoExito.png';
import PropTypes from 'prop-types';

const ModalExito = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content pt-md-3">
          <div className="modal-body text-center">
            <div>
              <img src={iconoExito} alt="icono de error" />
            </div>
            <div className="py-md-3">Ambiente registrado con exito</div>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">
                <p className="mx-4 my-auto">Aceptar</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExito;
