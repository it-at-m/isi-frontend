<template>
  <DefaultLayout>
    <template #content>
      <div
        v-if="abfragenUebersicht.length !== 0"
        class="py-12"
      >
        <v-hover
          v-for="item in abfragenUebersicht"
          :key="item.id"
          v-slot="{ hover }"
        >
          <v-card
            outlined
            class="mb-4 transition-swing"
            :elevation="hover ? 4 : 0"
            @click="routeToAbfrageInfo(item)"
          >
            <v-card-title>
              {{ item.nameAbfrage }}
              <v-spacer />
            </v-card-title>
            <v-card-text>
              <span> Status: {{ getLookupValue(item.statusAbfrage, statusAbfrageList) }}</span>
              <v-spacer />
              <span>
                Stand:
                {{ getLookupValue(item.standVorhaben, standVorhabenList) }}
              </span>
              <v-spacer />
              <span>Frist: {{ datumFormatted(item.fristStellungnahme) }}</span>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
      <!-- Falls noch keine Abfragen vorhanden sind, wird Folgendes angezeigt -->
      <div
        v-else
        class="d-flex justify-center align-center"
        style="height: 100%"
      >
        <span
          v-if="fetchSuccess === true"
          class="text-h6"
        >Keine Abfragen vorhanden</span>
        <span
          v-else-if="fetchSuccess === false"
          class="text-h6"
        >Ein Fehler ist aufgetreten</span>
        <v-progress-circular
          v-else
          indeterminate
          color="grey lighten-1"
          size="50"
          width="5"
        />
      </div>
    </template>
    <template #action>
      <v-spacer />
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            slot="activator"
            v-model="options"
            dark
            fab
            x-large
            color="secondary"
            v-on="on"
            @click="newAbfrage"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>   
        <span v-if="options">Abbrechen</span>
        <span v-else>Abfrage erstellen</span>
      </v-tooltip>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import router from "@/router";
import {
  AbfrageListElementDto,
  AbfrageListElementsDto,
  LookupEntryDto
} from "@/api/api-client";
import AbfragelistenApiRequestMixin from "@/mixins/requests/AbfragelistenApiRequestMixin";
import { convertDateForFrontend } from "@/utils/Formatter";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";

@Component({
  components: { DefaultLayout }
})
export default class AbfragenUebersicht extends Mixins(AbfragelistenApiRequestMixin) {

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
    return !_.isUndefined(list)
      ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
      : "";
  }

  mounted(): void {
    this.getAbfragen();
  }

  /**
   * Liest alle Infrastrukturabfragen aus dem Backend und f??hrt ein Mapping f??r die Listenanzeige durch.
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

  /**
   * Verzweigung zur Detailansicht der Infrastrukturabfrage
   *
   * @param abfrageListElementDto zum ermitteln der Route.
   */
  private routeToAbfrageInfo(abfrageListElementDto: AbfrageListElementDto): void {
    if (!_.isUndefined(abfrageListElementDto.id)) {
      router.push({
        name: "updateabfrage",
        params: { id: abfrageListElementDto.id }
      });
    }
  }

  /**
   * Wenn man eine neue Abfrage erstellen m??chte
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
