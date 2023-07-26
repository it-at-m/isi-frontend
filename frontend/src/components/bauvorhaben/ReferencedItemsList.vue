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
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  AbfrageListElementDto,
  InfrastruktureinrichtungListElementDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import store from "@/store/index";
import _ from "lodash";
import router from "@/router";
import moment from "moment";

@Component
export default class ReferencedItemsList extends Vue {
  @Prop()
  abfragen: Array<AbfrageListElementDto> = [];

  @Prop()
  infrastruktureinrichtungen: Array<InfrastruktureinrichtungListElementDto> = [];

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
