/* eslint-disable prettier/prettier */

function addNumbers(num1, num2) {
  return num1 + num2;
}

// describe('Example test', () => {
//   it('equals true', () => {
//     expect(true).toEqual(false);
//   });
// });
describe('addNumbers', () => {
  it('adds two numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
