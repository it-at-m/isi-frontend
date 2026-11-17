import { afterEach, describe, expect, it, vi } from "vitest";
import { getRuntimeConfigValue } from "@/utils/RuntimeConfig";

describe("RuntimeConfig getRuntimeConfigValue", () => {
  afterEach(() => {
    delete window.__ISI_CONFIG__;
    vi.unstubAllEnvs();
  });

  it("liefert den Wert aus der Laufzeit-Konfiguration", () => {
    vi.stubEnv("VITE_ARCGIS_URL", "https://build.example/{1}");
    window.__ISI_CONFIG__ = { VITE_ARCGIS_URL: "https://laufzeit.example/{1}" };
    expect(getRuntimeConfigValue("VITE_ARCGIS_URL")).toBe("https://laufzeit.example/{1}");
  });

  it("fällt ohne Laufzeit-Konfiguration auf den Build-Wert zurück", () => {
    vi.stubEnv("VITE_ARCGIS_URL", "https://build.example/{1}");
    expect(getRuntimeConfigValue("VITE_ARCGIS_URL")).toBe("https://build.example/{1}");
  });

  it("fällt bei leerem Laufzeit-Wert auf den Build-Wert zurück", () => {
    vi.stubEnv("VITE_ARCGIS_URL", "https://build.example/{1}");
    window.__ISI_CONFIG__ = { VITE_ARCGIS_URL: "  " };
    expect(getRuntimeConfigValue("VITE_ARCGIS_URL")).toBe("https://build.example/{1}");
  });

  it("liefert einen leeren String, wenn der Wert nirgends gesetzt ist", () => {
    vi.stubEnv("VITE_ARCGIS_URL", undefined);
    window.__ISI_CONFIG__ = {};
    expect(getRuntimeConfigValue("VITE_ARCGIS_URL")).toBe("");
  });
});
