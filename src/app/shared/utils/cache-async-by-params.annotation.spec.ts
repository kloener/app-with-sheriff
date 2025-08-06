import { CacheAsyncByParams } from "./cache-async-by-params.annotation";

describe('CacheAsyncByParams', () => {
  it('should cache async results by method name and params', async () => {
    let counter = 0;

    class TestClass {
      @CacheAsyncByParams()
      async mockMethod(_param: string) { return counter++; };
    }

    const ref = new TestClass();

    expect(await ref.mockMethod('test1')).toBe(0);
    expect(await ref.mockMethod('test1')).toBe(0);
    expect(await ref.mockMethod('test1')).toBe(0);

    expect(await ref.mockMethod('test2')).toBe(1);
    expect(await ref.mockMethod('test2')).toBe(1);
    expect(await ref.mockMethod('test2')).toBe(1);

    expect(counter).toBe(2);
  });
});
