import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      backgroundColor: 'rgba(128, 128, 128, 0.3)',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      border: '3px solid rgba(0,0,0,0.1)',
    }}>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100px',
          height: '100px',
          transform: 'rotate(-90deg)',
        }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="green"
          strokeWidth="6"
          fill="none"
          strokeDasharray="70.68 211.2"
          strokeDashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      Loading{dots}
    </div>
  );
};

export default Loader;
