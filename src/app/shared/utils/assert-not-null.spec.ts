import { assertNotNull } from './assert-not-null';

describe('assertNotNull', () => {
  it('throws an error if the argument is null', () => {
    expect(() => {
      assertNotNull(null);
    }).toThrowError('Argument should not be null');
  });

  it('throws an error if the argument is null', () => {
    expect(() => {
      assertNotNull(1);
    }).not.toThrow();
  });
});
