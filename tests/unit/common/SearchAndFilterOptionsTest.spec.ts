import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import SearchAndFilterOptions from "@/components/filter/SearchAndFilterOptions.vue";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

const mockLoadFilters = vi.fn();
const mockSaveFilter = vi.fn();
const mockSavedFilters = ref<Array<{ id: string; name: string; filterSettings: Record<string, unknown> }>>([]);
const mockToastError = vi.fn();

vi.mock("@/composables/requests/filter/useFilterPersistence", () => ({
  useFilterPersistence: () => ({
    savedFilters: mockSavedFilters,
    loadFilters: mockLoadFilters,
    saveFilter: mockSaveFilter,
    editExistingFilter: vi.fn(),
    selectFilter: vi.fn(),
    deleteExistingFilter: vi.fn(),
  }),
}));

// Die Komponente bestimmt über useDisplay die Höhe der Filtermaske, was ein installiertes Vuetify voraussetzt.
vi.mock("vuetify", async (importOriginal) => ({
  ...(await importOriginal<typeof import("vuetify")>()),
  useDisplay: () => ({ xl: ref(false) }),
}));

vi.mock("vue-toastification", () => ({
  useToast: () => ({ success: vi.fn(), error: mockToastError }),
}));

async function mountComponent(): Promise<VueWrapper> {
  const wrapper = mount(SearchAndFilterOptions, {
    shallow: true,
    props: { modelValue: createSearchQueryAndSortingModel() },
  });
  await flushPromises();
  return wrapper;
}

describe("SearchAndFilterOptionsTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockLoadFilters.mockReset();
    mockSaveFilter.mockReset();
    mockToastError.mockReset();
    mockLoadFilters.mockResolvedValue(undefined);
    mockSavedFilters.value = [];
  });

  test("wählt einen neu gespeicherten Filter aus, damit er nach dem Übernehmen angezeigt wird", async () => {
    mockSaveFilter.mockImplementation(async (name: string) => {
      mockSavedFilters.value = [{ id: "filter-neu", name, filterSettings: {} }];
    });
    const wrapper = await mountComponent();
    (wrapper.vm as any).isFilterModified = true;

    await (wrapper.vm as any).onSaveFilter("Meine Kitas ");

    expect((wrapper.vm as any).selectedFilter).toBe("filter-neu");
    expect((wrapper.vm as any).isFilterModified).toBe(false);
  });

  test("ändert die Auswahl nicht, wenn das Speichern fehlschlägt", async () => {
    mockSaveFilter.mockRejectedValue({ name: "FilterNameError", message: "Name vergeben" });
    const wrapper = await mountComponent();
    (wrapper.vm as any).isFilterModified = true;

    await (wrapper.vm as any).onSaveFilter("Meine Kitas");

    expect((wrapper.vm as any).selectedFilter).toBeNull();
    expect((wrapper.vm as any).isFilterModified).toBe(true);
    expect(mockToastError).toHaveBeenCalledWith("Name vergeben");
  });
});
