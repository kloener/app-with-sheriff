export function assertNotNull<T>(arg: T | undefined | null): asserts arg is T {
  if (arg === null) {
    throw new Error('Argument should not be null');
  }
}
