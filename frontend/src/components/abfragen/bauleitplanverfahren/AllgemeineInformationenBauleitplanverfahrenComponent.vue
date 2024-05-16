<template>
  <field-group-card card-title="Allgemeine Informationen zum Verfahren / Bauvorhaben">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          :disabled="!isEditable"
          label="Bebauungsplannummer"
          maxlength="255"
          @update:model-value="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          id="bauvorhaben_dropdown"
          ref="bauvorhabenDropdown"
          v-model="abfrage.bauvorhaben"
          :disabled="!(isEditableByAbfrageerstellung || isEditableBySachbearbeitung)"
          :items="bauvorhaben"
          item-title="nameVorhaben"
          item-value="id"
          label="Bauvorhaben"
          clearable
          @focus="fetchBauvorhaben"
          @update:model-value="formChanged"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <tri-switch
          id="sobon_relevant_triswitch"
          ref="sobonRelevantTriswitch"
          v-model="abfrage.sobonRelevant"
          :disabled="!isEditable"
          off-text="Nein"
          on-text="Ja"
          :rules="[notUnspecified]"
        >
          <template #label> SoBoN-relevant <span class="text-secondary">*</span> </template>
        </tri-switch>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-select
            v-if="sobonJahrVisible"
            id="sobon_jahr_dropdown"
            ref="sobonJahrDropdown"
            v-model="abfrage.sobonJahr"
            :disabled="!isEditable"
            :items="sobonVerfahrensgrundsaetzeJahr"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld]"
            @update:model-value="formChanged"
          >
            <template #label>
              Jahr der anzuwendenden Verfahrensgrundsätze <span class="text-secondary">*</span>
            </template>
          </v-select>
        </v-slide-y-reverse-transition>
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
          :items="standVerfahrenBauleitplanverfahren"
          item-value="key"
          item-title="value"
          :rules="[pflichtfeld, notUnspecified]"
          @update:model-value="formChanged"
        >
          <template #label> Stand des Verfahrens <span class="text-secondary">*</span> </template>
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
            @update:model-value="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import {
  type BauvorhabenSearchResultDto,
  type SearchQueryAndSortingDto,
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  UncertainBoolean,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const { sobonVerfahrensgrundsaetzeJahr, standVerfahrenBauleitplanverfahren } = useLookupStore();
const { searchForEntities } = useSearchApi();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const abfrage = defineModel<BauleitplanverfahrenModel>({ required: true });
const standVerfahrenFreieEingabeVisible = ref(false);
const sobonJahrVisible = ref(false);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

withDefaults(defineProps<Props>(), { isEditable: false });

onMounted(() => fetchBauvorhaben());

watch(
  () => abfrage.value.standVerfahren,
  (value) => {
    if (value?.includes(BauleitplanverfahrenDtoStandVerfahrenEnum.FreieEingabe)) {
      standVerfahrenFreieEingabeVisible.value = true;
    } else {
      standVerfahrenFreieEingabeVisible.value = false;
      abfrage.value.standVerfahrenFreieEingabe = undefined;
    }
  },
  { immediate: true },
);

watch(
  () => abfrage.value.sobonRelevant,
  (value) => {
    if (value === UncertainBoolean.True) {
      sobonJahrVisible.value = true;
    } else {
      sobonJahrVisible.value = false;
      abfrage.value.sobonJahr = undefined;
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
  } as SearchQueryAndSortingDto;
  const searchResults = await searchForEntities(searchQueryAndSortingDto);
  bauvorhaben.value = searchResults.searchResults?.map(
    (searchResults) => searchResults as BauvorhabenSearchResultDto,
  ) as Array<BauvorhabenSearchResultDto>;
}
</script>
