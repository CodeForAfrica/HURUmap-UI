/// <reference types="react" />
import { VictoryLabelProps } from 'victory';
interface Props extends VictoryLabelProps {
    width: number;
}
declare function WrapLabel({ width, text, x, y, style, transform, textAnchor }: Props): JSX.Element;
export default WrapLabel;
