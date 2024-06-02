import React, { createContext, useContext, useState } from 'react';
import Notification from './Notification';
import { Icon } from '@iconify/react';

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
  const [notification, setNotification] = useState(null);

  /**
   * Create a new notification.
   *
   * @param {Object} props
   * @param {string} [props.style] - The style of notification (e.g., 'primary', 'danger').
   * @param {React.ReactNode} props.body - The body content of the notification.
   * @param {boolean} [props.disableFullscreen=false] - Whether to disable fullscreen mode.
   * @param {number} [props.timeout=2000] - The timeout in milliseconds before the notification automatically closes.
   * @param {function} [props.onTimeout=() => {}] - The callback function to be called when the notification times out.
   * @param {function} [props.afterTimeout=() => {}] - The callback function to be called after the notification is closed.
   */
  const createNotification = ({
    style = 'primary',
    body,
    disableFullscreen = false,
    timeout = 2000,
    onTimeout = () => {},
    afterTimeout = () => {},
  }) => {
    setNotification({
      style,
      disableFullscreen,
      body,
    });

    setTimeout(async () => {
      await onTimeout();
      setNotification(null);
      afterTimeout();
    }, timeout);
  };

  /**
   * Create a new notification with a spinner.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body content of the notification.
   * @param {boolean} [props.disableFullscreen=false] - Whether to disable fullscreen mode.
   * @param {number} [props.timeout=2000] - The timeout in milliseconds before the notification automatically closes.
   * @param {function} [props.onTimeout=() => {}] - The callback function to be called when the notification times out.
   * @param {function} [props.afterTimeout=() => {}] - The callback function to be called after the notification is closed.
   */
  const loadNotification = ({
    body,
    disableFullscreen = false,
    timeout = 2000,
    onTimeout = () => {},
    afterTimeout = () => {},
  }) => {
    const messageBody = (
      <>
        <Icon
          className="iconAlert"
          icon="zondicons:information-outline"
          style={{ color: '#0D6EFD' }}
        />
        <div className="ps-3">{body}</div>
        <div className="spinner-border spinner-border-sm ms-4" role="status" />
      </>
    );
    createNotification({ body: messageBody, disableFullscreen, timeout, onTimeout, afterTimeout });
  };

  /**
   * Create a new error notification.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body content of the notification.
   * @param {boolean} [props.disableFullscreen=false] - Whether to disable fullscreen mode.
   * @param {number} [props.timeout=2000] - The timeout in milliseconds before the notification automatically closes.
   * @param {function} [props.onTimeout=() => {}] - The callback function to be called when the notification times out.
   * @param {function} [props.afterTimeout=() => {}] - The callback function to be called after the notification is closed.
   */
  const errorNotification = ({
    body,
    disableFullscreen = false,
    timeout = 2000,
    onTimeout = () => {},
    afterTimeout = () => {},
  }) => {
    const messageBody = (
      <>
        <Icon className="iconAlert" icon="charm:circle-cross" style={{ color: '#FF3B20' }} />
        <div className="ps-3">{body}</div>
      </>
    );
    createNotification({
      style: 'danger',
      body: messageBody,
      disableFullscreen,
      timeout,
      onTimeout,
      afterTimeout,
    });
  };

  /**
   * Create a new success notification.
   *
   * @param {Object} props
   * @param {React.ReactNode} props.body - The body content of the notification.
   * @param {boolean} [props.disableFullscreen=false] - Whether to disable fullscreen mode.
   * @param {number} [props.timeout=2000] - The timeout in milliseconds before the notification automatically closes.
   * @param {function} [props.onTimeout=() => {}] - The callback function to be called when the notification times out.
   * @param {function} [props.afterTimeout=() => {}] - The callback function to be called after the notification is closed.
   */
  const successNotification = ({
    body,
    disableFullscreen = false,
    timeout = 2000,
    onTimeout = () => {},
    afterTimeout = () => {},
  }) => {
    const messageBody = (
      <>
        <Icon className="iconAlert" icon="fa-regular:check-circle" style={{ color: '#0FA958' }} />
        <span className="fs-6 ps-3">{body}</span>
      </>
    );
    createNotification({
      style: 'success',
      body: messageBody,
      disableFullscreen,
      timeout,
      onTimeout,
      afterTimeout,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ createNotification, loadNotification, errorNotification, successNotification }}
    >
      {notification && <Notification {...notification} />}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
