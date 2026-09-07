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
      <!-- Dropdown für gespeicherte Filter -->
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
        @focus="loadFilters"
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
        @click="resetSearchAndFilterOptions"
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
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { PersonalFilterEntityControllerApi } from "@/api/api-client/isi-backend/apis/PersonalFilterEntityControllerApi";
import SelectionAndSortingPanel from "@/components/search/filter/SelectionAndSortingPanel.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import FilterPanel from "@/components/search/filter/FilterPanel.vue";
import RequestUtils from "@/utils/RequestUtils";
import { useDisplay } from "vuetify";

interface Emits {
  (event: "adopt-search-and-filter-options", value: void): void;
  (event: "reset-search-and-filter-options", value: void): void;
}

const { xl } = useDisplay();
const panels = ref<Array<number>>([0]);
const emit = defineEmits<Emits>();

const filterApi = new PersonalFilterEntityControllerApi(RequestUtils.getBasicFetchConfigurationForBackend());

const savedFilters = ref<Array<{ id: string; name: string }>>([]);
const selectedFilter = ref<string | null>(null);

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

const getContentSheetHeight = computed(() => {
  if (xl.value) {
    return "690px";
  }
  return "550px";
});

async function loadFilters() {
  const result = await filterApi.getCollectionResourcePersonalfilterGet();
}

function adoptSearchAndFilterOptions(): void {
  emit("adopt-search-and-filter-options");
}

function resetSearchAndFilterOptions(): void {
  emit("reset-search-and-filter-options");
}
</script>
