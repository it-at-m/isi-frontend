<template>
  <v-dialog
    v-model="dialogOpen"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title class="align-stretch">Mit Bauvorhaben verknüpfen</v-card-title>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhabenSuch_field"
            ref="bauvorhabenSuchField"
            v-model="bauvorhabenSearchModel"
            label="Suche"
            variant="underlined"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            variant="outlined"
            id="bauvorhaben_suchen_button"
            @click="fetchBauvorhaben()"
          >
            Suchen
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-select
            id="bauvorhaben_auswahl_dropdown"
            v-model="selectedBauvorhabenSearchResult"
            variant="underlined"
            :items="bauvorhaben"
            item-value="id"
            :item-title="nameVorhaben"
            title="Bauvorhaben auswählen"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="bauvorhaben_abbrechen_button"
          @click="bauvorhabenAuswahlAbbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          id="bauvorhaben_uebernehmen_button"
          variant="elevated"
          color="primary"
          @click="bauvorhabenUebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  type BauvorhabenDto,
  type BauvorhabenSearchResultDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import { createBauleitplanverfahrenDto, createBauvorhabenDto } from "@/utils/Factories";
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { useAbfragenApi } from "@/composables/requests/AbfragenApi";
interface Emits {
  (event: "bauvorhabenUebernehmen", value: BauvorhabenDto): void;
  (event: "bauvorhabenAuswahlAbbrechen", value: void): void;
}

const { searchForEntities } = useSearchApi();
const { getBauvorhabenById } = useBauvorhabenApi()();
const emit = defineEmits<Emits>();
const dialogOpen = defineModel<boolean>({ required: true });
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);
const selectedBauvorhabenSearchResult = ref("");
let selectedBauvorhaben = ref<BauvorhabenDto>(createBauvorhabenDto());
const bauvorhabenSearchModel = ref("");

watch(
  selectedBauvorhabenSearchResult,
  async () => {
    if (!_.isNil(selectedBauvorhabenSearchResult.value)) {
      const idBauvorhaben = selectedBauvorhabenSearchResult.value;
      selectedBauvorhaben = await getBauvorhabenById(idBauvorhaben);
    }
  },
  { immediate: true },
);
async function fetchBauvorhaben(): Promise<void> {
  const searchQueryAndSortingDto = {
    searchQuery: "",
    selectBauleitplanverfahren: false,
    selectBaugenehmigungsverfahren: false,
    selectWeiteresVerfahren: false,
    selectBauvorhaben: true,
    selectGrundschule: false,
    selectGsNachmittagBetreuung: false,
    selectHausFuerKinder: false,
    selectKindergarten: false,
    selectKinderkrippe: false,
    selectMittelschule: false,
    page: undefined,
    pageSize: undefined,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
  const searchResults = await searchForEntities(searchQueryAndSortingDto);
  bauvorhaben.value = searchResults.searchResults?.map(
    (searchResults) => searchResults as BauvorhabenSearchResultDto,
  ) as Array<BauvorhabenSearchResultDto>;
}

function abfrageUebernehmen(): void {
  selectedBauvorhabenSearchResult.value = undefined;
  emit("bauvorhabenUebernehmen", selectedBauvorhaben);
}

function uebernahmeAbbrechen(): void {
  selectedBauvorhabenSearchResult.value = undefined;
  emit("bauvorhabenAuswahlAbbrechen");
}
</script>
