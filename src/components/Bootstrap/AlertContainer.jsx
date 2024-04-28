import React, { useImperativeHandle, useState } from 'react';
import BootstrapAlert from './BootstrapAlert';

const AlertContainer = React.forwardRef((props, ref) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, body, onClose) => {
    const key = new Date().getTime();
    setAlerts(currentAlerts => [
      ...currentAlerts,
      { key, type, body, onClose }
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
        <BootstrapAlert
          key={alert.key}
          type={alert.type}
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