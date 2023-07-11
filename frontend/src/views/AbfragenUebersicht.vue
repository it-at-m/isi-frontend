<template>
  <default-layout>
    <template #content>
      <div
        v-if="abfragenUebersicht.length !== 0"
        class="py-12"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <v-hover
          v-for="(item, index) in abfragenUebersicht"
          :key="item.id"
          v-slot="{ hover }"
        >
          <v-card
            outlined
            class="mb-4 transition-swing"
            :elevation="hover ? 4 : 0"
            @click="routeToAbfrageInfo(item)"
          >
            <v-card-title :id="'abfrage_uebersicht_item_' + index + '_nameAbfrage'">
              {{ item.nameAbfrage }}
              <v-spacer />
            </v-card-title>
            <v-card-text>
              <span :id="'abfrage_uebersicht_item_' + index + '_stadtbezirke'">
                Stadtbezirke: {{ getStadtbezirke(item.stadtbezirke) }}
              </span>
              <v-spacer />
              <span :id="'abfrage_uebersicht_item_' + index + '_statusAbfrage'">
                Status: {{ getLookupValue(item.statusAbfrage, statusAbfrageList) }}
              </span>
              <v-spacer />
              <span :id="'abfrage_uebersicht_item_' + index + '_fristStellungnahme'">
                Frist: {{ datumFormatted(item.fristStellungnahme) }}
              </span>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
      <loading
        v-else
        id="abfrage_uebersicht_loading"
        :success="fetchSuccess"
        name="Abfragen"
      />
    </template>
    <template #action>
      <v-spacer />
      <div class="align-self-end">
        <v-tooltip left>
          <template #activator="{ on }">
            <v-btn
              id="abfrage_uebersicht_abfrage_erstellen_button"
              slot="activator"
              v-model="options"
              dark
              fab
              x-large
              color="secondary"
              :disabled="!isRoleAdminOrAbfrageerstellung()"
              v-on="on"
              @click="newAbfrage"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span v-if="options">Abbrechen</span>
          <span v-else>Abfrage erstellen</span>
        </v-tooltip>
      </div>
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import router from "@/router";
import {
  AbfrageListElementDto,
  AbfrageListElementsDto,
  LookupEntryDto,
  StadtbezirkDto,
} from "@/api/api-client/isi-backend";
import AbfragelistenApiRequestMixin from "@/mixins/requests/AbfragelistenApiRequestMixin";
import { convertDateForFrontend } from "@/utils/Formatter";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import SecurityMixin from "@/mixins/security/SecurityMixin";

@Component({
  components: { DefaultLayout },
})
export default class AbfragenUebersicht extends Mixins(AbfragelistenApiRequestMixin, SecurityMixin) {
  private abfragenUebersicht: Array<AbfrageListElementDto> = [];

  private options = false;

  private fetchSuccess: boolean | null = null;

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  private datumFormatted(datum: string): string {
    return convertDateForFrontend(datum);
  }

  @Watch("$store.state.search.resultAbfrage", { immediate: true, deep: true })
  private resultAbfrageChanged() {
    const abfragenStore = this.$store.getters["lookup/resultAbfrage"];
    if (abfragenStore !== undefined) {
      this.abfragenUebersicht = abfragenStore;
    }
  }

  private getLookupValue(key: string, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
  }

  mounted(): void {
    this.getAbfragen();
  }

  /**
   * Liest alle Infrastrukturabfragen aus dem Backend und führt ein Mapping für die Listenanzeige durch.
   */
  private async getAbfragen(): Promise<void> {
    this.fetchSuccess = null;
    if (!this.$store.getters["search/isInitializedAbfrage"]) {
      await this.getAbfrageListElements(false)
        .then((abfrageListElementsDto: AbfrageListElementsDto) => {
          if (!_.isUndefined(abfrageListElementsDto.listElements)) {
            this.abfragenUebersicht = abfrageListElementsDto.listElements;
            this.fetchSuccess = true;
          }
        })
        .catch(() => {
          this.fetchSuccess = false;
        });
    } else {
      this.abfragenUebersicht = this.$store.getters["search/resultAbfrage"];
      this.fetchSuccess = true;
    }
  }

  private getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
    const auflistungStadtbezirksbezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), [
      "nummer",
    ]).map((stadtbezirk: StadtbezirkDto) => {
      return stadtbezirk.nummer + "/" + stadtbezirk.name;
    });
    return _.join(auflistungStadtbezirksbezeichnungen, ", ");
  }

  /**
   * Verzweigung zur Detailansicht der Infrastrukturabfrage
   *
   * @param abfrageListElementDto zum ermitteln der Route.
   */
  private routeToAbfrageInfo(abfrageListElementDto: AbfrageListElementDto): void {
    if (!_.isUndefined(abfrageListElementDto.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageListElementDto.id },
      });
    }
  }

  /**
   * Wenn man eine neue Abfrage erstellen möchte
   *
   * @param
   *
   * @returns
   */
  private newAbfrage(): void {
    router.push({
      name: "newabfrage",
    });
  }
}
</script>

<style></style>
