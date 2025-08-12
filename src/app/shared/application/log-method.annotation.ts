type ConsoleMethods = 'debug' | 'error' | 'info' | 'log';
/**
 * Adds logs to the console when a method is called.
 */
export const LogMethod: (
  level: ConsoleMethods,
  enabled?: boolean,
) => MethodDecorator =
  <T, Result = unknown>(level: ConsoleMethods, enabled = true) =>
  (target: T, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (!enabled) {
      return;
    }
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]): Result {
      console.group(
        `LogMethod/${String((target as object).constructor.name)}.${String(propertyKey)}`,
      );
      console[level](`LogMethod call: ${String(propertyKey)}`, ...args);
      const result = originalMethod.apply(this, args);
      console[level](`LogMethod result:`, result);
      console.groupEnd();
      return result;
    };
  };
