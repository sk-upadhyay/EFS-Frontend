import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [activeOrb, setActiveOrb] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    
    const orbInterval = setInterval(() => {
      setActiveOrb(prev => (prev + 1) % 3);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    return () => {
      clearInterval(orbInterval);
      clearInterval(progressInterval);
    };
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
      zIndex: 1000,
    }}>
      
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid rgba(74, 222, 128, 0.2)',
          borderRadius: '50%',
          borderTopColor: '#4ade80',
          animation: 'rotate 1.5s linear infinite',
        }}></div>

        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: i === activeOrb ? '#3b82f6' : '#93c5fd',
              transform: `rotate(${i * 120}deg) translate(50px) rotate(-${i * 120}deg)`,
              opacity: i === activeOrb ? 1 : 0.6,
              transition: 'all 0.3s ease',
              boxShadow: i === activeOrb ? '0 0 10px #3b82f6' : 'none',
            }}
          />
        ))}

        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#f8fafc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 2,
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '2px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              animation: 'pulse 1.5s infinite',
            }}></div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
      }}>
        Loading {progress}%
      </div>

      <div style={{
        width: '180px',
        height: '6px',
        backgroundColor: '#e2e8f0',
        borderRadius: '3px',
        marginTop: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#3b82f6',
          borderRadius: '3px',
          transition: 'width 0.1s ease',
        }}></div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;