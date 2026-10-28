import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import StartseitenEinstellungen from "@/components/startseite/StartseitenEinstellungen.vue";
import { SCHNELLFILTER_OPTIONEN, SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG } from "@/utils/StartseiteUtil";

const mockGetStartseitenEinstellung = vi.fn();
const mockSaveStartseitenEinstellung = vi.fn();
const mockLoadFilters = vi.fn();
const mockUebernehmeStandardFilter = vi.fn();
const mockSavedFilters = ref([{ id: "filter-1", name: "Meine Kitas", filterSettings: {} }]);

vi.mock("@/composables/requests/startseite/StartseitenEinstellungApi", () => ({
  useStartseitenEinstellungApi: () => ({
    getStartseitenEinstellung: mockGetStartseitenEinstellung,
    saveStartseitenEinstellung: mockSaveStartseitenEinstellung,
  }),
}));

vi.mock("@/composables/requests/filter/useFilterPersistence", () => ({
  useFilterPersistence: () => ({ savedFilters: mockSavedFilters, loadFilters: mockLoadFilters }),
}));

vi.mock("@/composables/requests/filter/useStandardFilter", () => ({
  useStandardFilter: () => ({ uebernehmeStandardFilter: mockUebernehmeStandardFilter }),
}));

vi.mock("vue-toastification", () => ({
  useToast: () => ({ success: vi.fn() }),
}));

async function mountComponent(
  showMeineVorgaenge: boolean,
  schnellfilterOptionen = SCHNELLFILTER_OPTIONEN,
): Promise<VueWrapper> {
  const wrapper = mount(StartseitenEinstellungen, {
    shallow: true,
    props: { schnellfilterOptionen: showMeineVorgaenge ? schnellfilterOptionen : undefined },
  });
  await flushPromises();
  return wrapper;
}

describe("StartseitenEinstellungenTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetStartseitenEinstellung.mockReset();
    mockSaveStartseitenEinstellung.mockReset();
    mockLoadFilters.mockReset();
    mockUebernehmeStandardFilter.mockReset();
    mockLoadFilters.mockResolvedValue(undefined);
    mockSaveStartseitenEinstellung.mockResolvedValue({});
    mockGetStartseitenEinstellung.mockResolvedValue({
      schnellfilter: "ZUR_KENNTNIS",
      sortBy: "NAME",
      sortOrder: "ASC",
      standardFilterId: "filter-1",
    });
  });

  test("bietet die Standardeinstellung und die persönlichen Filter als Standard-Filter an", async () => {
    const wrapper = await mountComponent(false);
    expect((wrapper.vm as any).standardFilterOptionen).toEqual([
      { id: null, name: "Standardeinstellung" },
      { id: "filter-1", name: "Meine Kitas" },
    ]);
  });

  test("lädt den gespeicherten Standard-Filter", async () => {
    const wrapper = await mountComponent(false);
    expect((wrapper.vm as any).standardFilterId).toBe("filter-1");
  });

  test("zeigt den Standard-Filter allen Rollen, Meine Vorgänge nur mit personalisierter Startseite", async () => {
    const ohneMeineVorgaenge = await mountComponent(false);
    expect(ohneMeineVorgaenge.find("#startseiten_einstellungen_standard_filter").exists()).toBe(true);
    expect(ohneMeineVorgaenge.find("#startseiten_einstellungen_schnellfilter").exists()).toBe(false);

    const mitMeineVorgaengen = await mountComponent(true);
    expect(mitMeineVorgaengen.find("#startseiten_einstellungen_standard_filter").exists()).toBe(true);
    expect(mitMeineVorgaengen.find("#startseiten_einstellungen_schnellfilter").exists()).toBe(true);
  });

  test("speichert den gewählten Standard-Filter mit den übrigen Einstellungen", async () => {
    const wrapper = await mountComponent(false);
    await (wrapper.vm as any).speichern();
    expect(mockSaveStartseitenEinstellung).toHaveBeenCalledWith(
      expect.objectContaining({ schnellfilter: "ZUR_KENNTNIS", standardFilterId: "filter-1" }),
    );
  });

  test("speichert ohne Standard-Filter die Standardeinstellung", async () => {
    const wrapper = await mountComponent(false);
    (wrapper.vm as any).standardFilterId = null;
    await (wrapper.vm as any).speichern();
    expect(mockSaveStartseitenEinstellung.mock.calls[0][0].standardFilterId).toBeUndefined();
  });

  test("übernimmt einen geänderten Standard-Filter direkt nach dem Speichern", async () => {
    const wrapper = await mountComponent(false);
    (wrapper.vm as any).standardFilterId = "filter-2";
    await (wrapper.vm as any).speichern();
    expect(mockUebernehmeStandardFilter).toHaveBeenCalledWith("filter-2");
  });

  test("setzt beim Wechsel auf die Standardeinstellung die Filter direkt zurück", async () => {
    const wrapper = await mountComponent(false);
    (wrapper.vm as any).standardFilterId = null;
    await (wrapper.vm as any).speichern();
    expect(mockUebernehmeStandardFilter).toHaveBeenCalledWith(null);
  });

  test("übernimmt den Standard-Filter nicht erneut, wenn er unverändert gespeichert wird", async () => {
    const wrapper = await mountComponent(true);
    await (wrapper.vm as any).speichern();
    expect(mockSaveStartseitenEinstellung).toHaveBeenCalled();
    expect(mockUebernehmeStandardFilter).not.toHaveBeenCalled();
  });

  test("übernimmt den Standard-Filter nicht, wenn das Speichern fehlschlägt", async () => {
    mockSaveStartseitenEinstellung.mockRejectedValue(new Error("Konflikt"));
    const wrapper = await mountComponent(false);
    (wrapper.vm as any).standardFilterId = "filter-2";
    await expect((wrapper.vm as any).speichern()).rejects.toThrow();
    expect(mockUebernehmeStandardFilter).not.toHaveBeenCalled();
  });

  test("bietet die Schnellfilter der übergebenen Startseite an", async () => {
    const wrapper = await mountComponent(true, SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG);
    expect(wrapper.findComponent("#startseiten_einstellungen_schnellfilter").props("items")).toEqual(
      SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
    );
  });

  test("ersetzt einen von der Startseite nicht angebotenen Schnellfilter durch 'Alle'", async () => {
    const wrapper = await mountComponent(true, SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG);
    expect((wrapper.vm as any).schnellfilter).toBe("ALLE");
  });

  test("behält ohne personalisierte Startseite den gespeicherten Schnellfilter beim Speichern", async () => {
    const wrapper = await mountComponent(false);
    await (wrapper.vm as any).speichern();
    expect(mockSaveStartseitenEinstellung.mock.calls[0][0].schnellfilter).toBe("ZUR_KENNTNIS");
  });
});
