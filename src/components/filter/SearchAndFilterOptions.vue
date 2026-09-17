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
        <v-tooltip
          text="Filter löschen oder umbenennen"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              icon
              variant="text"
              class="ml-2"
              @click="showManagementDialog = true"
              v-bind="props"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

        <v-select
          v-model="selectedFilter"
          :items="filterDropdownItems"
          item-title="name"
          item-value="id"
          density="compact"
          variant="solo"
          hide-details
          style="width: 300px"
          placeholder="Filtereinstellungen übernehmen"
          :menu-props="{ maxWidth: '300px', minWidth: '300px' }"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              @click="onSelectFilter(item.id)"
            />
          </template>
        </v-select>
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
        style="width: 200px"
        variant="flat"
        @click="onSaveOrUpdate"
      >
        {{ saveOrUpdateButtonText }}
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
  <yes-no-dialog
    v-model="confirmCloseDialogOpen"
    dialogtitle="Filtermaske verlassen?"
    :dialogtext="getConfirmDialogText()"
    yes-text="Weiter"
    no-text="Zurück"
    @yes="confirmCloseDialog(true)"
    @no="confirmCloseDialog(false)"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { PersonalFilterEntityControllerApi } from "@/api/api-client/isi-backend/apis/PersonalFilterEntityControllerApi";
import SelectionAndSortingPanel from "@/components/filter/SelectionAndSortingPanel.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import FilterPanel from "@/components/filter/FilterPanel.vue";
import RequestUtils from "@/utils/RequestUtils";
import { useDisplay } from "vuetify";
import { useFilterPersistence, FilterNameError } from "@/composables/requests/filter/useFilterPersistence";
import FilterSaveDialog from "@/components/filter/FilterSaveDialog.vue";
import { useToast } from "vue-toastification";
import FilterManagementDialog from "@/components/filter/FilterManagementDialog.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

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
const confirmCloseDialogOpen = ref(false);
const confirmAction = ref<"adopt" | "reset" | null>(null);

const STANDARD_FILTER_ID = "__default__";
const standardFilter = { id: STANDARD_FILTER_ID, name: "Standardeinstellung" };
const filterDropdownItems = computed(() => [standardFilter, ...savedFilters.value]);
const saveOrUpdateButtonText = computed(() => {
  if (selectedFilter.value && selectedFilter.value !== STANDARD_FILTER_ID) {
    return "Aktualisieren";
  }
  return "Speichern";
});

const isFilterModified = ref(false);
let ignoreNextModelChange = false;

onMounted(async () => {
  try {
    await loadFilters();
  } catch {
    // handleError already provides user feedback.
  }
});

watch(
  searchQueryAndSorting,
  () => {
    if (ignoreNextModelChange) {
      ignoreNextModelChange = false;
      return;
    }
    if (!isFilterModified.value) {
      isFilterModified.value = true;
    }
  },
  { deep: true },
);

const getContentSheetHeight = computed(() => {
  if (xl.value) {
    return "690px";
  }
  return "550px";
});

function onFiltermaskOpen(selectedFilterId?: string) {
  if (selectedFilterId == null) {
    isFilterModified.value = false;
    ignoreNextModelChange = false;
    selectedFilter.value = null;
  } else {
    selectedFilter.value = selectedFilterId;
  }
}

function onSelectFilter(id: string) {
  if (id === STANDARD_FILTER_ID) {
    searchQueryAndSorting.value = createSearchQueryAndSortingModel();
    isFilterModified.value = false;
    ignoreNextModelChange = true;
    toast.success("Standardeinstellung wurde angewendet.");
    return;
  }
  try {
    selectFilter(id, searchQueryAndSorting);
    toast.success("Gespeicherter Filter wurde angewendet.");
    isFilterModified.value = false;
    ignoreNextModelChange = true;
  } catch (e: any) {
    if (e?.status === 0) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    }
  }
}

function onSaveOrUpdate() {
  if (selectedFilter.value && selectedFilter.value !== STANDARD_FILTER_ID) {
    onEditFilter(selectedFilter.value);
  } else {
    showSaveDialog.value = true;
  }
}

function adoptSearchAndFilterOptions(): void {
  if (selectedFilter.value && isFilterModified.value) {
    confirmAction.value = "adopt";
    confirmCloseDialogOpen.value = true;
  } else {
    emit("adopt-search-and-filter-options");
  }
}

function resetSearchAndFilterOptions(): void {
  if (selectedFilter.value && isFilterModified.value) {
    confirmAction.value = "reset";
    confirmCloseDialogOpen.value = true;
  } else {
    emit("reset-search-and-filter-options");
  }
}

function confirmCloseDialog(yes: boolean) {
  confirmCloseDialogOpen.value = false;
  if (yes) {
    if (confirmAction.value === "adopt") {
      emit("adopt-search-and-filter-options");
    } else if (confirmAction.value === "reset") {
      emit("reset-search-and-filter-options");
    }
  }
  confirmAction.value = null;
}

function getSelectedFilterName() {
  if (selectedFilter.value === STANDARD_FILTER_ID) {
    return standardFilter.name;
  }
  const filter = savedFilters.value.find((f) => f.id === selectedFilter.value);
  return filter ? filter.name : "";
}

function getConfirmDialogText() {
  const filterName = getSelectedFilterName();
  if (confirmAction.value === "adopt") {
    return `Änderungen am Filter '${filterName}' werden nicht gespeichert. Trotzdem übernehmen?`;
  } else if (confirmAction.value === "reset") {
    return `Änderungen am Filter '${filterName}' werden nicht gespeichert. Trotzdem zurücksetzen?`;
  }
  return `Änderungen am Filter '${filterName}' werden nicht gespeichert. Trotzdem verlassen?`;
}

async function onSaveFilter(name: string) {
  try {
    await saveFilter(name, searchQueryAndSorting.value);
    toast.success("Neuer Filter wurde erfolgreich erstellt.");
  } catch (e: any) {
    if (e?.name === "FilterNameError") {
      toast.error(e.message);
    } else if (e?.status === 0) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    }
  }
}

async function onEditFilter(id: string) {
  try {
    await editExistingFilter(id, searchQueryAndSorting.value);
    toast.success("Deine Änderungen wurden erfolgreich gespeichert.");
    isFilterModified.value = false;
  } catch (e: any) {
    if (e?.status === 0) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    }
  }
}

async function onRenameFilter(id: string, newName: string) {
  try {
    await editExistingFilter(id, savedFilters.value.find((f) => f.id === id)?.filterSettings ?? {}, newName);
    toast.success("Deine Änderungen wurden erfolgreich gespeichert.");
    await loadFilters();
  } catch (e: any) {
    if (e?.name === "FilterNameError") {
      toast.error(e.message);
    } else if (e?.status === 0) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    }
  }
}

async function onDeleteFilter(id: string) {
  try {
    await deleteExistingFilter(id);
    toast.success("Der Filter wurde erfolgreich gelöscht.");
    await loadFilters();
  } catch (e: any) {
    if (e?.status === 0) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    }
  }
}

defineExpose({ onFiltermaskOpen, isFilterModified, selectedFilter });
</script>
