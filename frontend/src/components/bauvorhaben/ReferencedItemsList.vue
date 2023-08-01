<template>
  <div>
    <!-- Abfragen List -->
    <v-card
      outlined
      class="mb-12 transition-swing"
    >
      <v-list>
        <v-list-group
          :value="isAbfrageListOpen"
          @click="getReferencedInfrastrukturabfragen()"
        >
          <template #activator>
            <v-list-item-title class="text-h5">Abfragen</v-list-item-title>
          </template>
          <v-list-item-group
            v-if="abfragenEmpty"
            color="primary"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  >Keine Infrastrukturabfragen referenzieren dieses Bauvorhaben</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group
            v-else
            color="primary"
          >
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
          </v-list-item-group>
        </v-list-group>
        <v-list-group
          :value="isInfraListOpen"
          @click="getReferencedInfrastruktureinrichtungen()"
        >
          <template #activator>
            <v-list-item-title class="text-h5">Infrastruktureinrichtungen</v-list-item-title>
          </template>
          <v-list-item-group
            v-if="infrastruktureinrichtungenEmpty"
            color="primary"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  >Keine Infrastruktureinrichtungen referenzieren dieses Bauvorhaben</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group
            v-else
            color="primary"
          >
            <v-list-item
              v-for="(infra, index) in infrastruktureinrichtungen"
              :key="index"
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
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from "vue-property-decorator";
import {
  AbfrageListElementDto,
  InfrastruktureinrichtungListElementDto,
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

  abfragen: Array<AbfrageListElementDto> = [];

  infrastruktureinrichtungen: Array<InfrastruktureinrichtungListElementDto> = [];

  get abfragenEmpty(): boolean {
    return _.isEmpty(this.abfragen);
  }

  get infrastruktureinrichtungenEmpty(): boolean {
    return _.isEmpty(this.infrastruktureinrichtungen);
  }

  private getReferencedInfrastrukturabfragen(): void {
    if (!this.isAbfrageListOpen && !_.isNil(this.$route.params.id)) {
      this.isAbfrageListOpen = true;
      this.getReferencedInfrastrukturabfragenList(this.$route.params.id, true).then(
        (abfrageListElements: AbfrageListElementDto[]) => {
          if (!_.isNil(abfrageListElements)) {
            this.abfragen = abfrageListElements;
          }
        }
      );
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
        (infraListElements: InfrastruktureinrichtungListElementDto[]) => {
          if (!_.isNil(infraListElements)) {
            this.infrastruktureinrichtungen = infraListElements;
          }
        }
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
   * Routing zur Detailansicht der Infrastrukturabfrage
   *
   * @param abfrageListElementDto zum ermitteln der Route.
   */
  routeToAbfrageInfo(abfrageListElementDto: AbfrageListElementDto): void {
    if (!_.isNil(abfrageListElementDto.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageListElementDto.id },
      });
    }
  }

  /**
   * Routing zur Detailansicht der Infrastruktureinrichtung
   *
   * @param infrastruktureinrichtungListElementDto zum ermitteln der Route.
   */
  routeToInfrastruktureinrichtungInfo(
    infrastruktureinrichtungListElementDto: InfrastruktureinrichtungListElementDto
  ): void {
    if (!_.isNil(infrastruktureinrichtungListElementDto.id)) {
      router.push({
        name: "editInfrastruktureinrichtung",
        params: { id: infrastruktureinrichtungListElementDto.id },
      });
    }
  }

  private getLookupValue(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isNil(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }
}
</script>

<style>
/* Adjust styles as you wish */
.subheader {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
