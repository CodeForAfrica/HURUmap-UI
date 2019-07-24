import React, { Fragment } from 'react';
import {
  VictoryLine,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabel,
  VictoryMultiLabeableProps,
  VictoryThemeDefinitionLatest
} from 'victory';

import { toReferenceProps, ReferableChartProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps,
    ReferableChartProps<number> {
  square?: boolean;
  groupSpacing?: number;
}

/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */
function NestedProportionalAreaChart({
  groupSpacing,
  width,
  height,
  theme,
  data,
  reference: ref,
  square = false
}: Props) {
  const {
    proportionalArea: chart
  } = (theme as unknown) as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }

  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );
  const computedHeight = height || chart.height;
  const computedWidth = width || chart.width;
  console.log(computedWidth);
  const computedGroupSpacing =
    data.length > 1 ? groupSpacing || chart.groupSpacing : 0;

  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  const chartHeight = computedHeight - (data.length * 36 + 48 + 20);
  const minDimension = Math.min(chartHeight, computedWidth);

  const dataLabelStyles = (index: number): React.CSSProperties => ({
    fontSize: 36,
    fontWeight: 'bold',
    fill: chart.colorScale[index % chart.colorScale.length]
  });

  const referenceLabelStyles = (index: number): React.CSSProperties =>
    Object.assign({}, reference.style.labels, {
      fontWeight: index === 0 ? 'bold' : 'normal',
      color: 'grey'
    }) as React.CSSProperties;

  return (
    <Fragment>
      {/* Get the victoryLine and labels on the charts as an overlay */}
      {!square
        ? (() => {
            if (typeof computedWidth !== 'undefined' && computedWidth >= 600) {
              return (
                <div>
                  <svg
                    style={{
                      position: 'absolute',
                      zIndex: 1
                    }}
                    height={chartHeight}
                    width={computedWidth}
                  >
                    <g>
                      {data.map((d, i) => (
                        <VictoryLabel
                          capHeight={0}
                          lineHeight={0}
                          x={computedWidth / 2}
                          y={data.length * 36 + 10 + chartHeight / 2}
                          dx={-computedWidth / 2}
                          dy={-i * 24}
                          text={data[i]}
                          style={dataLabelStyles(i)}
                        />
                      ))}
                    </g>
                  </svg>

                  <g
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: '2rem',
                      margin: '4rem'
                      // marginLeft: '-6.5rem'
                    }}
                  >
                    <VictoryLine
                      width={computedWidth / 2}
                      y={() => data.length * 36 + 10 + chartHeight / 2}
                      style={{
                        data: { stroke: 'rgb(244, 81, 30)' }
                      }}
                    />
                  </g>

                  <g
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      right: 0,
                      top: '20rem',
                      marginRight: '15rem'
                    }}
                  >
                    <VictoryLabel
                      capHeight={0}
                      lineHeight={0}
                      x={(computedWidth - minDimension) / 2}
                      y={computedHeight - 24}
                      text={reference.data[0]}
                      style={referenceLabelStyles(0)}
                    />
                    <br />
                    <VictoryLabel
                      capHeight={0}
                      lineHeight={0}
                      x={(computedWidth - minDimension) / 4}
                      y={computedHeight}
                      text="Tanzania"
                      style={referenceLabelStyles(1)}
                    />
                  </g>
                </div>
              );
            }
            return <g />;
          })()
        : null}
      {/* Main csvg component */}
      <CustomContainer height={computedHeight} width={computedWidth}>
        <defs>
          <pattern
            id="gradient-background"
            patternUnits="userSpaceOnUse"
            width="5.5"
            height="5.5"
            patternTransform="rotate(135)"
          >
            <line
              x1="0"
              y="0"
              x2="0"
              y2="5.5"
              stroke="#C4C4C4"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Returns the legend values of square charts */}
        {square ? (
          <g>
            {data.map((d, i) => (
              <VictoryLabel
                capHeight={0}
                lineHeight={0}
                x={(computedWidth - minDimension) / 2}
                dx={0}
                y={36}
                text={data[i]}
                style={dataLabelStyles(i)}
                dy={i * 36}
              />
            ))}
          </g>
        ) : null}

        {(() => {
          if (typeof computedWidth !== 'undefined' && computedWidth >= 600) {
            return <g />;
          }
          return (
            <g>
              {data.map((d, i) => (
                <VictoryLabel
                  capHeight={0}
                  lineHeight={0}
                  x={(computedWidth - minDimension) / 2}
                  dx={0}
                  y={36}
                  text={data[i]}
                  style={dataLabelStyles(i)}
                  dy={i * 36}
                />
              ))}
            </g>
          );
        })()}

        {square ? (
          <ScaledSquare
            colorScale={chart.colorScale}
            reference={reference}
            sides={data}
            size={minDimension}
            x={(computedWidth - minDimension) / 2}
            y={data.length * 36 + 10}
          />
        ) : (
          <ScaledCircle
            colorScale={chart.colorScale}
            cx={computedWidth / 2}
            cy={data.length * 36 + 10 + chartHeight / 2}
            groupSpacing={computedGroupSpacing}
            reference={reference}
            radii={data}
            size={minDimension / 2 - computedGroupSpacing}
            theme={(theme as unknown) as VictoryThemeDefinitionLatest}
            height={chartHeight}
            width={computedWidth}
            labels={() => ''}
          />
        )}

        {/* Return value of square charts legends (reference styles) */}
        {square ? (
          <g>
            <VictoryLabel
              capHeight={0}
              lineHeight={0}
              x={(computedWidth - minDimension) / 2}
              y={computedHeight - 24}
              text={reference.data[0]}
              style={referenceLabelStyles(0)}
            />
            <VictoryLabel
              capHeight={0}
              lineHeight={0}
              x={(computedWidth - minDimension) / 2}
              y={computedHeight}
              text="Tanzania"
              style={referenceLabelStyles(1)}
            />
          </g>
        ) : null}

        {/* Handle values for victory labels circle(data styles) */}
        {(() => {
          if (typeof computedWidth !== 'undefined' && computedWidth >= 600) {
            return <g />;
          }
          return (
            <g>
              <VictoryLabel
                capHeight={0}
                lineHeight={0}
                x={(computedWidth - minDimension) / 2}
                y={computedHeight - 24}
                text={reference.data[0]}
                style={referenceLabelStyles(0)}
              />
              <VictoryLabel
                capHeight={0}
                lineHeight={0}
                x={(computedWidth - minDimension) / 2}
                y={computedHeight}
                text="Tanzania"
                style={referenceLabelStyles(1)}
              />
            </g>
          );
        })()}
      </CustomContainer>
    </Fragment>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
