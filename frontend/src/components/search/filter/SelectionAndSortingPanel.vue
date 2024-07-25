<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="text-h6"> Objekttyp und Sortierung </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-0">
      <p class="font-weight-black mt-3">Objektauswahl</p>
      <p class="font-weight-regular mb-3">Es ist mindestens ein Objekttyp auszuwählen.</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-chip
                class="ma-2"
                :prepend-icon="iconForAllObjectTypesSelected"
                filter
                @click="selectAll"
                v-bind="activatorProps"
              >
                Alle auswählen
              </v-chip>
            </template>
            <span> Es werden all Objekttypen ausgewählt. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectBauleitplanverfahren"
                :label="'Bauleitplanverfahren'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Bauleitplanverfahren werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectBaugenehmigungsverfahren"
                :label="'Baugenehmigungsverfahren'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Baugenehmigungsverfahren werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectWeiteresVerfahren"
                :label="'Weiteres Verfahren'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Weiteren Verfahren werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectBauvorhaben"
                :label="'Bauvorhaben'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Bauvorhaben werden in die Suche miteinbezogen. </span>
          </v-tooltip>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-chip
                class="ma-2"
                :prepend-icon="iconForAllObjectTypesDeselected"
                filter
                @click="deselectAll"
                v-bind="activatorProps"
              >
                Alle abwählen
              </v-chip>
            </template>
            <span> Es werden all Objekttypen abgewählt. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectGrundschule"
                :label="'Grundschule'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Grundschulen werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectGsNachmittagBetreuung"
                :label="'Nachmittagsbetreuung für Grundschulkinder'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span>
              Die Einrichtungen zur Nachmittagsbetreuung für Grundschulkinder werden in die Suche miteinbezogen.
            </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectMittelschule"
                :label="'Mittelschule'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Mittelschulen werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectKinderkrippe"
                :label="'Kinderkrippe'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Kinderkrippen werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectKindergarten"
                :label="'Kindergarten'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Kindergärten werden in die Suche miteinbezogen. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                v-model="searchQueryAndSorting.selectHausFuerKinder"
                :label="'Haus für Kinder'"
                color="grey-darken-1"
                hide-details
                density="compact"
                v-bind="activatorProps"
              />
            </template>
            <span> Die Häuser für Kinder werden in die Suche miteinbezogen. </span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-divider />
      <p class="font-weight-black mt-3">Sortierung</p>
      <p class="font-weight-regular mb-3">Auswahl der Art der Sortierung und der Sortierreihenfolge.</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-select
                v-model="searchQueryAndSorting.sortBy"
                :items="entriesArtderSortierung"
                label="Art der Sortierung"
                item-value="key"
                item-title="value"
                variant="filled"
                density="comfortable"
                v-bind="activatorProps"
              />
            </template>
            <span> Auswahl nach welchem Attribut sortiert werden soll. </span>
          </v-tooltip>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-select
                v-model="searchQueryAndSorting.sortOrder"
                :items="entriesReihenfolgeDerSortierung"
                label="Sortierreihenfolge"
                item-value="key"
                item-title="value"
                variant="filled"
                density="comfortable"
                v-bind="activatorProps"
              />
            </template>
            <span> Auswahl ob das sortierbare Attribut aufsteigend oder absteigend sortiert werden soll. </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { computed, ref } from "vue";

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

function selectAll(): void {
  searchQueryAndSorting.value.selectBauleitplanverfahren = true;
  searchQueryAndSorting.value.selectBaugenehmigungsverfahren = true;
  searchQueryAndSorting.value.selectWeiteresVerfahren = true;
  searchQueryAndSorting.value.selectBauvorhaben = true;
  searchQueryAndSorting.value.selectGrundschule = true;
  searchQueryAndSorting.value.selectGsNachmittagBetreuung = true;
  searchQueryAndSorting.value.selectHausFuerKinder = true;
  searchQueryAndSorting.value.selectKinderkrippe = true;
  searchQueryAndSorting.value.selectKindergarten = true;
  searchQueryAndSorting.value.selectMittelschule = true;
}

function deselectAll() {
  searchQueryAndSorting.value.selectBauleitplanverfahren = false;
  searchQueryAndSorting.value.selectBaugenehmigungsverfahren = false;
  searchQueryAndSorting.value.selectWeiteresVerfahren = false;
  searchQueryAndSorting.value.selectBauvorhaben = false;
  searchQueryAndSorting.value.selectGrundschule = false;
  searchQueryAndSorting.value.selectGsNachmittagBetreuung = false;
  searchQueryAndSorting.value.selectHausFuerKinder = false;
  searchQueryAndSorting.value.selectKinderkrippe = false;
  searchQueryAndSorting.value.selectKindergarten = false;
  searchQueryAndSorting.value.selectMittelschule = false;
}

const iconForAllObjectTypesSelected = computed(() => {
  return searchQueryAndSorting.value.allObjectTypesSelected() ? "mdi-check" : undefined;
});

const iconForAllObjectTypesDeselected = computed(() => {
  return searchQueryAndSorting.value.allObjectTypesDeselected() ? "mdi-check" : undefined;
});

const entriesArtderSortierung = computed(() => {
  return [
    {
      key: SearchQueryAndSortingDtoSortByEnum.Name,
      value: "Name",
    },
    {
      key: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
      value: "Änderungsdatum",
    },
    {
      key: SearchQueryAndSortingDtoSortByEnum.CreatedDateTime,
      value: "Erstellungsdatum",
    },
  ];
});

const entriesReihenfolgeDerSortierung = computed(() => {
  return [
    {
      key: SearchQueryAndSortingDtoSortOrderEnum.Asc,
      value: "aufsteigend",
    },
    {
      key: SearchQueryAndSortingDtoSortOrderEnum.Desc,
      value: "absteigend",
    },
  ];
});
</script>
