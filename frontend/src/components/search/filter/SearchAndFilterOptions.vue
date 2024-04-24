<template>
  <v-card flat>
    <v-card-title>
      <v-icon left>mdi-filter-outline</v-icon>
      Such- und Filtereinstellungen
    </v-card-title>

    <v-card-text>
      <v-sheet
        width="100%"
        class="overflow-y-auto"
        :max-height="getContentSheetHeight"
      >
        <v-expansion-panels
          hover
          focusable
        >
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
        >Übernehmen
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="resetSearchAndFilterOptions"
        >Zurücksetzen
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
import { defineModel } from "@/utils/Vue";
import { useVuetify } from "@/utils/Vue";

const vuetify = useVuetify();

interface Props {
  value: SearchQueryAndSortingModel;
}

interface Emits {
  (event: "adoptSearchAndFilterOptions", value: void): void;
  (event: "resetSearchAndFilterOptions", value: void): void;
  (event: "input", value: SearchQueryAndSortingModel): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const searchQueryAndSorting = defineModel(props, emit);

const getContentSheetHeight = computed(() => {
  if (vuetify.breakpoint.xl) {
    return "650px";
  }
  return "400px";
});

function adoptSearchAndFilterOptions(): void {
  emit("adoptSearchAndFilterOptions");
}

function resetSearchAndFilterOptions(): void {
  emit("resetSearchAndFilterOptions");
}
</script>

<style scoped></style>
