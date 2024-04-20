import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import Modal, { ButtonModal } from './Modal';
import { useNavigate } from 'react-router-dom';
import iconoError from '../../assets/Images/iconoError.png';
import iconoExito from '../../assets/Images/iconoExito.png';

// Crea el contexto sin tipo definido y con valor inicial undefined
const ModalContext = createContext(undefined);

// Hook para usar el contexto
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [modal, setModal] = useState(null);
  useEffect(() => {
    modalRef.current?.show();
  }, [modal]);

  /**
   * Modal component that can be controlled externally via ref.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.content - The content to be displayed inside the modal.
   * @param {ButtonModal} props.button1 - Props for the first button inside the modal.
   * @param {ButtonModal} [props.button2] - Props for the second button inside the modal (optional).
   */
  const showModal = ({ content, button1, button2 = undefined }) => {
    setModal({
      ref: modalRef,
      content: content,
      button1: button1,
      button2: button2 ? button2 : undefined
    });
  };

  const createModal = (content, button1, onClickButton1To = '', icon = true, button2 = undefined, onClickButton2To = '') => {
    return {
      content: <>
        <div>
          <img src={icon ? iconoExito : iconoError} />
        </div>
        <div className="pt-md-3">
          {content}
        </div>
      </>,
      button1: {
        ...button1,
        onClick: () => {
          if (button1.onClick) {
            button1.onClick();
          }
          setModal(null);
          if (onClickButton1To) navigate(onClickButton1To);
        }
      },
      button2: button2 ? {
        ...button2,
        onClick: () => {
          if (button2.onClick) {
            button2.onClick();
          }
          setModal(null);
          if (onClickButton2To) navigate(onClickButton2To);
        }
      } : undefined
    };
  };

  /**
   * Modal component for displaying confirmation messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.content - The content to be displayed inside the modal.
   * @param {string} [props.onClickYesTo] - URL to redirect when "Yes" button is clicked (optional).
   * @param {string} [props.onClickNoTo] - URL to redirect when "No" button is clicked (optional).
   * @param {Function} [props.onClickYes] - Function to execute when "Yes" button is clicked (optional).
   * @param {Function} [props.onClickNo] - Function to execute when "No" button is clicked (optional).
   */
  const confirmationModal = ({ content, onClickYesTo = '', onClickNoTo = '', onClickYes = () => { }, onClickNo = () => { } }) => {
    const button1 = {
      type: 'success',
      content: <p className="mx-4 my-auto">Si</p>,
      onClick: onClickYes
    };
    const button2 = {
      type: 'danger',
      content: <p className="mx-4 my-auto">No</p>,
      onClick: onClickNo
    };
    showModal(createModal(content, button1, onClickYesTo, false, button2, onClickNoTo));
  };

  /**
   * Modal component for displaying error messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.content - The content to be displayed inside the modal.
   * @param {string} [props.onClickTo] - URL to redirect when the button is clicked (optional).
   * @param {Function} [props.onClick] - Function to execute when the button is clicked (optional).
   */
  const errorModal = ({ content, onClickTo = '', onClick = () => { } }) => {
    const button1 = {
      type: 'danger',
      content: <p className="mx-4 my-auto">Aceptar</p>,
      onClick: onClick
    };
    showModal(createModal(content, button1, onClickTo, false));
  };

  /**
   * Modal component for displaying success messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.content - The content to be displayed inside the modal.
   * @param {string} [props.onClickTo] - URL to redirect when the button is clicked (optional).
   * @param {Function} [props.onClick] - Function to execute when the button is clicked (optional).
   */
  const successModal = ({ content, onClickTo = '', onClick = () => { } }) => {
    const button1 = {
      type: 'success',
      content: <p className="mx-4 my-auto">Aceptar</p>,
      onClick: onClick
    };
    showModal(createModal(content, button1, onClickTo));
  };

  return (
    <ModalContext.Provider value={{ showModal, confirmationModal, errorModal, successModal }}>
      {children}
      {modal && <Modal {...modal} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
