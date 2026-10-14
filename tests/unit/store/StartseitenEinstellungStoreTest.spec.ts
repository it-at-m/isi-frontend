import { beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStartseitenEinstellungStore } from "@/stores/StartseitenEinstellungStore";
import { DEFAULT_SCHNELLFILTER, DEFAULT_SORTIERUNG } from "@/utils/StartseiteUtil";

const mockGetStartseitenEinstellung = vi.fn();

vi.mock("@/composables/requests/startseite/StartseitenEinstellungApi", () => ({
  useStartseitenEinstellungApi: () => ({ getStartseitenEinstellung: mockGetStartseitenEinstellung }),
}));

describe("StartseitenEinstellungStoreTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetStartseitenEinstellung.mockReset();
  });

  test("übernimmt die gespeicherten Einstellungen", async () => {
    mockGetStartseitenEinstellung.mockResolvedValue({ schnellfilter: "ZUR_KENNTNIS", sortBy: "NAME" });
    const store = useStartseitenEinstellungStore();

    await store.initialize();

    expect(store.schnellfilter).toBe("ZUR_KENNTNIS");
    expect(store.sortierung).toBe("NAME");
    expect(store.geladen).toBe(true);
  });

  test("lädt die Einstellungen nur einmal", async () => {
    mockGetStartseitenEinstellung.mockResolvedValue({ schnellfilter: "ZUR_KENNTNIS", sortBy: "NAME" });
    const store = useStartseitenEinstellungStore();

    await store.initialize();
    await store.initialize();

    expect(mockGetStartseitenEinstellung).toHaveBeenCalledTimes(1);
  });

  test("behält bei einem Fehler die Standardwerte", async () => {
    mockGetStartseitenEinstellung.mockRejectedValue(new Error("nicht erreichbar"));
    const store = useStartseitenEinstellungStore();

    await store.initialize();

    expect(store.schnellfilter).toBe(DEFAULT_SCHNELLFILTER);
    expect(store.sortierung).toBe(DEFAULT_SORTIERUNG);
    expect(store.geladen).toBe(true);
  });

  test("überschreibt während des Ladens gespeicherte Einstellungen nicht mit der älteren Antwort", async () => {
    let antworte: (einstellung: unknown) => void = () => undefined;
    mockGetStartseitenEinstellung.mockReturnValue(new Promise((resolve) => (antworte = resolve)));
    const store = useStartseitenEinstellungStore();

    const initialisierung = store.initialize();
    store.setEinstellung("ABGESCHLOSSEN", "LAST_MODIFIED_DATE_TIME");
    antworte({ schnellfilter: "ZUR_KENNTNIS", sortBy: "NAME" });
    await initialisierung;

    expect(store.schnellfilter).toBe("ABGESCHLOSSEN");
    expect(store.sortierung).toBe("LAST_MODIFIED_DATE_TIME");
  });
});
