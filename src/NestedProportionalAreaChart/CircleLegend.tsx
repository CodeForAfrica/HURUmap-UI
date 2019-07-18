import React, { Fragment } from 'react';
import { VictoryLine, VictoryLabel } from 'victory';

function CircleLegend() {
  return (
    <Fragment>
      <div style={{ position: 'absolute', zIndex: 1, right: '35rem' }}>
        <VictoryLine
          width={350}
          height={350}
          y={() => 200}
          style={{
            data: { stroke: 'green' }
          }}
        />
        <div style={{ position: 'absolute', top: '10rem', left: '-6rem' }}>
          <VictoryLabel
            text="2,300,000"
            textAnchor="middle"
            style={{ fontSize: '35', color: 'green' }}
          />
          <br />
          <VictoryLabel
            text="people"
            textAnchor="middle"
            style={{ fontSize: '20' }}
          />
        </div>
        <div style={{ position: 'absolute', left: '35rem', width: '25%' }}>
          <VictoryLabel
            text="1300000 in tanzania"
            textAnchor="middle"
            x={200}
            y={200}
            style={{ fontSize: '20', color: 'grey' }}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default CircleLegend;
