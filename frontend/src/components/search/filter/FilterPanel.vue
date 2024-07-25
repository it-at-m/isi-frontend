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
                filter
                @click="alleFiltereinstellungenAufheben"
                v-bind="activatorProps"
              >
                Filtereinstellungen aufheben
              </v-chip>
            </template>
            <span> Mit einem Klick werden alle Filtereintellungen aufgehoben. </span>
          </v-tooltip>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
      <p class="font-weight-black mt-3">Allgemein</p>
      <p class="font-weight-regular mb-3">Übergreifende Filtereinstellungen</p>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-radio-group
            v-model="sobonRelevant"
            inline
            @update:model-value="sobonRelevantChanged"
          >
            <template #label> SoBoN-relevanz</template>
            <v-tooltip
              location="top"
              offset="20"
              open-delay="500"
            >
              <template #activator="{ props: activatorProps }">
                <v-radio
                  label="Alle"
                  v-bind="activatorProps"
                  :value="UncertainBoolean.Unspecified"
                />
              </template>
              <span> Es wird keine Filterung nach SoBoN-relevanz durchgeführt </span>
            </v-tooltip>
            <v-tooltip
              location="top"
              offset="20"
              open-delay="500"
            >
              <template #activator="{ props: activatorProps }">
                <v-radio
                  label="SoBoN-relevant"
                  v-bind="activatorProps"
                  :value="UncertainBoolean.True"
                />
              </template>
              <span> Filtern nach SoBoN-relevanten Abfragen und Bauvorhaben. </span>
            </v-tooltip>
            <v-tooltip
              location="top"
              offset="20"
              open-delay="500"
            >
              <template #activator="{ props: activatorProps }">
                <v-radio
                  label="Nicht SoBoN-relevant"
                  v-bind="activatorProps"
                  :value="UncertainBoolean.False"
                />
              </template>
              <span> Filtern nach nicht SoBoN-relevanten Abfragen und Bauvorhaben. </span>
            </v-tooltip>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="12"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-autocomplete
                id="stand_verfahren_bauvorhaben"
                v-model="searchQueryAndSorting.filterStandVerfahren"
                :items="standVerfahrenList"
                chips
                item-title="value"
                item-value="key"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              >
                <template #label> Stand des Verfahrens</template>
              </v-autocomplete>
            </template>
            <span> Auswahl der Verfahrensstände nach denen in Abfragen und Bauvorhaben gefiltert werden soll. </span>
          </v-tooltip>
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
          md="6"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-combobox
                v-model="searchQueryAndSorting.filterStadtbezirkNummer"
                :append-icon="''"
                chips
                closable-chips
                density="default"
                hide-no-data
                hint="z.B. 05 oder 14"
                label="Nummern der Stadtbezirke"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              />
            </template>
            <span> Eingabe der Stadtbezirksnummern nach denen gefiltert werden soll. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-combobox
                v-model="searchQueryAndSorting.filterKitaplanungsbereichKitaPlbT"
                :append-icon="''"
                chips
                closable-chips
                density="default"
                hide-no-data
                hint="z.B. 5.1 oder 16.2"
                label="Nummern der Kitaplanungsbereiche"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              />
            </template>
            <span> Eingabe der Kitaplanungsbereichsnummern nach denen gefiltert werden soll. </span>
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
              <v-combobox
                v-model="searchQueryAndSorting.filterGrundschulsprengelNummer"
                :append-icon="''"
                chips
                closable-chips
                density="default"
                hide-no-data
                hint="z.B. 2165"
                label="Nummern der Grundschulsprengel"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              />
            </template>
            <span> Eingabe der Grundschulsprengelnummern nach denen gefiltert werden soll. </span>
          </v-tooltip>
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-combobox
                v-model="searchQueryAndSorting.filterMittelschulsprengelNummer"
                :append-icon="''"
                chips
                closable-chips
                density="default"
                hide-no-data
                hint="z.B. 1275"
                label="Nummern der Mittelschulsprengel"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              />
            </template>
            <span> Eingabe der Mittelschulsprengelnummern nach denen gefiltert werden soll. </span>
          </v-tooltip>
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
          md="12"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-checkbox
                id="eigene_abfragen"
                v-model="searchQueryAndSorting.filterNurEigeneAbfragen"
                class="mx-3"
                color="primary"
                label="Nur selbst erstellte Abfragen berücksichtigen"
                v-bind="activatorProps"
              />
            </template>
            <span> Ermöglicht die Filterung nach Abfragen welche selbst angelegt wurden. </span>
          </v-tooltip>
        </v-col>
      </v-row>
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
              <num-field
                id="abfrage_realisierungsbeginn_von"
                v-model="searchQueryAndSorting.filterRealisierungsbeginnVon"
                label="Realisierungsbeginn von (JJJJ)"
                maxlength="4"
                v-bind="activatorProps"
                year
              />
            </template>
            <span>
              Bestimmt auf Basis des Attributs 'Realisierung von' die untere Grenze der Abfragen nach denen gefiltert
              werden soll.
            </span>
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
              <num-field
                id="abfrage_realisierungsbeginn_bis"
                v-model="searchQueryAndSorting.filterRealisierungsbeginnBis"
                label="Realisierungsbeginn bis (JJJJ)"
                maxlength="4"
                v-bind="activatorProps"
                year
              />
            </template>
            <span>
              Bestimmt auf Basis des Attributs 'Realisierung von' die obere Grenze der Abfragen nach denen gefiltert
              werden soll.
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="12"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-autocomplete
                id="abfrage_status"
                v-model="searchQueryAndSorting.filterStatusAbfrage"
                :items="statusAbfrageList"
                chips
                item-title="value"
                item-value="key"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              >
                <template #label> Status Abfrage</template>
              </v-autocomplete>
            </template>
            <span> Auswahl der Abfragestatus nach denen gefiltert werden soll. </span>
          </v-tooltip>
        </v-col>
      </v-row>
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
              <num-field
                id="we_gesamt_von_"
                v-model="searchQueryAndSorting.filterWeGesamtVon"
                integer
                label="Geplante Wohneinheiten von"
                v-bind="activatorProps"
              />
            </template>
            <span>
              Bestimmt für die Abfragen nach denen gefiltert werden soll die untere Grenze der geplanten Wohneinheiten.
            </span>
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
              <num-field
                id="we_gesamt_von_"
                v-model="searchQueryAndSorting.filterWeGesamtBis"
                integer
                label="Geplante Wohneinheiten bis"
                v-bind="activatorProps"
              />
            </template>
            <span>
              Bestimmt für die Abfragen nach denen gefiltert werden soll die obere Grenze der geplanten Wohneinheiten.
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
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
              <num-field
                id="gf_wohnen_geplant_von"
                v-model="searchQueryAndSorting.filterGfWohnenGeplantVon"
                :suffix="SQUARE_METER"
                label="Geplante Geschossfläche Wohnen von"
                v-bind="activatorProps"
              />
            </template>
            <span>
              Bestimmt für die Abfragen nach denen gefiltert werden soll die untere Grenze der geplanten Geschossfläche
              Wohnen.
            </span>
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
              <num-field
                id="gf_wohnen_geplant_bis"
                v-model="searchQueryAndSorting.filterGfWohnenGeplantBis"
                :suffix="SQUARE_METER"
                label="Geplante Geschossfläche Wohnen bis"
                v-bind="activatorProps"
              />
            </template>
            <span>
              Bestimmt für die Abfragen nach denen gefiltert werden soll die obere Grenze der geplanten Geschossfläche
              Wohnen.
            </span>
          </v-tooltip>
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
          md="12"
        >
          <v-tooltip
            location="top"
            offset="20"
            open-delay="500"
          >
            <template #activator="{ props: activatorProps }">
              <v-autocomplete
                id="infrastruktureinrichtung_status"
                v-model="searchQueryAndSorting.filterInfrastruktureinrichtungStatus"
                :items="statusInfrastruktureinrichtungList"
                chips
                item-title="value"
                item-value="key"
                multiple
                v-bind="activatorProps"
                variant="underlined"
              >
                <template #label> Status Infrastruktureinrichtung</template>
              </v-autocomplete>
            </template>
            <span> Auswahl der Status von Infrastruktureinrichtungen nach denen gefiltert werden soll. </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { computed, onMounted, ref } from "vue";
import { useLookupStore } from "@/stores/LookupStore";
import { UncertainBoolean } from "@/api/api-client/isi-backend";
import NumField from "@/components/common/NumField.vue";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";

onMounted(() => {
  switch (searchQueryAndSorting.value.filterSobonRelevant) {
    case UncertainBoolean.True:
      sobonRelevant.value = UncertainBoolean.True;
      break;
    case UncertainBoolean.False:
      sobonRelevant.value = UncertainBoolean.False;
      break;
    case UncertainBoolean.Unspecified:
      sobonRelevant.value = UncertainBoolean.Unspecified;
      break;
    default:
      sobonRelevant.value = UncertainBoolean.Unspecified;
      break;
  }
});

const searchQueryAndSorting = defineModel<SearchQueryAndSortingModel>({ required: true });

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
    case UncertainBoolean.True:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.True;
      break;
    case UncertainBoolean.False:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.False;
      break;
    case UncertainBoolean.Unspecified:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
      break;
    default:
      searchQueryAndSorting.value.filterSobonRelevant = UncertainBoolean.Unspecified;
  }
}
</script>
