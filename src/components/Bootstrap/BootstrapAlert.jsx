import React, { useRef } from 'react';

function BootstrapAlert({ type, body, onClose }) {
  const alertRef = useRef(null);

  const handleCloseClick = () => {
   onClose?.();
    try {
      const bsAlert = new window.bootstrap.Alert(alertRef.current);
      bsAlert.close();
    } catch (e) {
      console.error("Error closing alert with Bootstrap's JS:", e);
    }
  };

  return (
    <div ref={alertRef} className={`mb-1 px-3 py-1 alert alert-${type} alert-dismissible fade show`} role="alert">
      {body}
      <button
        type="button"
        className="pe-1 py-2 btn-close"
        onClick={handleCloseClick}
        aria-label="Close"
      />
    </div>
  );
}

export default BootstrapAlert;
