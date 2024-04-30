<template>
  <field-group-card card-title="Allgemeine Informationen zum Verfahren / Bauvorhaben">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="aktenzeichen_pro_lbk_field"
          ref="aktenzeichenProLbkField"
          v-model="abfrage.aktenzeichenProLbk"
          :disabled="!isEditable"
          label="Aktenzeichen ProLBK"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          :disabled="!isEditable"
          label="Bebauungsplannummer"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          id="bauvorhaben_dropdown"
          ref="bauvorhabenDropdown"
          v-model="abfrage.bauvorhaben"
          :disabled="!(isEditableByAbfrageerstellung || isEditableBySachbearbeitung)"
          :items="bauvorhaben"
          item-text="nameVorhaben"
          item-value="id"
          label="Bauvorhaben"
          clearable
          @focus="fetchBauvorhaben"
          @change="formChanged"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          id="stand_verfahren_dropdown"
          ref="standVerfahrenDropdown"
          v-model="abfrage.standVerfahren"
          :disabled="!isEditable"
          :items="standVerfahrenBaugenehmigungsverfahren"
          item-value="key"
          item-text="value"
          :rules="[pflichtfeld, notUnspecified]"
          @change="formChanged"
        >
          <template #label> Stand des Verfahrens <span class="secondary--text">*</span> </template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="standVerfahrenFreieEingabeVisible"
            id="stand_verfahren_freie_eingabe_field"
            ref="standVerfahrenFreieEingabeField"
            v-model="abfrage.standVerfahrenFreieEingabe"
            :disabled="!isEditable"
            label="Freie Eingabe"
            maxlength="1000"
            @input="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import {
  BaugenehmigungsverfahrenDtoStandVerfahrenEnum,
  BauvorhabenSearchResultDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { useLookupStore } from "@/stores/LookupStore";
import { defineModel } from "@/utils/Vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";

interface Props {
  value: BaugenehmigungsverfahrenModel;
  isEditable?: boolean;
}

interface Emits {
  (event: "input", value: BaugenehmigungsverfahrenModel): void;
}

const { formChanged } = useSaveLeave();
const { standVerfahrenBaugenehmigungsverfahren } = useLookupStore();
const { searchForEntities } = useSearchApi();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const abfrage = defineModel(props, emit);
const standVerfahrenFreieEingabeVisible = ref(false);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

onMounted(() => fetchBauvorhaben());

watch(
  () => abfrage.value.standVerfahren,
  (value) => {
    if (value?.includes(BaugenehmigungsverfahrenDtoStandVerfahrenEnum.FreieEingabe)) {
      standVerfahrenFreieEingabeVisible.value = true;
    } else {
      standVerfahrenFreieEingabeVisible.value = false;
      abfrage.value.standVerfahrenFreieEingabe = undefined;
    }
  },
  { immediate: true },
);

/**
 * Holt alle Bauvorhaben vom Backend.
 */
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
</script>
