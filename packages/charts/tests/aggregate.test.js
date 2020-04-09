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
      expect(result[0].x).toBe('Sum');
      expect(result[0].y).toBe(6);
    });
    it('should avg the data', () => {
      const result = aggregateData('avg', data, false);
      expect(result[0].x).toBe('Avg');
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
    it('should select the max:percent data point', () => {
      const result = aggregateData('max:percent', data, false);
      expect(result[0].y).toBe((100 * 3) / 6);
    });
    it('should select the min:percent data point', () => {
      const result = aggregateData('min:percent', data, false);
      expect(result[0].y).toBe(0);
    });
    it('should convert values to percent', () => {
      const result = aggregateData(':percent', data, false);
      expect(result.length).toBe(4);
      expect(result[0].y).toBe((100 * 1) / 6);
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
      let result = aggregateData('sum', data, false);
      expect(result[0].x).toBe('Sum');
      expect(result[0].y).toBe(21);

      result = aggregateData('sum', data, true);
      expect(result[0][0].x).toBe('Sum');
      expect(result[0][0].y).toBe(6);
      expect(result[1][0].x).toBe('Sum');
      expect(result[1][0].y).toBe(15);
    });
    it('should avg the group data', () => {
      let result = aggregateData('avg', data, false);
      expect(result[0].x).toBe('Avg');
      expect(result[0].y).toBe(2.625);

      result = aggregateData('avg', data, true);
      expect(result[0][0].x).toBe('Avg');
      expect(result[0][0].y).toBe(6 / 4);
      expect(result[1][0].x).toBe('Avg');
      expect(result[1][0].y).toBe(15 / 4);
    });
    it('should select the first group data point', () => {
      let result = aggregateData('first', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe(1);
      result = aggregateData('first', data, true);
      expect(result[0][0].x).toBe('one');
      expect(result[0][0].y).toBe(1);
      expect(result[1][0].x).toBe('four');
      expect(result[1][0].y).toBe(4);
    });
    it('should select the first:percent of the first group data point', () => {
      let result = aggregateData('first:percent', data, false);
      expect(result[0].x).toBe('one');
      expect(result[0].y).toBe((100 * 1) / 21);
      result = aggregateData('first:percent', data, true);
      expect(result[0][0].x).toBe('one');
      expect(result[0][0].y).toBe((100 * 1) / 6);
      expect(result[1][0].x).toBe('four');
      expect(result[1][0].y).toBe((100 * 4) / 15);
    });
    it('should select the last group data point', () => {
      let result = aggregateData('last', data, false);
      expect(result[0].x).toBe('six');
      expect(result[0].y).toBe(6);
      result = aggregateData('last', data, true);
      expect(result[0][0].x).toBe('three');
      expect(result[0][0].y).toBe(3);
      expect(result[1][0].x).toBe('six');
      expect(result[1][0].y).toBe(6);
    });
    it('should select the last:percent of the last group data point', () => {
      let result = aggregateData('last:percent', data, false);
      expect(result[0].x).toBe('six');
      expect(result[0].y).toBe((100 * 6) / 21);
      result = aggregateData('last:percent', data, true);
      expect(result[0][0].x).toBe('three');
      expect(result[0][0].y).toBe((100 * 3) / 6);
      expect(result[1][0].x).toBe('six');
      expect(result[1][0].y).toBe((100 * 6) / 15);
    });
    it('should select the max group data point', () => {
      const result = aggregateData('max', data, false);
      expect(result[0].y).toBe(6);
    });
    it('should select the min group data point', () => {
      const result = aggregateData('min', data, false);
      expect(result[0].y).toBe(0);
    });
    it('should select the max:percent group data point', () => {
      let result = aggregateData('max:percent', data, false);
      expect(result[0].y).toBe((100 * 6) / 21);
      result = aggregateData('max:percent', data, true);
      expect(result[0][0].y).toBe((100 * 3) / 6);
      expect(result[1][0].y).toBe((100 * 6) / 15);
    });
    it('should select the min:percent group data point', () => {
      const result = aggregateData('min:percent', data, false);
      expect(result[0].y).toBe(0);
    });
    it('should convert values to percent per group', () => {
      const result = aggregateData(':percent', data, false);
      expect(result.length).toBe(2);
      expect(result[0][0].y).toBe((100 * 1) / 6);
    });
  });
});
