import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import StartseitenEinstellungen from "@/components/startseite/StartseitenEinstellungen.vue";

const mockGetStartseitenEinstellung = vi.fn();
const mockSaveStartseitenEinstellung = vi.fn();
const mockLoadFilters = vi.fn();
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

vi.mock("vue-toastification", () => ({
  useToast: () => ({ success: vi.fn() }),
}));

async function mountComponent(showMeineVorgaenge: boolean): Promise<VueWrapper> {
  const wrapper = mount(StartseitenEinstellungen, { shallow: true, props: { showMeineVorgaenge } });
  await flushPromises();
  return wrapper;
}

describe("StartseitenEinstellungenTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetStartseitenEinstellung.mockReset();
    mockSaveStartseitenEinstellung.mockReset();
    mockLoadFilters.mockReset();
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

  test("zeigt den Standard-Filter allen Rollen, die Einstellungen für Meine Vorgänge nur Abfrageerstellern", async () => {
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
});
