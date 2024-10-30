import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScanner = ({ open, onScan, onError }) => {
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanSuccess(true);
      onScan(data);
    }
  };

  const handleError = (error) => {
    setScanSuccess(false);
    onError(error);
  };

  return (
    <div className={`${!open ? "hidden" : ""}`}>
      {open && (
        <Scanner 
          onScan={handleScan} 
          onError={handleError}
          scanDelay={2000}
          allowMultiple={true}
        />
      )}
    </div>
  );
};

export default QrScanner;
