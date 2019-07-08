const DEFAULT_SIZE = 200;

export default function calculateProportions(
  data: number[],
  size: number = DEFAULT_SIZE
): number[] {
  const [total] = data;
  return data.map((value, index) =>
    index === 0 ? size : (value * size) / total
  );
}
