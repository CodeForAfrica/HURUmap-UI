/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */

declare module 'victory' {
  import * as React from 'react';

  export interface VictoryThemeDefinitionLatest extends VictoryThemeDefinition {
    area?: VictoryThemeDefinition['area'] & {
      height: number;
      padding:
        | number
        | { top: number; bottom: number; left: number; right: number };
      style: VictoryStyleInterface;
      width: number;
    };
    pie?: VictoryThemeDefinition['pie'] & {
      colorScale: string[];
      height: number;
      padding:
        | number
        | { top: number; bottom: number; left: number; right: number };
      width: number;
    };
    proportionalArea?: {
      colorScale: string[];
      height: number;
      padding:
        | number
        | { top: number; bottom: number; left: number; right: number };
      style: VictoryStyleInterface;
      width: number;
    };
    group: {
      colorScale: ColorScalePropType;
    }
  }

  export interface CircleProps {
    className?: string;
    clipPath?: string;
    cx?: number;
    cy?: number;
    events?: React.DOMAttributes<any>;
    r?: number;
    role?: string;
    shapeRendering?: string;
    style?: VictoryStyleObject;
    transform?: string;
  }

  export class Circle extends React.Component<CircleProps, any> {}

  export interface RectProps {
    className?: string;
    clipPath?: string;
    events?: React.DOMAttributes<any>;
    height?: number;
    role?: string;
    rx?: number;
    ry?: number;
    shapeRendering?: string;
    style?: VictoryStyleObject;
    transform?: string;
    width?: number;
    x?: number;
    y?: number;
  }

  export class Rect extends React.Component<RectProps, any> {}

  export interface VictoryPieProps {
    theme?: VictoryThemeDefinitionLatest;
    origin?: { x: number | undefined; y: number | undefined };
  }
}
