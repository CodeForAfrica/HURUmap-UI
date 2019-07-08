const DEFAULT_SIZE = 200;

export default function calculateProportions(
  data: number[],
  size: number = DEFAULT_SIZE
): number[] {
  const [total, data1, data2] = data;
  const r1 = (data1 * size) / total;
  const r2 = data2 ? (data2 * size) / total : 0;

  return [size, r1, r2];
}
