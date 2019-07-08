/* eslint-disable import/prefer-default-export */

declare module 'victory' {
  export interface VictoryThemeDefinitionLatest extends VictoryThemeDefinition {
    pie?: VictoryThemeDefinition['pie'] & {
      width: number;
      height: number;
      colorScale: string[];
    };
  }
}
