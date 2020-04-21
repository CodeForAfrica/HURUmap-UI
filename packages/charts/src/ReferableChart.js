import Chart from "./Chart";

export const toReferenceProps = (ref) => {
  return Array.isArray(ref) ? { data: ref } : ref;
};

export default Chart;
