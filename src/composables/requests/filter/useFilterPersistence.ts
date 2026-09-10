import { ref } from "vue";
import { usePersonalFilterApi } from "@/composables/requests/PersonalFilterApi";
import { mapFrontendFilterToBackend, mapBackendFilterToFrontend } from "@/composables/requests/filter/useFilterMapping";
import type { FilterSettingsDto, PersonalFilterRequestDto } from "@/api/api-client/isi-backend";

export function useFilterPersistence() {
  const savedFilters = ref<Array<{ id: string; name: string; filterSettings: FilterSettingsDto }>>([]);
  const { getPersonalFilters, createFilter, editFilter } = usePersonalFilterApi();

  async function loadFilters() {
    const filters = await getPersonalFilters();
    savedFilters.value = filters.map((f) => ({
      id: f.id ?? "",
      name: f.filterName ?? "Unbenannter Filter",
      filterSettings: (f.filterSettings as FilterSettingsDto) ?? ({} as FilterSettingsDto),
    }));
  }

  async function saveFilter(name: string, filterSettings: FilterSettingsDto) {
    const backendFilterSettings = mapFrontendFilterToBackend(filterSettings) as FilterSettingsDto;
    await createFilter({ filterName: name, filterSettings: backendFilterSettings });
    await loadFilters();
  }

  async function editExistingFilter(id: string, filterSettings: FilterSettingsDto) {
    const backendFilterSettings = mapFrontendFilterToBackend(filterSettings) as FilterSettingsDto;
    const filter = savedFilters.value.find((f) => f.id === id);
    if (filter) {
      const dto: PersonalFilterRequestDto = {
        id: filter.id,
        filterName: filter.name,
        filterSettings: backendFilterSettings,
      };
      await editFilter(dto);
      await loadFilters();
    }
  }

  function selectFilter(id: string, searchQueryAndSorting: any) {
    const filter = savedFilters.value.find((f) => f.id === id);
    if (filter) {
      const mapped = mapBackendFilterToFrontend(filter.filterSettings, searchQueryAndSorting.value);
      Object.assign(searchQueryAndSorting.value, mapped);
    }
  }

  return {
    savedFilters,
    loadFilters,
    saveFilter,
    editExistingFilter,
    selectFilter,
  };
}
