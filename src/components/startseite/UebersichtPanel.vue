<template>
  <div class="d-flex flex-column fill-height">
    <h2 class="text-h5 text-primary font-weight-bold mb-3">Übersicht</h2>

    <div class="d-flex align-center ga-4 mb-3">
      <div class="flex-grow-1">
        <search-input-field />
      </div>
      <v-tabs
        id="uebersicht_ansicht_tabs"
        v-model="ansicht"
        density="compact"
      >
        <v-tab
          id="uebersicht_ansicht_karte"
          value="KARTE"
        >
          Karte
        </v-tab>
        <v-tab
          id="uebersicht_ansicht_liste"
          value="LISTE"
        >
          Liste
        </v-tab>
      </v-tabs>
    </div>

    <!-- Die Liste zeigt den Hinweis selbst an. Auf der Karte wäre er ohne diese Zeile nicht sichtbar. -->
    <v-alert
      v-if="ansicht === 'KARTE' && suchhinweis"
      id="uebersicht_suchhinweis"
      type="info"
      variant="tonal"
      density="compact"
      class="mb-3"
    >
      {{ suchhinweis }}
    </v-alert>

    <div
      class="flex-grow-1"
      style="min-height: 0"
    >
      <search-result-city-map
        v-if="ansicht === 'KARTE'"
        id="uebersicht_karte"
        height="100%"
        width="100%"
        expandable
      />
      <search-result-list
        v-else
        id="uebersicht_liste"
        width="100%"
        height="100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SearchInputField from "@/components/search/SearchInputField.vue";
import SearchResultCityMap from "@/components/map/SearchResultCityMap.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import { useSearchStore } from "@/stores/SearchStore";

type Ansicht = "KARTE" | "LISTE";

const searchStore = useSearchStore();
const ansicht = ref<Ansicht>("KARTE");
const suchhinweis = computed(() => searchStore.suchhinweis);

defineExpose({ ansicht, suchhinweis });
</script>
