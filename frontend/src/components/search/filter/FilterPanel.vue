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
      <p class="font-weight-black mt-3">Allgemein</p>
      <p class="font-weight-regular mb-3">Übergreifende Filtereinstellungen</p>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-radio-group
            v-model="sobonRelevant"
            @update:model-value="sobonRelevantChanged"
            @mouseover="hoverFilterSobonRelevant = true"
            @mouseleave="hoverFilterSobonRelevant = false"
            inline
          >
            <template #label> SoBoN-relevanz </template>
            <v-radio
              label="Alle"
              value="Unspecified"
            />
            <v-radio
              label="SoBoN-relevant"
              value="false"
            />
            <v-radio
              label="Nicht SoBoN-relevant"
              value="true"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextAllgemeineFiltereinstellungen }}
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="8"
        >
          <v-autocomplete
            id="stand_verfahren_bauvorhaben"
            v-model="searchQueryAndSorting.filterStandVerfahren"
            :items="standVerfahrenList"
            variant="underlined"
            item-value="key"
            item-title="value"
            multiple
            chips
            @mouseover="hoverFilterStandVerfahren = true"
            @mouseleave="hoverFilterStandVerfahren = false"
          >
            <template #label> Stand des Verfahrens </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
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
      <p class="font-weight-black mt-3">Abfrage</p>
      <p class="font-weight-regular mb-3">Abfragebezogene Filtereinstellungen</p>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfrage_realisierungsbeginn_von"
            v-model="searchQueryAndSorting.filterRealisierungsbeginnVon"
            label="Realisierungsbeginn von (JJJJ)"
            year
            maxlength="4"
            @mouseover="hoverFilterRealisierungsbeginnVon = true"
            @mouseleave="hoverFilterRealisierungsbeginnVon = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfrage_realisierungsbeginn_bis"
            v-model="searchQueryAndSorting.filterRealisierungsbeginnBis"
            label="Realisierungsbeginn bis (JJJJ)"
            year
            maxlength="4"
            @mouseover="hoverFilterRealisierungsbeginnBis = true"
            @mouseleave="hoverFilterRealisierungsbeginnBis = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFilterRealisierungsbeginn }}
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-checkbox
            id="eigene_abfragen"
            v-model="searchQueryAndSorting.filterNurEigeneAbfragen"
            class="mx-3"
            label="Nur eigene Abfragen berücksichtigen"
            color="primary"
          />
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="8"
        >
          <v-autocomplete
            id="abfrage_status"
            v-model="searchQueryAndSorting.filterStatusAbfrage"
            :items="statusAbfrageList"
            variant="underlined"
            item-value="key"
            item-title="value"
            multiple
            chips
            @mouseover="hoverFilterStatusAbfrage = true"
            @mouseleave="hoverFilterStatusAbfrage = false"
          >
            <template #label> Status Abfrage </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFilterStatusAbfrage }}
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="we_gesamt_von_"
            v-model="searchQueryAndSorting.filterWeGesamtVon"
            label="Geplante Wohneinheiten von"
            integer
            @mouseover="hoverFilterWeGesamtVon = true"
            @mouseleave="hoverFilterWeGesamtVon = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="we_gesamt_von_"
            v-model="searchQueryAndSorting.filterWeGesamtBis"
            label="Geplante Wohneinheiten bis"
            integer
            @mouseover="hoverFilterWeGesamtBis = true"
            @mouseleave="hoverFilterWeGesamtBis = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFilterWeGesamt }}
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="gf_wohnen_geplant_von"
            v-model="searchQueryAndSorting.filterGfWohnenGeplantVon"
            label="Geplante Geschossfläche Wohnen von"
            :suffix="SQUARE_METER"
            @mouseover="hoverFilterGfWohnenGeplantVon = true"
            @mouseleave="hoverFilterGfWohnenGeplantVon = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="gf_wohnen_geplant_bis"
            v-model="searchQueryAndSorting.filterGfWohnenGeplantBis"
            label="Geplante Geschossfläche Wohnen bis"
            :suffix="SQUARE_METER"
            @mouseover="hoverFilterGfWohnenGeplantBis = true"
            @mouseleave="hoverFilterGfWohnenGeplantBis = false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextFilterGfWohnenGeplant }}
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
          md="8"
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
          md="4"
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
import NumField from "@/components/common/NumField.vue";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";

onMounted(() => {
  switch (searchQueryAndSorting.value.filterSobonRelevant) {
    case UncertainBoolean.True:
      sobonRelevant.value = "true";
      break;
    case UncertainBoolean.False:
      sobonRelevant.value = "false";
      break;
    case UncertainBoolean.Unspecified:
      sobonRelevant.value = "Unspecified";
      break;
    default:
      sobonRelevant.value = UncertainBoolean.Unspecified;
      break;
  }
});

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

