type ConsoleMethods = 'debug' | 'error' | 'info' | 'log';
/**
 * Adds logs to the console when a method is called.
 */
export const LogAsyncMethod: (
  level: ConsoleMethods,
  enabled?: boolean,
) => MethodDecorator =
  <T, Result = unknown>(level: ConsoleMethods, enabled = true) =>
  (target: T, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (!enabled) {
      return;
    }
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]): Promise<Result> {
      const logPrefix = `LogAsyncMethod/${String((target as object).constructor.name)}.${String(propertyKey)}`;
      console[level](`${logPrefix}->call: ${String(propertyKey)}`, ...args);
      const result = await originalMethod.apply(this, args);
      console[level](`${logPrefix}->result:`, ...args, result);
      return result;
    };
  };
