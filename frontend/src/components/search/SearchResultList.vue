<template>
  <div
    v-if="searchResults.length > 0"
    class="py-12"
  >
    <!-- eslint-disable vue/no-unused-vars -->
    <v-hover
      v-for="(item, index) in searchResults"
      :key="index"
      v-slot="{ hover }"
    >
      <v-card
        v-if="isTypeOfInfrastrukturabfrage(item)"
        :id="'search_result_item_' + index"
        outlined
        class="mb-4 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToInfrastrukturabfrageForm(item)"
      >
        <v-card-subtitle :id="'search_result_item_' + index + '_infrastrukturabfrage_nameAbfrage'">
          {{ castToAbfrageListElementDto(item).nameAbfrage }}
          <v-spacer />
        </v-card-subtitle>
        <v-card-text>
          <span :id="'search_result_item_' + index + '_infrastrukturabfrage_stadtbezirke'">
            Stadtbezirke: {{ getStadtbezirke(castToAbfrageListElementDto(item).stadtbezirke) }}
          </span>
          <v-spacer />
          <span :id="'search_result_item_' + index + '_infrastrukturabfrage_statusAbfrage'">
            Status:
            {{ getLookupValueInfrastrukturabfrage(castToAbfrageListElementDto(item).statusAbfrage, statusAbfrageList) }}
          </span>
          <v-spacer />
          <span :id="'search_result_item_' + index + '_infrastrukturabfrage_fristStellungnahme'">
            Frist: {{ datumFormatted(castToAbfrageListElementDto(item).fristStellungnahme) }}
          </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else-if="isTypeOfBauvorhaben(item)"
        :id="'search_result_item_' + index"
        outlined
        class="mb-4 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToBauvorhabenForm(item)"
      >
        <v-card-subtitle :id="'search_result_item_' + index + '_bauvorhaben_nameVorhaben'">
          {{ castToBauvorhabenListElementDto(item).nameVorhaben }}
        </v-card-subtitle>
        <v-card-text>
          <span :id="'search_result_item_' + index + '_bauvorhaben_stadtbezirke'">
            Stadtbezirke: {{ getStadtbezirke(castToBauvorhabenListElementDto(item).stadtbezirke) }}
          </span>
          <v-spacer />
          <span :id="'search_result_item_' + index + '_bauvorhaben_grundstueckgroesse'">
            Grundstücksgröße:
            {{ getFormattedGrundstuecksgroesse(castToBauvorhabenListElementDto(item).grundstuecksgroesse) }} m²
          </span>
          <v-spacer />
          <span :id="'search_result_item_' + index + '_bauvorhaben__standVorhaben'">
            Stand:
            {{ getLookupValueBauvorhaben(castToBauvorhabenListElementDto(item).standVorhaben, standVorhabenList) }}
          </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else
        :id="'search_result_item_' + index"
        outlined
        class="mb-4 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToInfrastruktureinrichtungForm(item)"
      >
        <v-card-subtitle :id="'search_result_item_' + index + '_infrastruktureinrichtung_nameEinrichtung'">
          {{ castToInfrastruktureinrichtungListElementDto(item).nameEinrichtung }}
          <v-spacer />
        </v-card-subtitle>
        <v-card-text>
          <span :id="'search_result_item_' + index + '_infrastruktureinrichtung_infrastruktureinrichtungtyp'">
            {{
              getLookupValueInfrastruktureinrichtung(
                castToInfrastruktureinrichtungListElementDto(item).infrastruktureinrichtungTyp,
                infrastruktureinrichtungTypList
              )
            }}</span
          >
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
  <div
    v-else
    class="d-flex justify-center align-center"
    style="height: 100%; min-height: 100px"
  >
    <span>Keine Suchergebnisse vorhanden</span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import {
  AbfrageListElementDto,
  BauvorhabenListElementDto,
  InfrastruktureinrichtungListElementDto,
  LookupEntryDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  StadtbezirkDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import DefaultLayout from "@/components/DefaultLayout.vue";
import router from "@/router";
import { convertDateForFrontend } from "@/utils/Formatter";

@Component({
  components: { DefaultLayout },
})
export default class SearchResultList extends Mixins(SearchApiRequestMixin) {
  get searchResults(): Array<SearchResultDto> {
    return this.$store.getters["search/searchResults"];
  }

  get infrastruktureinrichtungTypList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  get statusAbfrageList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  get standVorhabenList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/standVorhaben"];
  }

  // Infrastrukturabfragen

  private isTypeOfInfrastrukturabfrage(searchResult: SearchResultDto): boolean {
    return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastrukturabfrage);
  }

  private castToAbfrageListElementDto(searchResult: SearchResultDto): AbfrageListElementDto {
    return searchResult as AbfrageListElementDto;
  }

  private routeToInfrastrukturabfrageForm(abfrageListElement: AbfrageListElementDto): void {
    if (!_.isUndefined(abfrageListElement.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageListElement.id },
      });
    }
  }

  private getLookupValueInfrastrukturabfrage(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }

  private getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
    const auflistungStadtbezirksbezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), [
      "nummer",
    ]).map((stadtbezirk: StadtbezirkDto) => {
      return stadtbezirk.nummer + "/" + stadtbezirk.name;
    });
    return _.join(auflistungStadtbezirksbezeichnungen, ", ");
  }

  private datumFormatted(datum: Date): string {
    return convertDateForFrontend(datum);
  }

  // Bauvorhaben

  private isTypeOfBauvorhaben(searchResult: SearchResultDto): boolean {
    return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Bauvorhaben);
  }

  private castToBauvorhabenListElementDto(searchResult: SearchResultDto): BauvorhabenListElementDto {
    return searchResult as BauvorhabenListElementDto;
  }

  private routeToBauvorhabenForm(bauvorhabenListElement: BauvorhabenListElementDto): void {
    if (!_.isNil(bauvorhabenListElement.id)) {
      router.push({
        name: "editBauvorhaben",
        params: { id: bauvorhabenListElement.id },
      });
    }
  }
  private getFormattedGrundstuecksgroesse(grundstuecksgroesse: number | undefined): string {
    return _.isNil(grundstuecksgroesse) ? "" : grundstuecksgroesse.toLocaleString("de-DE");
  }

  private getLookupValueBauvorhaben(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }

  // Infrastruktureinrichtungen

  private isTypeOfInfrastruktureinrichtung(searchResult: SearchResultDto): boolean {
    return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastruktureinrichtung);
  }

  private castToInfrastruktureinrichtungListElementDto(
    searchResult: SearchResultDto
  ): InfrastruktureinrichtungListElementDto {
    return searchResult as InfrastruktureinrichtungListElementDto;
  }

  private routeToInfrastruktureinrichtungForm(
    infrastruktureinrichtungListElement: InfrastruktureinrichtungListElementDto
  ): void {
    if (!_.isNil(infrastruktureinrichtungListElement.id)) {
      router.push({
        name: "editInfrastruktureinrichtung",
        params: { id: infrastruktureinrichtungListElement.id },
      });
    }
  }

  private getLookupValueInfrastruktureinrichtung(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }
}
</script>

<style scoped></style>
