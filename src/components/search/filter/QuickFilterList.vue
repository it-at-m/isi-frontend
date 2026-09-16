<template>
  <v-list
    class="elevation-2 rounded-lg"
    min-width="220"
    max-width="320"
    density="compact"
  >
    <v-list-item
      v-for="filter in savedFilters"
      :key="filter.id"
      @click="onFilterClick(filter)"
      class="quick-filter-list-item"
      style="cursor: pointer; padding-right: 8px"
    >
      <div style="display: flex; align-items: center; width: 100%">
        <!-- Lesezeichen-Icon ganz links -->
        <v-icon
          size="18"
          :color="filter.id === props.activeFilterId ? 'secondary' : ''"
          class="mr-2"
          style="flex-shrink: 0"
        >
          mdi-bookmark
        </v-icon>
        <!-- Filtername, linksbündig, mit Text-Overflow -->
        <span
          class="text-truncate"
          style="flex: 1 1 0; min-width: 0; text-align: left"
        >
          {{ filter.name }}
        </span>
        <!-- X-Button ganz rechts, nur beim aktiven Filter -->
        <v-btn
          v-if="filter.id === props.activeFilterId"
          icon
          size="small"
          variant="text"
          color="secondary"
          class="ml-2"
          @click.stop="onResetClick"
          style="flex-shrink: 0"
        >
          <v-icon size="18">mdi-close</v-icon>
        </v-btn>
      </div>
    </v-list-item>
    <v-list-item
      v-if="savedFilters.length === 0"
      disabled
    >
      <v-list-item-title>Keine Filter gespeichert</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";

const { savedFilters, loadFilters } = useFilterPersistence();
const props = defineProps<{
  activeFilterId: string | null;
}>();
const emit = defineEmits<{
  (e: "apply-filter", filter: any): void;
  (e: "reset-filter"): void;
}>();

onMounted(() => {
  loadFilters();
});

function onFilterClick(filter: any) {
  emit("apply-filter", filter);
}

function onResetClick() {
  emit("reset-filter");
}
</script>
