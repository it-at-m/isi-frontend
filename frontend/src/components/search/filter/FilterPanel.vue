<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="text-h6"> Filtereinstellung </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-0">
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-chip
            class="ma-2"
            filter
            @click="alleFiltereinstellungenAufheben"
            @mouseover="hoverFiltereinstellungenAufheben = true"
            @mouseleave="hoverFiltereinstellungenAufheben = false"
          >
            Filtereinstellungen aufheben
          </v-chip>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFiltereinstellungenAufheben }}
          </v-card>
        </v-col>
      </v-row>
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
            label="Nummern der Stadtbezirke"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            hint="z.B. 05 oder 14"
            @mouseover="hoverFilterStadtbezirkName = true"
            @mouseleave="hoverFilterStadtbezirkName = false"
          />
          <v-combobox
            v-model="searchQueryAndSorting.filterKitaplanungsbereichKitaPlbT"
            variant="underlined"
            label="Nummern der Kitaplanungsbereiche"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            hint="z.B. 5.1 oder 16.2"
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
            label="Nummern der Grundschulsprengel"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            hint="z.B. 2165"
            @mouseover="hoverFilterGrundschulsprengelNummer = true"
            @mouseleave="hoverFilterGrundschulsprengelNummer = false"
          />
          <v-combobox
            v-model="searchQueryAndSorting.filterMittelschulsprengelNummer"
            variant="underlined"
            label="Nummern der Mittelschulsprengel"
            hide-no-data
            :append-icon="''"
            multiple
            chips
            closable-chips
            density="default"
            hint="z.B. 1275"
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
      <p class="font-weight-black mt-3">Infrastruktureinrichtung</p>
      <p class="font-weight-regular mb-3">Infrastruktureinrichtungbezogene Filtereinstellungen</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="infrastruktureinrichtung_status"
            v-model="searchQueryAndSorting.filterInfrastruktureinrichtungStatus"
            :items="statusInfrastruktureinrichtungList"
            variant="underlined"
            item-value="key"
            item-title="value"
            multiple
            chips
          >
            <template #label> Status Infrastruktureinrichtung </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
      <p class="font-weight-black mt-3">Bauvorhaben</p>
      <p class="font-weight-regular mb-3">Bauvorhaben Filtereinstellungen</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="stand_verfahren"
            v-model="searchQueryAndSorting.filterStandVerfahren"
            :items="standVerfahrenList"
            variant="underlined"
            item-value="key"
            item-title="value"
            multiple
            chips
          >
            <template #label> Stand des Verfahrens </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-radio-group
            inline
            v-model="sobonRelevantModel"
            @update:model-value="sobonRelevantModelChanged"
          >
            <template #label> SoBoN-relevant </template>
            <v-radio
              label="Nein"
              value="false"
            ></v-radio>
            <v-radio
              label="Ja"
              value="true"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { onMounted, computed, ref } from "vue";
import { useLookupStore } from "@/stores/LookupStore";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

onMounted(() => {
  switch (searchQueryAndSorting.value.filterSobonRelevant) {
    case UncertainBoolean.True:
      sobonRelevantModel.value = "true";
      break;
    case UncertainBoolean.False:
      sobonRelevantModel.value = "false";
      break;
    default:
      sobonRelevantModel.value = undefined;
      break;
  }
});

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

const hoverFiltereinstellungenAufheben = ref<boolean>(false);
const hoverFilterStadtbezirkName = ref<boolean>(false);
const hoverFilterKitaplanungsbereichKitaPlbT = ref<boolean>(false);
const hoverFilterGrundschulsprengelNummer = ref<boolean>(false);
const hoverFilterMittelschulsprengelNummer = ref<boolean>(false);
const sobonRelevantModel = ref<string | undefined>(undefined);

const lookupStore = useLookupStore();
const statusInfrastruktureinrichtungList = computed(() => {
  var statusList = lookupStore.statusInfrastruktureinrichtung;
  const index = statusList.findIndex((status) => status.key === UncertainBoolean.Unspecified);
  if (index > -1) {
    statusList.splice(index, 1);
  }
  return statusList;
});
const standVerfahrenList = computed(() => {
  var standVerfahrenList = lookupStore.standVerfahren;
  const index = standVerfahrenList.findIndex((standVerfahren) => standVerfahren.key === UncertainBoolean.Unspecified);
  if (index > -1) {
    standVerfahrenList.splice(index, 1);
  }
  return standVerfahrenList;
});

const helpTextFiltereinstellungenAufheben = computed(() => {
  if (hoverFiltereinstellungenAufheben.value) {
    return "Mit einem Klick werden alle Filtereintellungen aufgehoben";
  }
  return "";
});

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

function alleFiltereinstellungenAufheben(): void {
  searchQueryAndSorting.value.filterStadtbezirkNummer = undefined;
  searchQueryAndSorting.value.filterKitaplanungsbereichKitaPlbT = undefined;
  searchQueryAndSorting.value.filterGrundschulsprengelNummer = undefined;
  searchQueryAndSorting.value.filterMittelschulsprengelNummer = undefined;
  searchQueryAndSorting.value.filterInfrastruktureinrichtungStatus = undefined;
  searchQueryAndSorting.value.filterStandVerfahren = undefined;
  searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
  sobonRelevantModel.value = undefined;
}

function sobonRelevantModelChanged(): void {
  switch (sobonRelevantModel.value) {
    case "true":
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.True;
      break;
    case "false":
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.False;
      break;
    default:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
  }
}
</script>
