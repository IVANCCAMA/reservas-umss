import React, { useState, useEffect } from 'react';

function Reloj() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="text-center my-3 card col-md-6">
        <h2>{currentTime.toLocaleDateString()}</h2>
        <h3>{currentTime.toLocaleTimeString()}</h3>
      </div>
    </div>
  );
}

export default Reloj;
