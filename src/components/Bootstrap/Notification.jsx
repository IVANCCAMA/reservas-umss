import React, { useRef } from 'react';

function Notification({ style, body, disableFullscreen = false }) {
  return (
    <div className={`position-fixed col-md-10 vh-100 pb-5 d-flex flex-column-reverse${disableFullscreen ? ' z-n1' : ''}`}>
      <div className="d-flex justify-content-md-end pb-4 pe-3">
        <div className={`alert alert-${style} py-1 d-flex align-items-center`} role="alert">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Notification;
