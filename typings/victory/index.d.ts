/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */

declare module 'victory' {
  import * as React from 'react';

  export interface HelpersProps {
    getRadius: (props: VictoryCommonProps) => number;
    getPadding: (padding: PaddingProps) => BlockProps;
  }

  export const Helpers: HelpersProps;

  export interface VictoryThemeDefinitionLatest extends VictoryThemeDefinition {
    breakpoints: {
      mobile: number;
    };
    area?: VictoryThemeDefinition['area'] & {
      height: number;
      padding: PaddingProps;
      style: VictoryStyleInterface;
      width: number;
    };
    bullet?: {
      colorScale: string[];
      height: number;
      padding: PaddingProps;
      reference: VictoryStyleInterface;
      style: VictoryStyleInterface;
      width: number;
    };
    comparisonBar?: {
      colorScale: ColorScalePropType;
      reference: VictoryStyleInterface;
    };
    pie?: VictoryThemeDefinition['pie'] & {
      donut: boolean;
      colorScale: string[];
      groupSpacing: number;
      height: number;
      padding: PaddingProps;
      width: number;
    };
    proportionalArea?: {
      colorScale: string[];
      groupSpacing: number;
      height: number;
      padding: PaddingProps;
      reference: VictoryStyleInterface;
      style: VictoryStyleInterface;
      width: number;
    };
    group: {
      colorScale: ColorScalePropType;
    };
    axis: {
      style: VictoryThemeDefinition['axis'];
    };
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

  export interface VictoryChartProps {
    theme?: VictoryThemeDefinitionLatest | VictoryThemeDefinition;
  }
}
