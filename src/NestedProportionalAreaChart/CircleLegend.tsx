import React from 'react';

function CircleLegend() {
  return (
    <div>
      <g
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '14rem',
          left: '-8rem'
        }}
      >
        <text>
          <span style={{ fontSize: '3rem', color: '#7f9442' }}>2.1m</span>
          <br />
          <span>people</span>
        </text>
      </g>
      <g
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '14rem',
          left: '35rem'
        }}
      >
        <text>
          <span style={{ fontSize: '3rem', color: '#de9f3a' }}>2.3m</span>
          <br />
          <span>people</span>
        </text>
      </g>

      <g
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '25rem',
          left: '35rem',
          fontSize: '1.5rem',
          color: 'grey'
        }}
      >
        <text>
          47.9m
          <br />
          Tanzania
        </text>
      </g>
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0
        }}
      >
        <line
          x1="0"
          y1="250"
          x2="160"
          y2="250"
          stroke="#7f9442"
          strokeWidth="2"
        />
        <line
          x1="340"
          y1="250"
          x2="500"
          y2="250"
          stroke="#de9f3a"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default CircleLegend;
