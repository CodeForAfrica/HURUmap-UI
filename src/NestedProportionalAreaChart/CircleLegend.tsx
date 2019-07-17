import React, { Fragment } from 'react';

interface Props {
  partValue: number | string;
  groupText: string;
  totalValueNumber: number | string;
  totalValueText: string;
}

function CircleLegend({
  partValue,
  groupText,
  totalValueNumber,
  totalValueText
}: Props) {
  return (
    <Fragment>
      <g
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '9.2rem',
          left: '-12rem'
        }}
      >
        <text>
          <span style={{ fontSize: '3rem' }}>{partValue}</span>
          <br />
          <span>{groupText}</span>
        </text>
      </g>
      <g
        style={{
          position: 'absolute',
          top: '18rem',
          left: '25rem',
          zIndex: 1,
          fontSize: '1.5rem',
          width: '100%'
        }}
      >
        <text>
          {totalValueNumber}
          <br />
          {totalValueText}
        </text>
      </g>
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '-4.5rem',
          left: '-4.2rem'
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
      </svg>
    </Fragment>
  );
}

export default CircleLegend;
