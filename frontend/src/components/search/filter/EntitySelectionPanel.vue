<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Objekttyp </v-expansion-panel-header>
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
        align="start"
        justify="center"
        dense
      >
        <v-col cols="6">
          <v-hover v-model="hoverSelectInfrastrukturabfrage">
            <v-checkbox
              v-model="foerdermix.selectInfrastrukturabfrage"
              :label="'Infrastrukturabfrage'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectBauvorhaben">
            <v-checkbox
              v-model="foerdermix.selectBauvorhaben"
              :label="'Bauvorhaben'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectGrundschule">
            <v-checkbox
              v-model="foerdermix.selectGrundschule"
              :label="'Grundschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectGsNachmittagBetreuung">
            <v-checkbox
              v-model="foerdermix.selectGsNachmittagBetreuung"
              :label="'Nachmittagsbetreuung für Grundschulkinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectMittelschule">
            <v-checkbox
              v-model="foerdermix.selectMittelschule"
              :label="'Mittelschule'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKinderkrippe">
            <v-checkbox
              v-model="foerdermix.selectKinderkrippe"
              :label="'Kinderkrippe'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectKindergarten">
            <v-checkbox
              v-model="foerdermix.selectKindergarten"
              :label="'Kindergarten'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
          <v-hover v-model="hoverSelectHausFuerKinder">
            <v-checkbox
              v-model="foerdermix.selectHausFuerKinder"
              :label="'Haus für Kinder'"
              color="grey darken-1"
              hide-details
              dense
            />
          </v-hover>
        </v-col>
        <v-col cols="6">
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
        align="start"
        justify="center"
        dense
      >
        <v-col cols="6"> </v-col>
        <v-col cols="6">
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
import _ from "lodash";
import { SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";
import { createSearchQueryAndSortingDto } from "@/utils/Factories";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

@Component({})
export default class EntitySelectionPanel extends Vue {
  @VModel({ type: SearchQueryAndSortingModel }) foerdermix!: SearchQueryAndSortingModel;

  private hoverSelectInfrastrukturabfrage = false;
  private hoverSelectBauvorhaben = false;
  private hoverSelectGrundschule = false;
  private hoverSelectGsNachmittagBetreuung = false;
  private hoverSelectMittelschule = false;
  private hoverSelectKinderkrippe = false;
  private hoverSelectKindergarten = false;
  private hoverSelectHausFuerKinder = false;

  /**
   * Liefert den Text für die einzelnen Objekttypen,
   * welcher bei MouseOver in der zweiten Spalte des Optionsmenüs angezeigt wird.
   */
  get helpTextObjektauswahl(): string {
    if (this.hoverSelectInfrastrukturabfrage) {
      return "Die Infrastrukturabfragen werden in die Suche miteinbezogen.";
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
    return "";
  }
}
</script>

<style scoped></style>