const hoverFiltereinstellungenAufheben = ref<boolean>(false);
const hoverFilterStadtbezirkName = ref<boolean>(false);
const hoverFilterKitaplanungsbereichKitaPlbT = ref<boolean>(false);
const hoverFilterGrundschulsprengelNummer = ref<boolean>(false);
const hoverFilterMittelschulsprengelNummer = ref<boolean>(false);
const hoverFilterRealisierungsbeginnVon = ref<boolean>(false);
const hoverFilterRealisierungsbeginnBis = ref<boolean>(false);
const hoverFilterWeGesamtVon = ref<boolean>(false);
const hoverFilterWeGesamtBis = ref<boolean>(false);
const hoverFilterGfWohnenGeplantVon = ref<boolean>(false);
const hoverFilterGfWohnenGeplantBis = ref<boolean>(false);
const hoverFilterStatusAbfrage = ref<boolean>(false);
const hoverFilterSobonRelevant = ref<boolean>(false);
const hoverFilterStandVerfahren = ref<boolean>(false);

const sobonRelevant = ref<string | undefined>(undefined);

const lookupStore = useLookupStore();
const statusAbfrageList = computed(() => lookupStore.statusAbfrage);
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

const helpTextAllgemeineFiltereinstellungen = computed(() => {
  if (hoverFilterSobonRelevant.value) {
    return "Filtern nach SoBoN-relevanten Abfragen und Bauvorhaben.";
  }
  if (hoverFilterStandVerfahren.value) {
    return "Auswahl der Verfahrensstände nach denen in Abfragen und Bauvorhaben gefiltert werden soll.";
  }
  return "";
});

const helpTextFiltereinstellungenAufheben = computed(() => {
  if (hoverFiltereinstellungenAufheben.value) {
    return "Mit einem Klick werden alle Filtereintellungen aufgehoben.";
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

const helpTextFilterRealisierungsbeginn = computed(() => {
  if (hoverFilterRealisierungsbeginnVon.value) {
    return "Bestimmt auf Basis des Attributs 'Realisierung von' die untere Grenze der Abfragen nach denen gefiltert werden soll.";
  }
  if (hoverFilterRealisierungsbeginnBis.value) {
    return "Bestimmt auf Basis des Attributs 'Realisierung von' die obere Grenze der Abfragen nach denen gefiltert werden soll.";
  }
  return "";
});

const helpTextFilterWeGesamt = computed(() => {
  if (hoverFilterWeGesamtVon.value) {
    return "Bestimmt für die Abfragen nach denen gefiltert werden soll die untere Grenze der geplanten Wohneinheiten.";
  }
  if (hoverFilterWeGesamtBis.value) {
    return "Bestimmt für die Abfragen nach denen gefiltert werden soll die obere Grenze der geplanten Wohneinheiten.";
  }
  return "";
});

const helpTextFilterGfWohnenGeplant = computed(() => {
  if (hoverFilterGfWohnenGeplantVon.value) {
    return "Bestimmt für die Abfragen nach denen gefiltert werden soll die untere Grenze der geplanten Geschossfläche Wohnen.";
  }
  if (hoverFilterGfWohnenGeplantBis.value) {
    return "Bestimmt für die Abfragen nach denen gefiltert werden soll die obere Grenze der geplanten Geschossfläche Wohnen.";
  }
  return "";
});

const helpTextFilterStatusAbfrage = computed(() => {
  if (hoverFilterStatusAbfrage.value) {
    return "Auswahl der Abfragestatus nach denen gefiltert werden soll.";
  }
  return "";
});

function alleFiltereinstellungenAufheben(): void {
  searchQueryAndSorting.value.filterStadtbezirkNummer = undefined;
  searchQueryAndSorting.value.filterKitaplanungsbereichKitaPlbT = undefined;
  searchQueryAndSorting.value.filterGrundschulsprengelNummer = undefined;
  searchQueryAndSorting.value.filterMittelschulsprengelNummer = undefined;
  searchQueryAndSorting.value.filterRealisierungsbeginnVon = undefined;
  searchQueryAndSorting.value.filterRealisierungsbeginnBis = undefined;
  searchQueryAndSorting.value.filterNurEigeneAbfragen = undefined;
  searchQueryAndSorting.value.filterStatusAbfrage = undefined;
  searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
  searchQueryAndSorting.value.filterWeGesamtVon = undefined;
  searchQueryAndSorting.value.filterWeGesamtBis = undefined;
  searchQueryAndSorting.value.filterGfWohnenGeplantVon = undefined;
  searchQueryAndSorting.value.filterGfWohnenGeplantBis = undefined;
  searchQueryAndSorting.value.filterStandVerfahren = undefined;
  searchQueryAndSorting.value.filterInfrastruktureinrichtungStatus = undefined;
  sobonRelevant.value = UncertainBoolean.Unspecified;
}

function sobonRelevantChanged(): void {
  switch (sobonRelevant.value) {
    case "true":
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.True;
      break;
    case "false":
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.False;
      break;
    case "Unspecified":
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
      break;
    default:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
  }
}
</script>
