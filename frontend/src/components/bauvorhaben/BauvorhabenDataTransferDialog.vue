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
            id="bauvorhaben_abfrage_datenuebernahme_dropdown"
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
          id="bauvorhaben_abfrage_datenuebernahme_abbrechen_button"
          class="text-wrap"
          text
          @click="uebernahmeAbbrechen"
          v-text="'Abbrechen'"
        />
        <v-btn
          id="bauvorhaben_abfrage_datenuebernahme_uebernehmen_button"
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
import { Component, Emit, Mixins, VModel, Watch } from "vue-property-decorator";
import {
  AbfrageSearchResultDto,
  BauleitplanverfahrenDto,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfragenApiRequestMixin";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component
export default class BauvorhabenDataTransferDialog extends Mixins(SearchApiRequestMixin, AbfrageApiRequestMixin) {
  @VModel({ type: Boolean }) steuerflag!: boolean;

  private abfragen: Array<AbfrageSearchResultDto> = [];

  private selectedAbfrageSearchResult: AbfrageSearchResultDto = {};

  private selectedAbfrage: BauleitplanverfahrenDto = createBauleitplanverfahrenDto();

  mounted(): void {
    this.fetchAbfragen();
  }

  get standVerfahrenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVerfahren"];
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  @Watch("selectedAbfrageSearchResult", { immediate: true })
  private transferToBauvorhaben(): void {
    if (!_.isNil(this.selectedAbfrageSearchResult) && !_.isNil(this.selectedAbfrageSearchResult.id)) {
      const idAbfrage: string = this.selectedAbfrageSearchResult.id;
      this.getById(idAbfrage, false).then((abfrageDto: BauleitplanverfahrenDto) => {
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
        .filter((abfrageSearchResult) => _.isNil(abfrageSearchResult.bauvorhaben)) as Array<AbfrageSearchResultDto>;
    });
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
  private abfrageUebernehmen(): BauleitplanverfahrenDto {
    this.selectedAbfrageSearchResult = {};
    return this.selectedAbfrage;
  }

  @Emit()
  private uebernahmeAbbrechen(): void {
    this.selectedAbfrageSearchResult = {};
  }
}
</script>
