export type BackendJson = string | number | boolean | null | BackendJson[] | { [k: string]: BackendJson } | Date;

export function toBackendJson<T>(value: T): BackendJson {
  const normalize = (v: unknown): BackendJson => {
    if (v === null || v === undefined) return null;

    if (v instanceof Date) return v;

    if (v instanceof Set) return Array.from(v, (x) => normalize(x));

    if (v instanceof Map) {
      return Object.fromEntries(Array.from(v.entries(), ([k, val]) => [String(k), normalize(val)]));
    }

    if (Array.isArray(v)) return v.map((x) => normalize(x));

    if (typeof v === "object") {
      return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, val]) => [k, normalize(val)]));
    }

    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return v;

    return null;
  };

  return normalize(value);
}
