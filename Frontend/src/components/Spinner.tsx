import React from 'react';

export const Spinner: React.FC<{ 
  center?: boolean; 
  size?: number; 
  className?: string;
}> = ({
  center = false,
  size = 28,
  className = '',
}) => {
  return (
    <>
      <style>{`
        .spinner-blade {
          position: absolute;
          left: 46.29%;
          bottom: 0;
          width: 7.4%;
          height: 27.77%;
          border-radius: 5.55%;
          background-color: transparent;
          transform-origin: center -22.22%;
          animation: spinner-fade9234 1s infinite linear;
        }

        .spinner-blade:nth-child(1) { animation-delay: 0s; transform: rotate(0deg); }
        .spinner-blade:nth-child(2) { animation-delay: 0.083s; transform: rotate(30deg); }
        .spinner-blade:nth-child(3) { animation-delay: 0.166s; transform: rotate(60deg); }
        .spinner-blade:nth-child(4) { animation-delay: 0.249s; transform: rotate(90deg); }
        .spinner-blade:nth-child(5) { animation-delay: 0.332s; transform: rotate(120deg); }
        .spinner-blade:nth-child(6) { animation-delay: 0.415s; transform: rotate(150deg); }
        .spinner-blade:nth-child(7) { animation-delay: 0.498s; transform: rotate(180deg); }
        .spinner-blade:nth-child(8) { animation-delay: 0.581s; transform: rotate(210deg); }
        .spinner-blade:nth-child(9) { animation-delay: 0.664s; transform: rotate(240deg); }
        .spinner-blade:nth-child(10) { animation-delay: 0.747s; transform: rotate(270deg); }
        .spinner-blade:nth-child(11) { animation-delay: 0.83s; transform: rotate(300deg); }
        .spinner-blade:nth-child(12) { animation-delay: 0.913s; transform: rotate(330deg); }

        @keyframes spinner-fade9234 {
          0% { background-color: #69717d; }
          100% { background-color: transparent; }
        }
      `}</style>
      <div
        className={`relative inline-block ${center ? 'absolute inset-0 m-auto' : ''} ${className}`}
        style={{ fontSize: `${size}px`, width: '1em', height: '1em' }}
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label="Loading"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="spinner-blade" />
        ))}
      </div>
    </>
  );
};
