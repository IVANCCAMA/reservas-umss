import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import Notification, { ButtonNotification } from './Notification';
import { useNavigate } from 'react-router-dom';
import iconoError from '../../assets/Images/iconoError.png';
import iconoExito from '../../assets/Images/iconoExito.png';
import iconInfo from '../../assets/Images/alert-information.png';

// Crea el contexto sin tipo definido y con valor inicial undefined
const NotificationContext = createContext(undefined);

// Hook para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  /**
   * Create a new notification.
   *
   * @param {Object} options
   * @param {string} options.style - The style of notification (e.g., 'primary', 'danger').
   * @param {React.ReactNode} options.body - The body content of the notification.
   * @param {boolean} [options.disableFullscreen=false] - Whether to disable fullscreen mode.
   * @param {number} [options.timeout=2000] - The timeout in milliseconds before the notification automatically closes.
   * @param {function} [options.onTimeout=() => {}] - The callback function to be called when the notification times out.
   * @param {function} [options.afterTimeout=() => {}] - The callback function to be called after the notification is closed.
   */
  const newNotification = ({ style, body, disableFullscreen = false, timeout = 2000, onTimeout = () => { }, afterTimeout = () => { } }) => {
    setNotification({
      style: style,
      disableFullscreen: disableFullscreen,
      body: body
    });

    setTimeout(() => {
      onTimeout();
      setNotification(null);
      afterTimeout();
    }, timeout);
  };

  /**
   * Notification component for displaying confirmation messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body to be displayed inside the Notification.
   * @param {string} [props.onClickYesTo] - URL to redirect when "Yes" button is clicked (optional).
   * @param {string} [props.onClickNoTo] - URL to redirect when "No" button is clicked (optional).
   * @param {Function} [props.onClickYes] - Function to execute when "Yes" button is clicked (optional).
   * @param {Function} [props.onClickNo] - Function to execute when "No" button is clicked (optional).
   */
  const loadNotification = ({ message, timeout = 2000, callback = () => { }, onClose = () => { } }) => {
    const body = <>
      <Icon className="iconAlert" icon="zondicons:information-outline" style={{ color: '#0D6EFD' }} />
      <div className="ps-3">{message}</div>
      <div className="spinner-border spinner-border-sm ms-4" role="status" />
    </>;
    newNotification({ style: 'primary', body, callback, onClose });
    
  };

  /**
   * Notification component for displaying error messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body to be displayed inside the Notification.
   * @param {string} [props.onClickTo] - URL to redirect when the button is clicked (optional).
   * @param {Function} [props.onClick] - Function to execute when the button is clicked (optional).
   */
  const errorNotification = ({ body, onClickTo = '', onClick = () => { } }) => {
    const button1 = {
      style: 'danger',
      body: <p className="mx-4 my-auto">Aceptar</p>,
      onClick: onClick
    };
    newNotification(body, button1, onClickTo);
  };

  /**
   * Notification component for displaying success messages.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body to be displayed inside the Notification.
   * @param {string} [props.onClickTo] - URL to redirect when the button is clicked (optional).
   * @param {Function} [props.onClick] - Function to execute when the button is clicked (optional).
   */
  const successNotification = ({ body, onClickTo = '', onClick = () => { } }) => {
    const button1 = {
      style: 'success',
      body: <p className="mx-4 my-auto">Aceptar</p>,
      onClick: onClick
    };
    newNotification(body, button1, onClickTo);
  };

  return (
    <NotificationContext.Provider value={{ newNotification, loadNotification, errorNotification, successNotification }}>
      {children}
      {notification && <Notification {...notification} />}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
