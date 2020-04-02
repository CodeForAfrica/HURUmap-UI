import aggregateData from '../src/utils/aggregateData';

describe('Chart data aggregation', () => {
  it('should sum the data', () => {
    const result = aggregateData('sum', [
      { x: 'one', y: 1 },
      { x: 'two', y: 2 },
      { x: 'three', y: 3 }
    ]);
    console.log(result);
    expect(result[0].y).toBe(6);
  });
});
