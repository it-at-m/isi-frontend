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
      <div
        class="d-flex align-center"
        style="min-width: 0"
      >
        <v-btn
          icon
          variant="text"
          class="ml-2"
          @click="showManagementDialog = true"
          :aria-label="'Filter verwalten'"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-select
          v-model="selectedFilter"
          :items="savedFilters"
          item-title="name"
          item-value="id"
          density="compact"
          variant="solo"
          hide-details
          style="width: 300px"
          placeholder="Gespeicherten Filter anwenden"
          @update:modelValue="onSelectFilter"
        />
      </div>
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
  <filter-management-dialog
    v-model="showManagementDialog"
    :filters="savedFilters"
    @rename="onRenameFilter"
    @delete="onDeleteFilter"
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
import { useToast } from "vue-toastification";
import FilterManagementDialog from "@/components/search/filter/FilterManagementDialog.vue";

interface Emits {
  (event: "adopt-search-and-filter-options", value: void): void;
  (event: "reset-search-and-filter-options", value: void): void;
}

const { xl } = useDisplay();
const panels = ref<Array<number>>([0]);
const emit = defineEmits<Emits>();
const showSaveDialog = ref(false);
const showManagementDialog = ref(false);

const { savedFilters, loadFilters, saveFilter, editExistingFilter, selectFilter, deleteExistingFilter } =
  useFilterPersistence();
const selectedFilter = ref<string | null>(null);
const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });
const toast = useToast();

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
  try {
    selectFilter(id, searchQueryAndSorting);
    toast.success("Gespeicherter Filter wurde angewendet.");
  } catch (e: any) {
    toast.error("Es ist ein Fehler beim Anwenden des Filters aufgetreten.");
  }
}

function adoptSearchAndFilterOptions(): void {
  emit("adopt-search-and-filter-options");
}

function resetSearchAndFilterOptions(): void {
  emit("reset-search-and-filter-options");
}

async function onSaveFilter(name: string) {
  try {
    await saveFilter(name, searchQueryAndSorting.value as FilterSettingsDto);
    toast.success("Neuer Filter wurde erfolgreich erstellt.");
  } catch (e: any) {
    toast.error("Es ist ein Fehler beim Erstellen des Filters aufgetreten.");
  }
}

async function onEditFilter(id: string) {
  try {
    await editExistingFilter(id, searchQueryAndSorting.value as FilterSettingsDto);
    toast.success("Deine Änderungen wurden erfolgreich gespeichert.");
  } catch (e: any) {
    toast.error("Es ist ein Fehler beim Überschreiben des Filters aufgetreten.");
  }
}

async function onRenameFilter(id: string, newName: string) {
  try {
    await editExistingFilter(id, { ...savedFilters.value.find((f) => f.id === id)?.filterSettings }, newName);
    toast.success("Deine Änderungen wurden erfolgreich gespeichert.");
    await loadFilters();
  } catch (e: any) {
    toast.error("Es ist ein Fehler beim Umbenennen des Filters aufgetreten.");
  }
}

async function onDeleteFilter(id: string) {
  try {
    await deleteExistingFilter(id);
    toast.success("Der Filter wurde erfolgreich gelöscht.");
    await loadFilters();
  } catch (e: any) {
    toast.error("Es ist ein Fehler beim Löschen des Filters aufgetreten.");
  }
}
</script>
