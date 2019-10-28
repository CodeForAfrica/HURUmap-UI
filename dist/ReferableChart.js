import Chart from './Chart';
export var toReferenceProps = function toReferenceProps(ref) {
  return Array.isArray(ref) ? {
    data: ref
  } : ref;
};
export default Chart;