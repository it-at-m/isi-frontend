import { defineStore } from "pinia";
import {
  type AbfrageSearchResultDto,
  type BauvorhabenDto,
  type BauvorhabenSearchResultDto,
  type InfrastruktureinrichtungDto,
  type InfrastruktureinrichtungSearchResultDto,
  type SearchResultDto,
  type SearchResultsDto,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import { AnyAbfrageModel } from "@/types/common/Abfrage";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import _ from "lodash";

export const HINWEIS_SUCHE_STARTEN =
  "Geben Sie einen Suchbegriff ein und bestätigen Sie mit Enter oder legen Sie in den Such- und Filtereinstellungen Filter fest und klicken Sie auf „Übernehmen“.";
export const HINWEIS_KEINE_ENTITAET_MARKIERT =
  "Es wurde keine Entität für die Suche markiert. Bitte wählen Sie in den Such- und Filtereinstellungen mindestens einen Objekttyp aus und klicken Sie auf „Übernehmen“.";
export const HINWEIS_KEINE_SUCHTREFFER =
  "Es wurden keine Suchtreffer gefunden. Bitte passen Sie den Suchbegriff oder die Filter an.";

interface State {
  searchResults: SearchResultsDto;
  requestSearchQueryAndSorting: SearchQueryAndSortingModel;
  selectedAbfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined;
  defaultSearchQueryAndSortingFilter: SearchQueryAndSortingModel;
  selectedBauvorhaben: BauvorhabenModel | undefined;
  selectedInfrastruktureinrichtung: InfrastruktureinrichtungDto | undefined;
  isFilterActive: boolean;
  /**
   * Die ID des aktuell angewendeten persönlichen Filters. Liegt im Store, da der Filter sowohl über die
   * Suchleiste als auch beim Laden der Anwendung über die Profileinstellungen gesetzt werden kann.
   */
  activeFilterId: string | null;
}

export const useSearchStore = defineStore("search", {
  state: () =>
    ({
      searchResults: {},
      requestSearchQueryAndSorting: createSearchQueryAndSortingModel(),
      selectedAbfrage: undefined,
      defaultSearchQueryAndSortingFilter: createSearchQueryAndSortingModel(),
      selectedBauvorhaben: undefined,
      selectedInfrastruktureinrichtung: undefined,
      isFilterActive: false,
      activeFilterId: null,
    }) as State,
  getters: {
    /**
     * Gibt die Handlungsanweisung für die Übersicht zurück, solange keine Suchtreffer angezeigt werden.
     * Vor der ersten Suche sind die Suchergebnisse nicht gesetzt, da beim Laden keine Suche ausgelöst wird.
     */
    suchhinweis(state): string | undefined {
      if (_.isNil(state.searchResults.searchResults)) {
        return HINWEIS_SUCHE_STARTEN;
      }
      if (!_.isEmpty(state.searchResults.searchResults)) {
        return undefined;
      }
      return new SearchQueryAndSortingModel(state.requestSearchQueryAndSorting).allObjectTypesDeselected()
        ? HINWEIS_KEINE_ENTITAET_MARKIERT
        : HINWEIS_KEINE_SUCHTREFFER;
    },
  },
  actions: {
    setSearchResults(payload: SearchResultsDto): void {
      this.searchResults = payload;
    },
    removeSearchResultById(id: string): void {
      const searchResults = _.cloneDeep(this.searchResults);
      searchResults.searchResults = _.toArray(searchResults.searchResults).filter((searchResult: SearchResultDto) => {
        return !(
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Abfrage) &&
            _.isEqual(id, (searchResult as AbfrageSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Bauvorhaben) &&
            _.isEqual(id, (searchResult as BauvorhabenSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastruktureinrichtung) &&
            _.isEqual(id, (searchResult as InfrastruktureinrichtungSearchResultDto).id))
        );
      });
      this.setSearchResults(searchResults);
    },
    setRequestSearchQueryAndSorting(payload: SearchQueryAndSortingModel): void {
      this.requestSearchQueryAndSorting = payload;
    },
    setSelectedAbfrage(payload: AnyAbfrageModel | undefined): void {
      this.selectedAbfrage = payload;
    },
    setSelectedBauvorhaben(payload: BauvorhabenDto | undefined): void {
      this.selectedBauvorhaben = payload;
    },
    setSelectedInfrastruktureinrichtung(payload: InfrastruktureinrichtungDto | undefined): void {
      this.selectedInfrastruktureinrichtung = payload;
    },
    setFilterActive(active: boolean): void {
      this.isFilterActive = active;
    },
    setActiveFilterId(filterId: string | null): void {
      this.activeFilterId = filterId;
    },
  },
});
