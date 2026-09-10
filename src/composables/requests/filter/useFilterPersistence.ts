import { ref } from "vue";
import { usePersonalFilterApi } from "@/composables/requests/PersonalFilterApi";
import { mapFrontendFilterToBackend } from "@/composables/requests/filter/useFilterMapping";

export function useFilterPersistence() {
  const savedFilters = ref<Array<{ id: string; name: string; filterSettings: any }>>([]);
  const { getPersonalFilters, createFilter } = usePersonalFilterApi();
  async function loadFilters() {
    const filters = await getPersonalFilters();
    savedFilters.value = filters.map((f) => ({
      id: f.id ?? "",
      name: f.filterName ?? "Unbenannter Filter",
      filterSettings: f.filterSettings ?? {},
    }));
  }

  async function saveFilter(name: string, filterSettings: any) {
    const backendFilterSettings = mapFrontendFilterToBackend(filterSettings);
    //backendFilterSettings.sobonRelevant = backendFilterSettings.sobonRelevant ?? "UNSPECIFIED";
    await createFilter({ filterName: name, filterSettings: backendFilterSettings });
    await loadFilters();
  }

  return {
    savedFilters,
    loadFilters,
    saveFilter,
  };
}
