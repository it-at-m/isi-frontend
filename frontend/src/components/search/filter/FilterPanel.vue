<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="text-h6"> Filtereinstellung </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-0">
      <p class="font-weight-black mt-3">Verortung</p>
      <p class="font-weight-regular mb-3">Verortungsbezogene Filtereinstellungen</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-combobox
            v-model="searchQueryAndSorting.filterStadtbezirkNummer"
            variant="underlined"
            label="Nummer der Stadtbezirke"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            @mouseover="hoverFilterStadtbezirkName = true"
            @mouseleave="hoverFilterStadtbezirkName = false"
          />
          <v-combobox
            v-model="searchQueryAndSorting.filterKitaplanungsbereichKitaPlbT"
            variant="underlined"
            label="Nummer der Kitaplanungsbereiche"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            @mouseover="hoverFilterKitaplanungsbereichKitaPlbT = true"
            @mouseleave="hoverFilterKitaplanungsbereichKitaPlbT = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-combobox
            v-model="searchQueryAndSorting.filterGrundschulsprengelNummer"
            variant="underlined"
            label="Nummer der Grundschulsprengel"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            @mouseover="hoverFilterGrundschulsprengelNummer = true"
            @mouseleave="hoverFilterGrundschulsprengelNummer = false"
          />
          <v-combobox
            v-model="searchQueryAndSorting.filterMittelschulsprengelNummer"
            variant="underlined"
            label="Nummer der Mittelschulsprengel"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            @mouseover="hoverFilterMittelschulsprengelNummer = true"
            @mouseleave="hoverFilterMittelschulsprengelNummer = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFiltereinstellungen }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { computed, ref } from "vue";

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

const hoverFilterStadtbezirkName = ref<boolean>(false);
const hoverFilterKitaplanungsbereichKitaPlbT = ref<boolean>(false);
const hoverFilterGrundschulsprengelNummer = ref<boolean>(false);
const hoverFilterMittelschulsprengelNummer = ref<boolean>(false);

const helpTextFiltereinstellungen = computed(() => {
  if (hoverFilterStadtbezirkName.value) {
    return "Eingabe der Stadtbezirksnummern nach denen gefiltert werden soll.";
  }
  if (hoverFilterKitaplanungsbereichKitaPlbT.value) {
    return "Eingabe der Kitaplanungsbereichsnummern nach denen gefiltert werden soll.";
  }
  if (hoverFilterGrundschulsprengelNummer.value) {
    return "Eingabe der Grundschulsprengelnummern nach denen gefiltert werden soll.";
  }
  if (hoverFilterMittelschulsprengelNummer.value) {
    return "Eingabe der Mittelschulsprengelnummern nach denen gefiltert werden soll.";
  }
  return "";
});
</script>
