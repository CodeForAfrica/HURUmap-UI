import React from 'react';
import { VictoryCommonProps } from 'victory';
export default function withVictoryTheme<P>(C: React.ComponentType<P & VictoryCommonProps>): ({ ...props }: P) => JSX.Element;
