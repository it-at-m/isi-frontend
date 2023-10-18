<template>
  <v-list
    v-if="searchResultsAsArray.length > 0"
    v-scroll.self="onScroll"
    :height="viewportHeight"
    class="pa-0 ma-0 overflow-y-auto"
  >
    <!-- eslint-disable vue/no-unused-vars -->
    <v-hover
      v-for="(item, index) in searchResultsAsArray"
      :key="index"
      v-slot="{ hover }"
    >
      <v-card
        v-if="isTypeOfAbfrage(item)"
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToAbfrageForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="green lighten-1"
          >
            mdi-comment-alert
          </v-icon>
          {{ castToAbfrageSearchResultDto(item).name }}
        </v-card-subtitle>
        <v-card-text>
          <span> Stadtbezirke: {{ getStadtbezirke(castToAbfrageSearchResultDto(item).stadtbezirke) }} </span>
          <v-spacer />
          <span>
            Status:
            {{ getLookupValueAbfrage(castToAbfrageSearchResultDto(item).statusAbfrage, statusAbfrageList) }}
          </span>
          <v-spacer />
          <span> Frist: {{ datumFormatted(castToAbfrageSearchResultDto(item).fristBearbeitung) }} </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else-if="isTypeOfBauvorhaben(item)"
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToBauvorhabenForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="indigo lighten-1"
          >
            mdi-account-hard-hat
          </v-icon>
          {{ castToBauvorhabenSearchResultDto(item).nameVorhaben }}
        </v-card-subtitle>
        <v-card-text>
          <span> Stadtbezirke: {{ getStadtbezirke(castToBauvorhabenSearchResultDto(item).stadtbezirke) }} </span>
          <v-spacer />
          <span>
            Grundstücksgröße:
            {{ getFormattedGrundstuecksgroesse(castToBauvorhabenSearchResultDto(item).grundstuecksgroesse) }} m²
          </span>
          <v-spacer />
          <span>
            Stand:
            {{ getLookupValueBauvorhaben(castToBauvorhabenSearchResultDto(item).standVorhaben, standVerfahrenList) }}
          </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToInfrastruktureinrichtungForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="red lighten-1"
          >
            mdi-home
          </v-icon>
          {{ castToInfrastruktureinrichtungSearchResultDto(item).nameEinrichtung }}
        </v-card-subtitle>
        <v-card-text>
          <span>
            {{
              getLookupValueInfrastruktureinrichtung(
                castToInfrastruktureinrichtungSearchResultDto(item).infrastruktureinrichtungTyp,
                infrastruktureinrichtungTypList,
              )
            }}</span
          >
        </v-card-text>
      </v-card>
    </v-hover>
  </v-list>
  <v-container
    v-else
    class="pa-0 ma-0 w-100 d-flex justify-center align-center"
    style="height: 100%; min-height: 100px"
  >
    <span>Keine Suchergebnisse vorhanden</span>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import {
  AbfrageSearchResultDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  SearchResultsDto,
  StadtbezirkDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import DefaultLayout from "@/components/DefaultLayout.vue";
import router from "@/router";
import { convertDateForFrontend } from "@/utils/Formatter";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import { Mutex, tryAcquire } from "async-mutex";

@Component({
  components: { DefaultLayout },
})
export default class SearchResultList extends Mixins(SearchApiRequestMixin) {
  private pageRequestMutex = new Mutex();

  /**
   * Berechnet die Höhe der verfübaren Listenhöhe in "vh" (Höhe Viewport in Hundert).
   * Die Höhe des App-Headers wird mit 50px angesetzt.
   */
  get viewportHeight(): string {
    const heightOfWindow = this.$vuetify.breakpoint.height;
    return (heightOfWindow - 50) / (heightOfWindow / 100) + "vh";
  }

  get searchResultsAsArray(): Array<SearchResultDto> {
    return _.cloneDeep(this.$store.getters["search/searchResults"].searchResults);
  }

  get infrastruktureinrichtungTypList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  get statusAbfrageList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  get standVerfahrenList(): Array<LookupEntryDto> {
    return this.$store.getters["lookup/standVerfahren"];
  }

  get getSearchQueryAndSorting(): SearchQueryAndSortingDto {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  get searchResults(): SearchResultsDto {
    return _.cloneDeep(this.$store.getters["search/searchResults"]);
  }

  get numberOfPossiblePages(): number {
    const numberOfPossiblePages = this.searchResults.numberOfPages;
    return _.isNil(numberOfPossiblePages) ? 0 : numberOfPossiblePages;
  }

  /**
   * Diese Methode prüft, ob der Scrollbalken der Suchergebnisliste am Ende der Liste angekommen ist und triggert dann
   * den Suchrequest zum Holen der nächsten Seite und Anfügen der Suchergebnisse an die bestehenden Suchergebnisse.
   *
   * Des Weiteren wird der Request zum Holen der nächsten Seite nur dann getriggert, wenn kein anderer Request
   * zum Holen der nächsten Seite ausgeführt wird.
   */
  private onScroll(scrollEvent: any) {
    const { scrollHeight, scrollTop, clientHeight } = scrollEvent.target;
    // Prüfung ob das Ende des Scrollbereichs erreicht wurde.
    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
      this.getAndAppendSearchResultsNextPage();
    }
  }

  /**
   * Holt die Suchergebnisse auf Basis des im Store hinterlegten SearchQueryAndSortingDto für die nächste Seite
   * und fügt die bestehenden Suchergebnisse an die bereits vorhandenen Suchergebnisse an.
   *
   * Die Ausführung der Suchen und das Speichern der Suchergebnisse im Store wird mittels eines Mutex abgesichert,
   * um eine Race-Condition bei mehreren schnell hintereinander ausgeführten Seitenaufrufen zu vermeiden.
   */
  private getAndAppendSearchResultsNextPage(): void {
    tryAcquire(this.pageRequestMutex)
      .acquire()
      .then(() => {
        const searchQueryForEntitiesDto = this.getSearchQueryAndSorting;
        let currentPage = searchQueryForEntitiesDto.page;
        if (!_.isNil(currentPage) && ++currentPage <= this.numberOfPossiblePages) {
          searchQueryForEntitiesDto.page = currentPage;
          this.$store.commit("search/requestSearchQueryAndSorting", searchQueryForEntitiesDto);
          this.searchForEntities(searchQueryForEntitiesDto)
            .then((searchResultsNextPage) => {
              const currentSearchResults = this.searchResults;
              searchResultsNextPage.searchResults = _.concat(
                _.toArray(currentSearchResults.searchResults),
                _.toArray(searchResultsNextPage.searchResults),
              );
              this.$store.commit("search/searchResults", _.cloneDeep(searchResultsNextPage));
            })
            .finally(() => this.pageRequestMutex.release());
        } else {
          this.pageRequestMutex.release();
        }
      });
  }

  // Type: ABFRAGE

  private isTypeOfAbfrage(searchResult: SearchResultDto): boolean {
    return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Abfrage);
  }

  private castToAbfrageSearchResultDto(searchResult: SearchResultDto): AbfrageSearchResultDto {
    return searchResult as AbfrageSearchResultDto;
  }

  private routeToAbfrageForm(abfrageSearchResult: AbfrageSearchResultDto): void {
    if (!_.isUndefined(abfrageSearchResult.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageSearchResult.id },
      });
    }
  }

  private getLookupValueAbfrage(key: string, list: Array<LookupEntryDto>): string | undefined {
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

  private castToBauvorhabenSearchResultDto(searchResult: SearchResultDto): BauvorhabenSearchResultDto {
    return searchResult as BauvorhabenSearchResultDto;
  }

  private routeToBauvorhabenForm(bauvorhabenSearchResult: BauvorhabenSearchResultDto): void {
    if (!_.isNil(bauvorhabenSearchResult.id)) {
      router.push({
        name: "editBauvorhaben",
        params: { id: bauvorhabenSearchResult.id },
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

  private castToInfrastruktureinrichtungSearchResultDto(
    searchResult: SearchResultDto,
  ): InfrastruktureinrichtungSearchResultDto {
    return searchResult as InfrastruktureinrichtungSearchResultDto;
  }

  private routeToInfrastruktureinrichtungForm(
    infrastruktureinrichtungSearchResult: InfrastruktureinrichtungSearchResultDto,
  ): void {
    if (!_.isNil(infrastruktureinrichtungSearchResult.id)) {
      router.push({
        name: "editInfrastruktureinrichtung",
        params: { id: infrastruktureinrichtungSearchResult.id },
      });
    }
  }

  private getLookupValueInfrastruktureinrichtung(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }
}
</script>

<style scoped></style>
