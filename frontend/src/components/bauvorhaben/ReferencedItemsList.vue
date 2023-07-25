import { AbfrageListElementDto } from '@/api/api-client/isi-backend' import { AbfrageListElementDto } from
'@/api/api-client/isi-backend' import { AbfrageListElementDto } from '@/api/api-client/isi-backend'
<template>
  <div>
    <div>
      <!-- Abfragen List -->
      <v-card
        outlined
        class="mb-12 transition-swing"
      >
        <v-list>
          <v-subheader class="text-h5">Abfragen</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(abfrage, index) in abfragen"
              :key="index"
            >
              <v-list-item-content @click="routeToAbfrageInfo(abfrage)">
                <v-list-item-title :id="'abfragen_bauvorhaben_reference_' + index"
                  >Name der Abfrage: {{ abfrage.nameAbfrage }}</v-list-item-title
                >
                <v-list-item-subtitle>Erstellungsdatum: {{ formatDate(abfrage.createdDateTime) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <div>
      <!-- Infrastruktureinrichtung List -->
      <v-card
        outlined
        class="transition-swing"
      >
        <v-list>
          <v-subheader class="text-h5">Infrastruktureinrichtungen</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(infra, index) in infrastruktureinrichtungen"
              :key="index"
            >
              <v-list-item-content @click="routeToInfrastruktureinrichtungInfo(infra)">
                <v-list-item-title :id="'infrastruktureinrichtungen_bauvorhaben_reference_' + index"
                  >Name der Einrichtung: {{ infra.nameEinrichtung }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >Infrastruktureinrichtung Typ:
                  {{
                    getLookupValue(infra.infrastruktureinrichtungTyp, infrastruktureinrichtungenTypList)
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import {
  AbfrageListElementDto,
  AbfrageListElementsDto,
  InfrastruktureinrichtungListElementDto,
  InfrastruktureinrichtungListElementsDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import store from "@/store/index";
import _ from "lodash";
import router from "@/router";
import moment from "moment";
import InfrastruktureinrichtungApiRequestMixin from "@/mixins/requests/InfrastruktureinrichtungApiRequestMixin";
import AbfragelistenApiRequestMixin from "@/mixins/requests/AbfragelistenApiRequestMixin";

@Component
export default class ReferencedItemsList extends Mixins(
  InfrastruktureinrichtungApiRequestMixin,
  AbfragelistenApiRequestMixin
) {
  abfragen: Array<AbfrageListElementDto> = [];

  infrastruktureinrichtungen: Array<InfrastruktureinrichtungListElementDto> = [];

  get infrastruktureinrichtungenTypList(): LookupEntryDto[] {
    return store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  mounted(): void {
    if (!_.isNil(this.$route.params.id)) {
      this.getReferencedAbfragen(this.$route.params.id);
      this.getReferencedInfrastruktureinrichtungen(this.$route.params.id);
    }
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
    if (!_.isUndefined(abfrageListElementDto.id)) {
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
  /**
   * GET-Methode um alle Abfragen die dem Bauvorhaben angehören sortiert zurückzugeben.
   *
   * @param bauvorhabenId zum ermitteln des Bauvorhabens.
   */
  private async getReferencedAbfragen(bauvorhabenId: string): Promise<void> {
    await this.getReferencedAbfrageListElements(bauvorhabenId, true).then(
      (abfrageListElementsDto: AbfrageListElementsDto) => {
        if (!_.isUndefined(abfrageListElementsDto.listElements)) {
          this.abfragen = abfrageListElementsDto.listElements;
        } else {
          this.abfragen = [];
        }
      }
    );
  }

  /**
   * GET-Methode um alle Infrastruktureinrichtungen die dem Bauvorhaben angehören sortiert zurückzugeben.
   *
   * @param bauvorhabenId zum ermitteln des Bauvorhabens.
   */
  private async getReferencedInfrastruktureinrichtungen(bauvorhabenId: string): Promise<void> {
    await this.getReferencedInfrastruktureinrichtungenListElements(bauvorhabenId, true).then(
      (infrastruktureinrichtungListElementsDto: InfrastruktureinrichtungListElementsDto) => {
        if (!_.isUndefined(infrastruktureinrichtungListElementsDto.listElements)) {
          this.infrastruktureinrichtungen = infrastruktureinrichtungListElementsDto.listElements;
        } else {
          this.infrastruktureinrichtungen = [];
        }
      }
    );
  }

  private getLookupValue(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
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
