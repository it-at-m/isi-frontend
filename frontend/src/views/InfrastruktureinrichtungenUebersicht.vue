<template>
  <default-layout>
    <template #content>
      <div
        v-if="infrastruktureinrichtungen.length !== 0"
        class="py-12"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <v-hover
          v-for="(item, index) in infrastruktureinrichtungen"
          :key="item.id"
          v-slot="{ hover }"
        >
          <v-card
            outlined
            class="mb-4 transition-swing"
            :elevation="hover ? 4 : 0"
            @click="routeToInfrastruktureinrichtungInfo(item)"
          >
            <v-card-title :id="'infrastruktureinrichtung_uebersicht_item_' + index + '_nameEinrichtung'">
              {{ item.nameEinrichtung }}
              <v-spacer />
            </v-card-title>
            <v-card-text>
              <span :id="'infrastruktureinrichtung_uebersicht_item_' + index + '_infrastruktureinrichtungtyp'">
                {{ getLookupValue(item.infrastruktureinrichtungTyp, infrastruktureinrichtungTypList) }}</span
              >
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
      <loading
        v-else
        id="infrastruktureinrichtung_uebersicht_loading"
        :success="backendAccessSuccessful"
        name="Infrastruktureinrichtungen"
      />
    </template>
    <template #action>
      <v-spacer />
      <div class="align-self-end">
        <v-tooltip left>
          <template #activator="{ on }">
            <v-btn
              id="infrastruktureinrichtung_uebersicht_infrastruktureinrichtung_erstellen_button"
              slot="activator"
              v-model="options"
              dark
              fab
              x-large
              color="secondary"
              :disabled="!isEditable"
              v-on="on"
              @click="newInfrastruktureinrichtung"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span v-if="options">Abbrechen</span>
          <span v-else>Infrastruktureinrichtung erstellen</span>
        </v-tooltip>
      </div>
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import router from "@/router";
import {
  InfrastruktureinrichtungListElementDto,
  InfrastruktureinrichtungListElementsDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungenListApiRequestMixin from "@/mixins/requests/InfrastruktureinrichtungenListApiRequestMixin";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import SecurityMixin from "@/mixins/security/SecurityMixin";

@Component({
  components: { DefaultLayout },
})
export default class InfrastruktureinrichtungenUebersicht extends Mixins(
  InfrastruktureinrichtungenListApiRequestMixin,
  SecurityMixin
) {
  private infrastruktureinrichtungen: Array<InfrastruktureinrichtungListElementDto> = [];

  private options = false;

  private backendAccessSuccessful: boolean | null = null;

  get isEditable(): boolean {
    return this.isRoleAdminOrSachbearbeitung();
  }

  get infrastruktureinrichtungTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  private getLookupValue(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }

  @Watch("$store.state.search.resultInfrastruktureinrichtung", { immediate: true, deep: true })
  private resultInfrastruktureinrichtungenChanged() {
    const infrastruktureinrichtungenStore = this.$store.getters["search/resultInfrastruktureinrichtung"];
    if (!_.isNil(infrastruktureinrichtungenStore)) {
      this.infrastruktureinrichtungen = infrastruktureinrichtungenStore;
    }
  }

  mounted(): void {
    this.getInfrastruktureinrichtungen();
  }

  /**
   * Liest alle Infrastruktureinrichtungen aus dem Backend
   */
  private async getInfrastruktureinrichtungen(): Promise<void> {
    this.backendAccessSuccessful = null;
    if (!this.$store.getters["search/isInitializedInfrastruktureinrichtung"]) {
      await this.getInfrastruktureinrichtungenListElements(false)
        .then((infrastruktureinrichtungListElementsDto: InfrastruktureinrichtungListElementsDto) => {
          if (!_.isUndefined(infrastruktureinrichtungListElementsDto.listElements)) {
            this.$store.dispatch(
              "search/resultInfrastruktureinrichtung",
              infrastruktureinrichtungListElementsDto.listElements
            );
            this.backendAccessSuccessful = true;
          }
        })
        .catch(() => {
          this.backendAccessSuccessful = false;
        });
    } else {
      this.infrastruktureinrichtungen = this.$store.getters["search/resultInfrastruktureinrichtung"];
      this.backendAccessSuccessful = true;
    }
  }

  /**
   * Verzweigung zur Detailansicht der Infrastruktureinrichtung
   *
   * @param infrastruktureinrichtungListElementDto zum ermitteln der Route.
   */
  private routeToInfrastruktureinrichtungInfo(
    infrastruktureinrichtungListElementDto: InfrastruktureinrichtungListElementDto
  ): void {
    if (!_.isNil(infrastruktureinrichtungListElementDto.id)) {
      const infrastruktureinrichtungTyp: string = !_.isNil(
        infrastruktureinrichtungListElementDto.infrastruktureinrichtungTyp
      )
        ? infrastruktureinrichtungListElementDto.infrastruktureinrichtungTyp.toString()
        : "";
      router.push({
        name: "updateinfrastruktureinrichtung",
        params: { typ: infrastruktureinrichtungTyp, id: infrastruktureinrichtungListElementDto.id },
      });
    }
  }

  /**
   * Wenn man eine neue Infrastruktureinrichtung erstellt werden soll
   *
   * @param Infrastruktureinrichtung Typ
   *
   */
  private newInfrastruktureinrichtung(): void {
    router.push({
      name: "newInfrastruktureinrichtung",
    });
  }
}
</script>

<style></style>
