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
          cols="11"
          md="9"
        >
          <v-text-field
            id="bauvorhabenSuch_field"
            ref="bauvorhabenSuchField"
            v-model="bauvorhabenSearchModel"
            label="Suche"
            variant="underlined"
            @keyup.enter="fetchBauvorhaben"
          />
        </v-col>
        <v-col
          cols="11"
          md="2"
          class="d-flex justify-end align-center"
        >
          <v-btn
            id="bauvorhaben_suchen_button"
            variant="outlined"
            @click="fetchBauvorhaben"
          >
            Suchen
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="11"
          md="11"
        >
          <v-select
            id="bauvorhaben_auswahl_dropdown"
            ref="bauvorhabenSelect"
            v-model="selectedBauvorhabenSearchResult"
            item-title="nameVorhaben"
            :items="bauvorhaben"
            item-value="id"
            title="Bauvorhaben auswählen"
            variant="underlined"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-card-actions class="d-flex justify-end">
        <v-spacer />
        <v-btn
          id="bauvorhaben_abbrechen_button"
          @click="bauvorhabenAuswahlAbbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          id="bauvorhaben_uebernehmen_button"
          color="primary"
          variant="elevated"
          @click="bauvorhabenUebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="loading"
      max-width="360"
      persistent
    >
      <v-list
        class="py-3"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <loading-progress-circular
          icon="mdi-file-document-refresh"
          text="Suche läuft..."
        />
      </v-list>
    </v-dialog>
    <v-dialog
      v-model="loading"
      max-width="360"
      persistent
    >
      <v-list
        class="py-3"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <loading-progress-circular
          icon="mdi-file-document-refresh"
          text="Suche läuft..."
        />
      </v-list>
    </v-dialog>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import {
  type BauvorhabenSearchResultDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import LoadingProgressCircular from "@/components/common/LoadingProgressCircular.vue";
import { VSelect } from "vuetify/components";

interface Emits {
  (event: "bauvorhabenUebernehmen", value: string): void;

  (event: "bauvorhabenAuswahlAbbrechen", value: void): void;
}

const { searchForEntities } = useSearchApi();
const emit = defineEmits<Emits>();
const dialogOpen = defineModel<boolean>({ required: true });
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);
const selectedBauvorhabenSearchResult = ref("");
const bauvorhabenSearchModel = ref("");
const loading = ref(false);
const bauvorhabenSelect = ref();

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
  if (!_.isEmpty(bauvorhabenSearchModel.value)) {
    searchQueryAndSortingDto.searchQuery = bauvorhabenSearchModel.value;
    loading.value = true;
    const searchResults = await searchForEntities(searchQueryAndSortingDto);
    bauvorhaben.value = searchResults.searchResults?.map(
      (searchResults) => searchResults as BauvorhabenSearchResultDto,
    ) as Array<BauvorhabenSearchResultDto>;
    loading.value = false;
  }

  await nextTick();
  if (bauvorhaben.value.length > 0 && bauvorhabenSelect.value) {
    bauvorhabenSelect.value.menu = true;
  }
}

function bauvorhabenUebernehmen(): void {
  emit("bauvorhabenUebernehmen", selectedBauvorhabenSearchResult.value);
  selectedBauvorhabenSearchResult.value = "";
}

function bauvorhabenAuswahlAbbrechen(): void {
  selectedBauvorhabenSearchResult.value = "";
  emit("bauvorhabenAuswahlAbbrechen");
}
</script>
