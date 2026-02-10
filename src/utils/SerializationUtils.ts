export function toBackendJson<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_k, v) => {
      if (v instanceof Set) return Array.from(v);
      if (v instanceof Map) return Object.fromEntries(v);
      return v;
    }),
  );
}
