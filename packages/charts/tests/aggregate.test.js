import aggregateData from '../src/utils/aggregateData';

describe('Chart data aggregation', () => {
  describe('Chart single data aggregation', () => {
    const data = [
      { x: 'one', y: 1 },
      { x: 'zero', y: 0 },
      { x: 'two', y: 2 },
      { x: 'three', y: 3 }
    ];
    it('should sum the data', () => {
      const result = aggregateData('sum', data, false);
      expect(result[0].x).toBe('sum');
      expect(result[0].y).toBe(6);
    });
    it('should avg the data', () => {
      const result = aggregateData('avg', data, false);
      expect(result[0].x).toBe('avg');
      expect(result[0].y).toBe(1.5);
    });
    it('should select the first data point', () => {
      const result = aggregateData('first', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe(1);
    });
    it('should select the first:percent data point', () => {
      const result = aggregateData('first:percent', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe((100 * 1) / 6);
    });
    it('should select the last data point', () => {
      const result = aggregateData('last', data, false);
      expect(result[0].x).toBe('three');
      expect(result[0].y).toBe(3);
    });
    it('should select the last:percent data point', () => {
      const result = aggregateData('last:percent', data, false);
      expect(result[0].x).toBe('three');
      expect(result[0].y).toBe((100 * 3) / 6);
    });
    it('should select the max data point', () => {
      const result = aggregateData('max', data, false);
      expect(result[0].y).toBe(3);
    });
    it('should select the min data point', () => {
      const result = aggregateData('min', data, false);
      expect(result[0].y).toBe(0);
    });
  });
  describe('Chart group data aggregation', () => {
    const data = [
      [
        { x: 'one', y: 1 },
        { x: 'zero', y: 0 },
        { x: 'two', y: 2 },
        { x: 'three', y: 3 }
      ],
      [
        { x: 'four', y: 4 },
        { x: 'zero', y: 0 },
        { x: 'five', y: 5 },
        { x: 'six', y: 6 }
      ]
    ];
    it('should sum the group data', () => {
      const result = aggregateData('sum', data, false);
      expect(result[0].x).toBe('sum');
      expect(result[0].y).toBe(21);
    });
    it('should avg the group data', () => {
      const result = aggregateData('avg', data, false);
      expect(result[0].x).toBe('avg');
      expect(result[0].y).toBe(2.625);
    });
    it('should select the first group data point', () => {
      const result = aggregateData('first', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe(1);
    });
    it('should select the first:percent of the first group data point', () => {
      const result = aggregateData('first:percent', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe((100 * 1) / 6);
    });
    it('should select the last group data point', () => {
      const result = aggregateData('last', data, false);
      expect(result[0].x).toBe('six');
      expect(result[0].y).toBe(6);
    });
    it('should select the last:percent of the last group data point', () => {
      const result = aggregateData('last:percent', data, false);
      expect(result[0].x).toBe('six');
      expect(result[0].y).toBe((100 * 6) / 15);
    });
    it('should select the max group data point', () => {
      const result = aggregateData('max', data, false);
      expect(result[0].y).toBe(6);
    });
    it('should select the min group data point', () => {
      const result = aggregateData('min', data, false);
      expect(result[0].y).toBe(0);
    });
  });
});
