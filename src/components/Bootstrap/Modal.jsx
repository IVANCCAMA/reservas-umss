import React, { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * Component that renders a button with specified Bootstrap styling and behavior.
 *
 * @param {Object} props
 * @param {boolean} [props.outline=false] - Determines if the button should have an outline style.
 * @param {string} props.type - The Bootstrap button style (e.g., 'primary', 'secondary').
 * @param {React.ReactNode} props.content - The content to display on the button.
 * @param {Function} props.onClick - The callback function to handle the button click.
 */
export const ButtonModal = ({ outline = false, type, content, onClick }) => {
  return (
    <button
      type='button'
      className={`btn btn${outline ? '-outline' : ''}-${type}`}
      onClick={onClick}
      data-bs-dismiss="modal"
    >
      {content}
    </button>
  );
};

/**
 * Modal component that can be controlled externally via ref.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.content - The content to be displayed inside the modal.
 * @param {ButtonModal} props.button1 - Props for the first button inside the modal.
 * @param {ButtonModal} props.button2 - Props for the second button inside the modal.
 * @param {React.Ref} ref - React ref that provides control over the modal's visibility.
 */
const Modal = forwardRef((props, ref) => {
  const { content, button1, button2 } = props;
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show() {
      if (modalRef.current) {
        const bsModal = new bootstrap.Modal(modalRef.current, {
          backdrop: 'static',
          keyboard: false
        });
        bsModal.show();
      }
    }
  }));

  return (
    <div
      ref={modalRef}
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{width: '350px'}}>
        <div className="modal-content pt-md-3">
          <div className="modal-body text-center">
            {content}
          </div>
          <div className={`modal-footer justify-content-${(button1 && button2) ? 'between' : 'center'}`}>
            { button1 && <ButtonModal {...button1} />}
            { button2 && <ButtonModal {...button2} />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
