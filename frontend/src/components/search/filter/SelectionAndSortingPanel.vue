<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Objekttyp und Sortierung </v-expansion-panel-header>
    <v-expansion-panel-content class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Objektauswahl"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Es ist mindestens ein Objekttyp auszuwählen."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverSelectAll">
            <v-chip
              class="ma-2"
              :input-value="searchQueryAndSorting.allObjectTypesSelected()"
              filter
              @click="selectAll"
            >
              Alle auswählen
            </v-chip>
          </v-hover>
          <v-hover v-model="hoverSelectBauleitplanverfahren">
            <v-checkbox
              v-model="searchQueryAndSorting.selectBauleitplanverfahren"
              :label="'Bauleitplanverfahren'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectBauvorhaben">
            <v-checkbox
              v-model="searchQueryAndSorting.selectBauvorhaben"
              :label="'Bauvorhaben'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverDeselectAll">
            <v-chip
              class="ma-2"
              :input-value="searchQueryAndSorting.allObjectTypesDeselected()"
              filter
              @click="deselectAll"
            >
              Alle abwählen
            </v-chip>
          </v-hover>
          <v-hover v-model="hoverSelectGrundschule">
            <v-checkbox
              v-model="searchQueryAndSorting.selectGrundschule"
              :label="'Grundschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectGsNachmittagBetreuung">
            <v-checkbox
              v-model="searchQueryAndSorting.selectGsNachmittagBetreuung"
              :label="'Nachmittagsbetreuung für Grundschulkinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectMittelschule">
            <v-checkbox
              v-model="searchQueryAndSorting.selectMittelschule"
              :label="'Mittelschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKinderkrippe">
            <v-checkbox
              v-model="searchQueryAndSorting.selectKinderkrippe"
              :label="'Kinderkrippe'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKindergarten">
            <v-checkbox
              v-model="searchQueryAndSorting.selectKindergarten"
              :label="'Kindergarten'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectHausFuerKinder">
            <v-checkbox
              v-model="searchQueryAndSorting.selectHausFuerKinder"
              :label="'Haus für Kinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextObjektauswahl }}
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Sortierung"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Auswahl der Art der Sortierung und der Sortierreihenfolge."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverArtDerSortierung">
            <v-select
              v-model="searchQueryAndSorting.sortBy"
              :items="entriesArtderSortierung"
              label="Art der Sortierung"
              item-value="key"
              item-text="value"
              filled
              dense
            ></v-select>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-model="hoverReihenfolgeDerSortierung">
            <v-select
              v-model="searchQueryAndSorting.sortOrder"
              :items="entriesReihenfolgeDerSortierung"
              label="Sortierreihenfolge"
              item-value="key"
              item-text="value"
              filled
              dense
            ></v-select>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card flat>
            {{ helpTextSortierung }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import PanelHeader from "@/components/search/filter/PanelHeader.vue";
import {
  LookupEntryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";

@Component({
  components: { PanelHeader },
})
export default class EntitySelectionAndSortingPanel extends Vue {
  @VModel({ type: SearchQueryAndSortingModel }) searchQueryAndSorting!: SearchQueryAndSortingModel;

  private hoverSelectAll = false;
  private hoverDeselectAll = false;
  private hoverSelectBauleitplanverfahren = false;
  private hoverSelectBauvorhaben = false;
  private hoverSelectGrundschule = false;
  private hoverSelectGsNachmittagBetreuung = false;
  private hoverSelectMittelschule = false;
  private hoverSelectKinderkrippe = false;
  private hoverSelectKindergarten = false;
  private hoverSelectHausFuerKinder = false;

  private hoverArtDerSortierung = false;
  private hoverReihenfolgeDerSortierung = false;

  get helpTextObjektauswahl(): string {
    if (this.hoverSelectAll) {
      return "Es werden all Objekttypen ausgewählt.";
    }
    if (this.hoverDeselectAll) {
      return "Es werden all Objekttypen abgewählt.";
    }
    if (this.hoverSelectBauleitplanverfahren) {
      return "Die Bauleitplanverfahren werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectBauvorhaben) {
      return "Die Bauvorhaben werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectGrundschule) {
      return "Die Grundschulen werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectMittelschule) {
      return "Die Mittelschulen werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectGsNachmittagBetreuung) {
      return "Die Einrichtungen zur Nachmittagsbetreuung für Grundschulkinder werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectKinderkrippe) {
      return "Die Kinderkrippen werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectKindergarten) {
      return "Die Kindergärten werden in die Suche miteinbezogen.";
    }
    if (this.hoverSelectHausFuerKinder) {
      return "Die Häuser für Kinder werden in die Suche miteinbezogen.";
    }
    return "";
  }

  get helpTextSortierung(): string {
    if (this.hoverArtDerSortierung) {
      return "Auswahl nach welchem Attribut sortiert werden soll.";
    }
    if (this.hoverReihenfolgeDerSortierung) {
      return "Auswahl ob das sortierbare Attribut aufsteigend oder absteigend sortiert werden soll.";
    }
    return "";
  }

  private selectAll() {
    this.searchQueryAndSorting.selectBauleitplanverfahren = true;
    this.searchQueryAndSorting.selectBauvorhaben = true;
    this.searchQueryAndSorting.selectGrundschule = true;
    this.searchQueryAndSorting.selectGsNachmittagBetreuung = true;
    this.searchQueryAndSorting.selectHausFuerKinder = true;
    this.searchQueryAndSorting.selectKinderkrippe = true;
    this.searchQueryAndSorting.selectKindergarten = true;
    this.searchQueryAndSorting.selectMittelschule = true;
  }

  private deselectAll() {
    this.searchQueryAndSorting.selectBauleitplanverfahren = false;
    this.searchQueryAndSorting.selectBauvorhaben = false;
    this.searchQueryAndSorting.selectGrundschule = false;
    this.searchQueryAndSorting.selectGsNachmittagBetreuung = false;
    this.searchQueryAndSorting.selectHausFuerKinder = false;
    this.searchQueryAndSorting.selectKinderkrippe = false;
    this.searchQueryAndSorting.selectKindergarten = false;
    this.searchQueryAndSorting.selectMittelschule = false;
  }

  get entriesArtderSortierung(): Array<LookupEntryDto> {
    return [
      {
        key: SearchQueryAndSortingDtoSortByEnum.Name,
        value: "Name",
      },
      {
        key: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
        value: "Änderungsdatum",
      },
      {
        key: SearchQueryAndSortingDtoSortByEnum.CreatedDateTime,
        value: "Erstellungsdatum",
      },
    ];
  }
  get entriesReihenfolgeDerSortierung(): Array<LookupEntryDto> {
    return [
      {
        key: SearchQueryAndSortingDtoSortOrderEnum.Asc,
        value: "aufsteigend",
      },
      {
        key: SearchQueryAndSortingDtoSortOrderEnum.Desc,
        value: "absteigend",
      },
    ];
  }
}
</script>

<style scoped></style>
