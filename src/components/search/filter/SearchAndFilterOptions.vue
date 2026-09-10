<template>
  <v-card flat>
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon
          start
          size="20"
          >mdi-filter-outline</v-icon
        >
        <span class="text-subtitle-1">Such- und Filtereinstellungen</span>
      </div>
      <v-select
        v-model="selectedFilter"
        :items="savedFilters"
        item-title="name"
        item-value="id"
        density="compact"
        variant="solo"
        hide-details
        style="max-width: 300px"
        placeholder="Gespeicherten Filter anwenden"
        class="ml-2"
        @update:modelValue="onSelectFilter"
      />
    </v-card-title>

    <v-card-text>
      <v-sheet
        width="100%"
        class="overflow-y-auto"
        :max-height="getContentSheetHeight"
      >
        <v-expansion-panels
          v-model="panels"
          variant="accordion"
        >
          <selection-and-sorting-panel v-model="searchQueryAndSorting" />
          <filter-panel v-model="searchQueryAndSorting" />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        style="width: 200px"
        variant="flat"
        @click="adoptSearchAndFilterOptions"
      >
        Übernehmen
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        style="width: 300px"
        variant="flat"
        @click="showSaveDialog = true"
      >
        Speichern / Überschreiben
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        style="width: 200px"
        variant="flat"
        @click="resetSearchAndFilterOptions"
      >
        Zurücksetzen
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
  <filter-save-dialog
    v-model:show="showSaveDialog"
    :saved-filters="savedFilters"
    @save="onSaveFilter"
    @edit="onEditFilter"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { PersonalFilterEntityControllerApi } from "@/api/api-client/isi-backend/apis/PersonalFilterEntityControllerApi";
import SelectionAndSortingPanel from "@/components/search/filter/SelectionAndSortingPanel.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import FilterPanel from "@/components/search/filter/FilterPanel.vue";
import RequestUtils from "@/utils/RequestUtils";
import { useDisplay } from "vuetify";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import FilterSaveDialog from "@/components/search/filter/FilterSaveDialog.vue";
import type { FilterSettingsDto } from "@/api/api-client/isi-backend";

interface Emits {
  (event: "adopt-search-and-filter-options", value: void): void;
  (event: "reset-search-and-filter-options", value: void): void;
}

const { xl } = useDisplay();
const panels = ref<Array<number>>([0]);
const emit = defineEmits<Emits>();
const showSaveDialog = ref(false);

const { savedFilters, loadFilters, saveFilter, editExistingFilter, selectFilter } = useFilterPersistence();
const selectedFilter = ref<string | null>(null);
const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

onMounted(() => {
  loadFilters();
});

const getContentSheetHeight = computed(() => {
  if (xl.value) {
    return "690px";
  }
  return "550px";
});

function onSelectFilter(id: string) {
  selectFilter(id, searchQueryAndSorting);
}

function adoptSearchAndFilterOptions(): void {
  emit("adopt-search-and-filter-options");
}

function resetSearchAndFilterOptions(): void {
  emit("reset-search-and-filter-options");
}

async function onSaveFilter(name: string) {
  await saveFilter(name, searchQueryAndSorting.value as FilterSettingsDto);
}

async function onEditFilter(id: string) {
  await editExistingFilter(id, searchQueryAndSorting.value as FilterSettingsDto);
}
</script>
