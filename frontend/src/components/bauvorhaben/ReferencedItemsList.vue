<template>
  <v-container class="transition-swing">
    <v-expansion-panels>
      <v-expansion-panel @click="getReferencedAbfragen()">
        <v-expansion-panel-header> Abfragen </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list v-if="abfragenEmpty">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Dieses Bauvorhaben wird nicht durch Abfragen referenziert</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(abfrage, index) in abfragen"
              :key="index"
              link
            >
              <v-list-item-content
                :id="'abfragen_bauvorhaben_reference_' + index"
                @click="routeToAbfrageInfo(abfrage)"
              >
                <v-list-item-title>{{ abfrage.nameAbfrage }}</v-list-item-title>
                <v-list-item-subtitle
                  >Erstellungsdatum: {{ formatDate(abfrage.createdDateTime) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @click="getReferencedInfrastruktureinrichtungen()">
        <v-expansion-panel-header> Infrastruktureinrichtungen </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list v-if="infrastruktureinrichtungenEmpty">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  >Dieses Bauvorhaben wird nicht durch Infrastruktureinrichtungen referenziert</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(infra, index) in infrastruktureinrichtungen"
              :key="index"
              link
            >
              <v-list-item-content
                :id="'infrastruktureinrichtungen_bauvorhaben_reference_' + index"
                @click="routeToInfrastruktureinrichtungInfo(infra)"
              >
                <v-list-item-title> {{ infra.nameEinrichtung }} </v-list-item-title>
                <v-list-item-subtitle>
                  Typ: {{ getLookupValue(infra.infrastruktureinrichtungTyp, infrastruktureinrichtungenTypList) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import {
  AbfrageSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import store from "@/store/index";
import _ from "lodash";
import router from "@/router";
import moment from "moment";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";

@Component
export default class ReferencedItemsList extends Mixins(BauvorhabenApiRequestMixin) {
  private isAbfrageListOpen = false;

  private isInfraListOpen = false;

  abfragen: Array<AbfrageSearchResultDto> = [];

  infrastruktureinrichtungen: Array<InfrastruktureinrichtungSearchResultDto> = [];

  get abfragenEmpty(): boolean {
    return _.isEmpty(this.abfragen);
  }

  get infrastruktureinrichtungenEmpty(): boolean {
    return _.isEmpty(this.infrastruktureinrichtungen);
  }

  private getReferencedAbfragen(): void {
    if (!this.isAbfrageListOpen && !_.isNil(this.$route.params.id)) {
      this.isAbfrageListOpen = true;
      this.getReferencedAbfrageList(this.$route.params.id, true).then((searchResults: AbfrageSearchResultDto[]) => {
        if (!_.isNil(searchResults)) {
          this.abfragen = searchResults;
        }
      });
    } else if (this.isAbfrageListOpen && !_.isNil(this.$route.params.id)) {
      this.isAbfrageListOpen = false;
    } else {
      this.isAbfrageListOpen = false;
    }
  }

  private getReferencedInfrastruktureinrichtungen(): void {
    if (!this.isInfraListOpen && !_.isNil(this.$route.params.id)) {
      this.isInfraListOpen = true;
      this.getReferencedInfrastruktureinrichtungenList(this.$route.params.id, true).then(
        (searchResults: InfrastruktureinrichtungSearchResultDto[]) => {
          if (!_.isNil(searchResults)) {
            this.infrastruktureinrichtungen = searchResults;
          }
        },
      );
    } else if (this.isInfraListOpen && !_.isNil(this.$route.params.id)) {
      this.isInfraListOpen = false;
    } else {
      this.isInfraListOpen = false;
    }
  }

  get infrastruktureinrichtungenTypList(): LookupEntryDto[] {
    return store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  /**
   * Methode um Datum für die Anzeige zu formatieren
   */
  formatDate(dateTime: Date): string {
    return moment(dateTime).format("DD.MM.YYYY");
  }

  /**
   * Routing zur Detailansicht der Bauleitplanverfahren
   *
   * @param abfrageSearchResultDto zum ermitteln der Route.
   */
  routeToAbfrageInfo(abfrageSearchResultDto: AbfrageSearchResultDto): void {
    if (!_.isNil(abfrageSearchResultDto.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageSearchResultDto.id },
      });
    }
  }

  /**
   * Routing zur Detailansicht der Infrastruktureinrichtung
   *
   * @param infrastruktureinrichtungSearchResultDto zum ermitteln der Route.
   */
  routeToInfrastruktureinrichtungInfo(
    infrastruktureinrichtungSearchResultDto: InfrastruktureinrichtungSearchResultDto,
  ): void {
    if (!_.isNil(infrastruktureinrichtungSearchResultDto.id)) {
      router.push({
        name: "editInfrastruktureinrichtung",
        params: { id: infrastruktureinrichtungSearchResultDto.id },
      });
    }
  }

  private getLookupValue(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isNil(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }
}
</script>

<style></style>
