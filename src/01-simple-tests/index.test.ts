import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
   const result = simpleCalculator({ a: 2, b: 7, action: Action.Add})

   expect(result).toBe(9)
  });

  test('should subtract two numbers', () => {   
   const result = simpleCalculator({ a: 7, b: 2, action: Action.Subtract})

   expect(result).toBe(5)
  });

  test('should multiply two numbers', () => {
   const result = simpleCalculator({ a: 2, b: 7, action: Action.Multiply})

   expect(result).toBe(14)
  });

  test('should divide two numbers', () => {  
   const result = simpleCalculator({ a: 6, b: 2, action: Action.Divide})

   expect(result).toBe(3)
  });

  test('should exponentiate two numbers', () => {    
   const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate})

   expect(result).toBe(8)
  });

  test('should return null for invalid action', () => {    
   const result = simpleCalculator( { a: 2, b: 7, action: 'Invalid action'})

   expect(result).toBeNull()
  });

  test.each([
    { a: '2', b: 7, action: Action.Add },
    { a: 2, b: '7', action: Action.Add },
  ])('should return null for invalid arguments', (input) => {
   const result = simpleCalculator(input)

   expect(result).toBeNull()
  });
});
