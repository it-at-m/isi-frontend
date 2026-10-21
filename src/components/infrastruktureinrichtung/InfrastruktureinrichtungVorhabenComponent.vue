<template>
  <v-autocomplete
    id="infrastruktureinrichtung_bauvorhaben_dropdown"
    v-model="infrastruktureinrichtung.bauvorhaben"
    :items="bauvorhaben"
    variant="underlined"
    item-title="nameVorhaben"
    item-value="id"
    label="Vorhaben"
    clearable
    :readonly="!isEditable"
    @update:focused="!$event || fetchBauvorhaben()"
    @update:model-value="formChanged"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
  />
</template>

<script setup lang="ts">
import {
  type BauvorhabenSearchResultDto,
  type SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useSaveLeave } from "@/composables/SaveLeave";
import { onMounted, ref } from "vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const { searchForEntities } = useSearchApi();
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

onMounted(() => fetchBauvorhaben());

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
    selectNachbarschaftstreff: false,
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
