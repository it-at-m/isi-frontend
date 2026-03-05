export type BackendJson = string | number | boolean | null | BackendJson[] | { [k: string]: BackendJson };

export function toBackendJson<T>(value: T): BackendJson {
  return JSON.parse(
    JSON.stringify(value, (_k, v) => {
      if (v instanceof Set) return Array.from(v);
      if (v instanceof Map) return Object.fromEntries(v);
      return v;
    }),
  ) as BackendJson;
}
