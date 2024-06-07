<template>
  <v-expansion-panel>
    <v-expansion-panel-title> Objekttyp und Sortierung </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <v-card-title> Objektauswahl </v-card-title>
      <v-card-text> Es ist mindestens ein Objekttyp auszuwählen. </v-card-text>
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
            :prepend-icon="iconForAllObjectTypesSelected"
            filter
            @click="selectAll"
            @mouseover="hoverSelectAll = true"
            @mouseleave="hoverSelectAll = false"
          >
            Alle auswählen
          </v-chip>
          <v-checkbox
            v-model="searchQueryAndSorting.selectBauleitplanverfahren"
            :label="'Bauleitplanverfahren'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectBauleitplanverfahren = true"
            @mouseleave="hoverSelectBauleitplanverfahren = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectBaugenehmigungsverfahren"
            :label="'Baugenehmigungsverfahren'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectBaugenehmigungsverfahren = true"
            @mouseleave="hoverSelectBaugenehmigungsverfahren = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectWeiteresVerfahren"
            :label="'Weiteres Verfahren'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectWeiteresVerfahren = true"
            @mouseleave="hoverSelectWeiteresVerfahren = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectBauvorhaben"
            :label="'Bauvorhaben'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectBauvorhaben = true"
            @mouseleave="hoverSelectBauvorhaben = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-chip
            class="ma-2"
            :prepend-icon="iconForAllObjectTypesDeselected"
            filter
            @click="deselectAll"
            @mouseover="hoverDeselectAll = true"
            @mouseleave="hoverDeselectAll = false"
          >
            Alle abwählen
          </v-chip>
          <v-checkbox
            v-model="searchQueryAndSorting.selectGrundschule"
            :label="'Grundschule'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectGrundschule = true"
            @mouseleave="hoverSelectGrundschule = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectGsNachmittagBetreuung"
            :label="'Nachmittagsbetreuung für Grundschulkinder'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectGsNachmittagBetreuung = true"
            @mouseleave="hoverSelectGsNachmittagBetreuung = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectMittelschule"
            :label="'Mittelschule'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectMittelschule = true"
            @mouseleave="hoverSelectMittelschule = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectKinderkrippe"
            :label="'Kinderkrippe'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectKinderkrippe = true"
            @mouseleave="hoverSelectKinderkrippe = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectKindergarten"
            :label="'Kindergarten'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectKindergarten = true"
            @mouseleave="hoverSelectKindergarten = false"
          />
          <v-checkbox
            v-model="searchQueryAndSorting.selectHausFuerKinder"
            :label="'Haus für Kinder'"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverSelectHausFuerKinder = true"
            @mouseleave="hoverSelectHausFuerKinder = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextObjektauswahl }}
          </v-card>
        </v-col>
      </v-row>
      <v-divider />
      <v-card-title> Sortierung </v-card-title>
      <v-card-text> Auswahl der Art der Sortierung und der Sortierreihenfolge. </v-card-text>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="searchQueryAndSorting.sortBy"
            :items="entriesArtderSortierung"
            label="Art der Sortierung"
            item-value="key"
            item-title="value"
            variant="filled"
            density="comfortable"
            @mouseover="hoverArtDerSortierung = true"
            @mouseleave="hoverArtDerSortierung = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="searchQueryAndSorting.sortOrder"
            :items="entriesReihenfolgeDerSortierung"
            label="Sortierreihenfolge"
            item-value="key"
            item-title="value"
            variant="filled"
            density="comfortable"
            @mouseover="hoverReihenfolgeDerSortierung = true"
            @mouseleave="hoverReihenfolgeDerSortierung = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextSortierung }}
          </v-card>
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

const hoverSelectAll = ref<boolean>(false);
const hoverDeselectAll = ref<boolean>(false);
const hoverSelectBauleitplanverfahren = ref<boolean>(false);
const hoverSelectBaugenehmigungsverfahren = ref<boolean>(false);
const hoverSelectWeiteresVerfahren = ref<boolean>(false);
const hoverSelectBauvorhaben = ref<boolean>(false);
const hoverSelectGrundschule = ref<boolean>(false);
const hoverSelectGsNachmittagBetreuung = ref<boolean>(false);
const hoverSelectMittelschule = ref<boolean>(false);
const hoverSelectKinderkrippe = ref<boolean>(false);
const hoverSelectKindergarten = ref<boolean>(false);
const hoverSelectHausFuerKinder = ref<boolean>(false);

const hoverArtDerSortierung = ref<boolean>(false);
const hoverReihenfolgeDerSortierung = ref<boolean>(false);

const helpTextObjektauswahl = computed(() => {
  if (hoverSelectAll.value) {
    return "Es werden all Objekttypen ausgewählt.";
  }
  if (hoverDeselectAll.value) {
    return "Es werden all Objekttypen abgewählt.";
  }
  if (hoverSelectBauleitplanverfahren.value) {
    return "Die Bauleitplanverfahren werden in die Suche miteinbezogen.";
  }
  if (hoverSelectBaugenehmigungsverfahren.value) {
    return "Die Baugenehmigungsverfahren werden in die Suche miteinbezogen.";
  }
  if (hoverSelectWeiteresVerfahren.value) {
    return "Die Weiteren Verfahren werden in die Suche miteinbezogen.";
  }
  if (hoverSelectBauvorhaben.value) {
    return "Die Bauvorhaben werden in die Suche miteinbezogen.";
  }
  if (hoverSelectGrundschule.value) {
    return "Die Grundschulen werden in die Suche miteinbezogen.";
  }
  if (hoverSelectMittelschule.value) {
    return "Die Mittelschulen werden in die Suche miteinbezogen.";
  }
  if (hoverSelectGsNachmittagBetreuung.value) {
    return "Die Einrichtungen zur Nachmittagsbetreuung für Grundschulkinder werden in die Suche miteinbezogen.";
  }
  if (hoverSelectKinderkrippe.value) {
    return "Die Kinderkrippen werden in die Suche miteinbezogen.";
  }
  if (hoverSelectKindergarten.value) {
    return "Die Kindergärten werden in die Suche miteinbezogen.";
  }
  if (hoverSelectHausFuerKinder.value) {
    return "Die Häuser für Kinder werden in die Suche miteinbezogen.";
  }
  return "";
});

const helpTextSortierung = computed(() => {
  if (hoverArtDerSortierung.value) {
    return "Auswahl nach welchem Attribut sortiert werden soll.";
  }
  if (hoverReihenfolgeDerSortierung.value) {
    return "Auswahl ob das sortierbare Attribut aufsteigend oder absteigend sortiert werden soll.";
  }
  return "";
});

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
