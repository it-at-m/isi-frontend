export function toBackendJson<T>(value: T): T {
  const normalize = (v: unknown): unknown => {
    if (v instanceof Date) return v;
    if (v instanceof Set) return Array.from(v, normalize);
    if (v instanceof Map) {
      return Object.fromEntries(Array.from(v.entries(), ([k, val]) => [k, normalize(val)]));
    }
    if (Array.isArray(v)) return v.map(normalize);
    if (v && typeof v === "object") {
      return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, normalize(val)]));
    }
    return v;
  };

  return normalize(value) as T;
}
