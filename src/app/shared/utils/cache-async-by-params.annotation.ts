/**
 * Cache annotation for methods that return a promise.
 * Note, this only works for idempotent methods, where the result is the same for the same parameters.
 * It caches the result based on the method name and parameters.
 */
export const CacheAsyncByParams: () => MethodDecorator =
  <T, Result = unknown>() =>
  (
    _target: T,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const cacheByRequestUri = new Map<string, Result[]>();
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const cacheKey = `${String(propertyKey)}-${JSON.stringify(args)}`;
      if (cacheByRequestUri.has(cacheKey)) {
        return cacheByRequestUri.get(cacheKey)!;
      }
      const result = await originalMethod.apply(this, args);
      cacheByRequestUri.set(cacheKey, result);
      return result;
    };
  };
