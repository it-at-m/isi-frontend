<template>
  <v-card flat>
    <v-card-title>
      <v-icon start>mdi-filter-outline</v-icon>
      Such- und Filtereinstellungen
    </v-card-title>

    <v-card-text>
      <v-sheet
        width="100%"
        class="overflow-y-auto"
        :max-height="getContentSheetHeight"
      >
        <!-- eslint-disable-next-line vuetify/no-deprecated-props -->
        <v-expansion-panels focusable>
          <selection-and-sorting-panel v-model="searchQueryAndSorting" />
          <filter-panel />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        @click="adoptSearchAndFilterOptions"
      >
        Übernehmen
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="resetSearchAndFilterOptions"
      >
        Zurücksetzen
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SelectionAndSortingPanel from "@/components/search/filter/SelectionAndSortingPanel.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import FilterPanel from "@/components/search/filter/FilterPanel.vue";
import { useVuetify } from "@/utils/Vue";

const vuetify = useVuetify();

interface Emits {
  (event: "adopt-search-and-filter-options", value: void): void;
  (event: "reset-search-and-filter-options", value: void): void;
}

const focusable = true;

const emit = defineEmits<Emits>();

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

const getContentSheetHeight = computed(() => {
  if (vuetify.breakpoint.xl) {
    return "650px";
  }
  return "400px";
});

function adoptSearchAndFilterOptions(): void {
  emit("adopt-search-and-filter-options");
}

function resetSearchAndFilterOptions(): void {
  emit("reset-search-and-filter-options");
}
</script>
