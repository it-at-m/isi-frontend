<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Objekttyp und Sortierung </v-expansion-panel-header>
    <v-expansion-panel-content class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Objektauswahl"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Es ist mindestens ein Objekttyp auszuwählen."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverSelectAll">
            <v-chip
              class="ma-2"
              :input-value="searchQueryAndSorting.allObjectTypesSelected()"
              filter
              @click="selectAll"
            >
              Alle auswählen
            </v-chip>
          </v-hover>
          <v-hover v-model="hoverSelectBauleitplanverfahren">
            <v-checkbox
              v-model="searchQueryAndSorting.selectBauleitplanverfahren"
              :label="'Bauleitplanverfahren'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectBaugenehmigungsverfahren">
            <v-checkbox
              v-model="searchQueryAndSorting.selectBaugenehmigungsverfahren"
              :label="'Baugenehmigungsverfahren'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectWeiteresVerfahren">
            <v-checkbox
              v-model="searchQueryAndSorting.selectWeiteresVerfahren"
              :label="'Weiteres Verfahren'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectBauvorhaben">
            <v-checkbox
              v-model="searchQueryAndSorting.selectBauvorhaben"
              :label="'Bauvorhaben'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverDeselectAll">
            <v-chip
              class="ma-2"
              :input-value="searchQueryAndSorting.allObjectTypesDeselected()"
              filter
              @click="deselectAll"
            >
              Alle abwählen
            </v-chip>
          </v-hover>
          <v-hover v-model="hoverSelectGrundschule">
            <v-checkbox
              v-model="searchQueryAndSorting.selectGrundschule"
              :label="'Grundschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectGsNachmittagBetreuung">
            <v-checkbox
              v-model="searchQueryAndSorting.selectGsNachmittagBetreuung"
              :label="'Nachmittagsbetreuung für Grundschulkinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectMittelschule">
            <v-checkbox
              v-model="searchQueryAndSorting.selectMittelschule"
              :label="'Mittelschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKinderkrippe">
            <v-checkbox
              v-model="searchQueryAndSorting.selectKinderkrippe"
              :label="'Kinderkrippe'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKindergarten">
            <v-checkbox
              v-model="searchQueryAndSorting.selectKindergarten"
              :label="'Kindergarten'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectHausFuerKinder">
            <v-checkbox
              v-model="searchQueryAndSorting.selectHausFuerKinder"
              :label="'Haus für Kinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
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
      <v-divider></v-divider>
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Sortierung"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Auswahl der Art der Sortierung und der Sortierreihenfolge."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverArtDerSortierung">
            <v-select
              v-model="searchQueryAndSorting.sortBy"
              :items="entriesArtderSortierung"
              label="Art der Sortierung"
              item-value="key"
              item-text="value"
              filled
              dense
            ></v-select>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverReihenfolgeDerSortierung">
            <v-select
              v-model="searchQueryAndSorting.sortOrder"
              :items="entriesReihenfolgeDerSortierung"
              label="Sortierreihenfolge"
              item-value="key"
              item-text="value"
              filled
              dense
            ></v-select>
          </v-hover>
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import PanelHeader from "@/components/search/filter/PanelHeader.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { defineModel } from "@/utils/Vue";
import { computed } from "vue";

interface Props {
  value: SearchQueryAndSortingModel;
}

interface Emits {
  (event: "input", value: SearchQueryAndSortingModel): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const searchQueryAndSorting = defineModel(props, emits);

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

<style scoped></style>
