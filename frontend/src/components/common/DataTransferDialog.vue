<template>
  <v-dialog
    :value="steuerflag"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title
        class="text-wrap align-stretch"
        v-text="'Datenübernahme aus Abfrage'"
      />
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-select
            id="abfrage_datenuebernahme_dropdown"
            v-model="selectedAbfrageSearchResult"
            :items="abfragen"
            :item-text="(item) => getItemText(item)"
            item-value="id"
            label="Abfragen"
            return-object
            hint="Abfrage für Datenübernahme auswählen"
            persistent-hint
            @focus="fetchAbfragen"
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="abfrage_datenuebernahme_abbrechen_button"
          class="text-wrap"
          text
          @click="uebernahmeAbbrechen"
          v-text="'Abbrechen'"
        />
        <v-btn
          id="abfrage_datenuebernahme_uebernehmen_button"
          class="text-wrap"
          color="primary"
          @click="abfrageUebernehmen"
          v-text="'Übernehmen'"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Mixins, VModel, Watch, Prop } from "vue-property-decorator";
import {
  AbfrageDto,
  AbfrageSearchResultDto,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfragenApiRequestMixin";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import { useLookupStore } from "@/stores/LookupStore";
import { Context } from "@/utils/Context";

@Component
export default class DataTransferDialog extends Mixins(SearchApiRequestMixin, AbfrageApiRequestMixin) {
  @VModel({ type: Boolean }) steuerflag!: boolean;

  @Prop()
  context!: Context;

  private abfragen: Array<AbfrageSearchResultDto> = [];

  private selectedAbfrageSearchResult: AbfrageSearchResultDto = {};

  private selectedAbfrage: AbfrageDto = createBauleitplanverfahrenDto();

  private lookupStore = useLookupStore();

  mounted(): void {
    this.fetchAbfragen();
  }

  get standVerfahrenList(): LookupEntryDto[] {
    return this.lookupStore.standVerfahren;
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.lookupStore.statusAbfrage;
  }

  @Watch("selectedAbfrageSearchResult", { immediate: true })
  private transfer(): void {
    if (!_.isNil(this.selectedAbfrageSearchResult) && !_.isNil(this.selectedAbfrageSearchResult.id)) {
      const idAbfrage: string = this.selectedAbfrageSearchResult.id;
      this.getById(idAbfrage, false).then((abfrageDto: AbfrageDto) => {
        this.selectedAbfrage = abfrageDto;
      });
    }
  }

  private getItemText(searchResult: AbfrageSearchResultDto): string {
    return (
      "Name: " +
      _.defaultTo(searchResult.name, "Kein Name vorhanden") +
      " - Status: " +
      _.defaultTo(
        this.getLookupValue(searchResult.statusAbfrage, this.statusAbfrageList),
        "Kein Abfragestatus vorhanden",
      ) +
      " - Stand: " +
      _.defaultTo(
        this.getLookupValue(searchResult.standVerfahren, this.standVerfahrenList),
        "Kein Verfahrensstand vorhanden",
      )
    );
  }

  private async fetchAbfragen(): Promise<void> {
    const searchQueryAndSortingDto = {
      searchQuery: "",
      selectBauleitplanverfahren: true,
      selectBaugenehmigungsverfahren: true,
      selectWeiteresVerfahren: true,
      selectBauvorhaben: false,
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
    this.searchForEntities(searchQueryAndSortingDto).then((searchResults) => {
      this.abfragen = searchResults.searchResults
        ?.map((searchResult) => searchResult as AbfrageSearchResultDto)
        .filter(this.searchResultFilter) as Array<AbfrageSearchResultDto>;
    });
  }

  private searchResultFilter(result: AbfrageSearchResultDto): boolean {
    if (this.context === Context.ABFRAGE) {
      return (
        result.statusAbfrage !== undefined &&
        result.statusAbfrage !== StatusAbfrage.Angelegt &&
        result.statusAbfrage !== StatusAbfrage.Abbruch
      );
    } else if (this.context === Context.BAUVORHABEN) {
      return _.isNil(result.bauvorhaben);
    }

    return true;
  }

  /**
   * Holt aus der im Parameter gegebenen Lookup-Liste den darin hinterlegten Wert des im Parameter gegebenen Schlüssel.
   *
   * @param key für welchen der Wert aus der Liste geholt werden soll.
   * @param list mit den Schlüssel-Wert-Paaren.
   * @return den Wert für den Schlüssel. Ist der Parameter key oder die Liste undefined, so wird auch undefined zurückgegeben.
   */
  private getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) && !_.isNil(key)
      ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
      : key;
  }

  @Emit()
  private abfrageUebernehmen(): AbfrageDto {
    this.selectedAbfrageSearchResult = {};
    return this.selectedAbfrage;
  }

  @Emit()
  private uebernahmeAbbrechen(): void {
    this.selectedAbfrageSearchResult = {};
  }
}
</script>
