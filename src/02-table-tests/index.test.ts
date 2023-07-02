import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 6, b: 2, action: Action.Subtract, expected: 4 },
    { a: 6, b: 3, action: Action.Subtract, expected: 3 },
    { a: 9, b: 8, action: Action.Subtract, expected: 1 },
    { a: 7, b: 8, action: Action.Multiply, expected: 56 },
    { a: 7, b: 1, action: Action.Multiply, expected: 7 },
    { a: 6, b: 8, action: Action.Multiply, expected: 48 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 3, b: 2, action: 'Invalid action', expected: null },
    { a: 3, b: 2, action: null, expected: null },
    { a: 3, b: 2, action: 12, expected: null },
    { a: '3', b: 2, action: Action.Add, expected: null },
    { a: 3, b: '2', action: Action.Add, expected: null },
    { a: '3', b: '2', action: Action.Add, expected: null },
    { a: undefined, b: '2', action: Action.Add, expected: null },
    { a: '3', b: null, action: Action.Add, expected: null },
    { a: 3, b: {}, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should work properly: $a $action $b return $expected', ({ expected, ...input }) => {
    const result = simpleCalculator(input);

    expect(result).toBe(expected);
  });
});
