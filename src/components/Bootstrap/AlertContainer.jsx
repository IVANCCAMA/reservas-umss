import React, { useImperativeHandle, useState } from 'react';
import Alert from './Alert';

const AlertContainer = React.forwardRef((props, ref) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (style, body, onClose) => {
    const key = new Date().getTime();
    setAlerts(currentAlerts => [
      ...currentAlerts,
      { key, style, body, onClose }
    ]);
  };

  const removeAlert = key => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.key !== key));
  };

  const removeAllAlerts = () => {
    setAlerts([]); // Clears all alerts
  };

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    addAlert,
    removeAllAlerts
  }));

  return (
    <>
      {alerts.map(alert => (
        <Alert
          key={alert.key}
          style={alert.style}
          body={alert.body}
          onClose={() => {
            alert.onClose?.();
            removeAlert(alert.key);
          }}
        />
      ))}
    </>
  );
});

export default AlertContainer;