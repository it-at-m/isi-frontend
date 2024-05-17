<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="infrastruktureinrichtung_nameEinrichtung"
            v-model="infrastruktureinrichtung.nameEinrichtung"
            :rules="[pflichtfeld]"
            maxlength="255"
            validate-on="blur"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label> Name der Einrichtung <span class="text-secondary">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="infrastruktureinrichtung_adresse_component"
      v-model="infrastruktureinrichtung.adresse"
      :is-editable="isEditable"
    />
    <infrastruktureinrichtung-verortung
      v-model="infrastruktureinrichtung.verortung"
      :adresse="infrastruktureinrichtung.adresse as AdresseModel"
      :is-editable="isEditable"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_status_dropdown"
            v-model="infrastruktureinrichtung.status"
            :items="statusInfrastruktureinrichtungList"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld, notUnspecified]"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label>Status der Infrastruktureinrichtung <span class="text-secondary">*</span></template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_fertigstellungsjahr"
            v-model="infrastruktureinrichtung.fertigstellungsjahr"
            label="Fertigstellungsjahr (JJJJ)"
            class="mx-3"
            year
            :required="isFertigstellungsjahrRequired()"
            maxlength="4"
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_bauvorhaben_dropdown"
            v-model="infrastruktureinrichtung.bauvorhaben"
            :items="bauvorhaben"
            item-title="nameVorhaben"
            item-value="id"
            label="Bauvorhaben"
            clearable
            :disabled="!isEditable"
            @focus="fetchBauvorhaben"
            @update:model-value="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="flaechenAngabenCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_flaecheGesamtgrundstueck"
            v-model="infrastruktureinrichtung.flaecheGesamtgrundstueck"
            class="mx-3"
            label="Fläche Gesamtgrundstück"
            :suffix="SQUARE_METER"
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_flaecheTeilgrundstueck"
            v-model="infrastruktureinrichtung.flaecheTeilgrundstueck"
            class="mx-3"
            label="Fläche Teilgrundstück"
            :suffix="SQUARE_METER"
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  type BauvorhabenSearchResultDto,
  InfrastruktureinrichtungDtoStatusEnum,
  type SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import InfrastruktureinrichtungVerortung from "./InfrastruktureinrichtungVerortung.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import type AdresseModel from "@/types/model/common/AdresseModel";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const { searchForEntities } = useSearchApi();
withDefaults(defineProps<Props>(), { isEditable: false });
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const flaechenAngabenCardTitle = "Flächenangaben zur Einrichtung";
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);
const statusInfrastruktureinrichtungList = computed(() => lookupStore.statusInfrastruktureinrichtung);

onMounted(() => fetchBauvorhaben());

function isFertigstellungsjahrRequired(): boolean {
  return infrastruktureinrichtung.value.status !== InfrastruktureinrichtungDtoStatusEnum.Bestand;
}

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
