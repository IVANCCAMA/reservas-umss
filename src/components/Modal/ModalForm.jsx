const ModalForm = ({ id, content, handleConfirm, imgIcon, btnColor, tipoModal }) => {
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content pt-md-3">
          <div className="modal-body text-center">
            {imgIcon && (
              <div>
                <img src={imgIcon} alt="icono mensaje" />
              </div>
            )}
            <div className="py-md-3">{content}</div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className={`btn btn-${btnColor}`}
                data-bs-dismiss="modal"
                onClick={handleConfirm}
              >
                <p className="mx-4 my-auto">Aceptar</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
