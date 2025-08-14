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
      const logPrefix = `LogMethod/${String((target as object).constructor.name)}.${String(propertyKey)}`;
      console.group(logPrefix);
      console[level](`${logPrefix}->call: ${String(propertyKey)}`, ...args);
      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        console.warn(
          `${logPrefix}: should not return a Promise. Use LogAsyncMethod instead.`,
        );
      }

      console[level](`${logPrefix}->result:`, ...args, result);
      console.groupEnd();
      return result;
    };
  };
