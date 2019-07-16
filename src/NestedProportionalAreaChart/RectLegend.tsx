import React from 'react';

function RectLegend() {
  return (
    <div>
      <div style={{ height: '4rem', width: '5rem' }}>
        <g
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: '3rem',
            fontSize: '3rem',
            color: 'grey',
            listStyleType: 'none'
          }}
        >
          <li>
            <text style={{ color: 'green' }}>760,000</text>
          </li>
          <li>
            <text style={{ color: 'orange' }}>679,000</text>
          </li>
        </g>
      </div>

      <g
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '32.5rem',
          left: '3rem',
          fontSize: '1rem',
          color: 'grey'
        }}
      >
        <text>
          47.9m
          <br />
          Tanzania
        </text>
      </g>
    </div>
  );
}

export default RectLegend;
