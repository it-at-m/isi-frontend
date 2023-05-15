<template>
  <default-layout>
    <template #content>
      <div
        v-if="bauvorhabenList.length !== 0"
        class="py-12"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <v-hover
          v-for="(item, index) in bauvorhabenList"
          :key="item.id"
          v-slot="{ hover }"
        >
          <v-card
            outlined
            class="mb-4 transition-swing"
            :elevation="hover ? 4 : 0"
            @click="editBauvorhaben(item.id)"
          >
            <v-card-title :id="'bauvorhaben_uebersicht_item_' + index + '_nameVorhaben'">
              {{ item.nameVorhaben }}
            </v-card-title>
            <v-card-text>
              <span :id="'bauvorhaben_uebersicht_item_' + index + '_bauvorhabenNummer'">
                Bauvorhabennummer: {{ item.bauvorhabenNummer }}
              </span>
              <v-spacer />
              <span :id="'bauvorhaben_uebersicht_item_' + index + '_grundstueckgroesse'">
                Grundstücksgröße: {{ item.grundstuecksgroesse }} m²
              </span>
              <v-spacer />
              <span :id="'bauvorhaben_uebersicht_item_' + index + '_standVorhaben'">
                Stand: {{ getLookupValue(item.standVorhaben, standVorhabenList) }}
              </span>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
      <loading
        v-else
        id="bauvorhaben_uebersicht_loading"
        :success="fetchSuccess"
        name="Bauvorhaben"
      />
    </template>
    <template #action>
      <v-spacer />
      <div class="align-self-end">
        <v-tooltip left>
          <template #activator="{ on }">
            <v-btn
              id="bauvorhaben_uebersicht_bauvorhaben_erstellen_button"
              slot="activator"
              v-model="options"
              dark
              fab
              x-large
              color="secondary"
              v-on="on"
              @click="createBauvorhaben()"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span v-if="options">Abbrechen</span>
          <span v-else>Bauvorhaben erstellen</span>
        </v-tooltip>
      </div>
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import router from "@/router";
import DefaultLayout from "@/components/DefaultLayout.vue";
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";

@Component({
  components: { DefaultLayout },
})
export default class BauvorhabenUebersicht extends Mixins(BauvorhabenApiRequestMixin) {
  private fetchSuccess: boolean | null = null;

  private options = false;

  get bauvorhabenList(): BauvorhabenDto[] {
    const list = this.$store.getters["search/resultBauvorhaben"];
    return list ? list : [];
  }

  get standVorhabenList(): LookupEntryDto[] {
    const list = this.$store.getters["lookup/standVorhaben"];
    return list ? list : [];
  }

  mounted(): void {
    this.fetchBauvorhaben();
  }

  /**
   * Holt alle Bauvorhaben vom Backend.
   */
  private async fetchBauvorhaben(): Promise<void> {
    this.fetchSuccess = null;

    await this.getBauvorhaben(false)
      .then((bauvorhaben: BauvorhabenDto[]) => {
        this.$store.dispatch("search/resultBauvorhaben", bauvorhaben);
        this.fetchSuccess = true;
      })
      .catch(() => {
        this.fetchSuccess = false;
      });
  }

  /**
   * Ermittelt den Anzeigenamen von einem Eintrag eines Lookup-Enums.
   * Konnte der Anzeigename nicht ermittelt werden, wird der Name des Eintrags zurückgegeben.
   *
   * @param key Der Name des Enum-Eintrags.
   * @param list Das Array mit allen Einträgen des Enums.
   *
   * @return Der Anzeigename oder Name des Enum-Eintrags.
   */
  private getLookupValue(key: string, list: Array<LookupEntryDto>): string {
    if (list) {
      const value = list.find((obj: LookupEntryDto) => obj.key === key)?.value;
      if (value) {
        return value;
      }
    }

    return key;
  }

  /**
   * Öffnet die View zur Bearbeitung eines existierenden Bauvorhabens.
   *
   * @param id Die ID des ausgewählten Bauvorhabens.
   */
  private editBauvorhaben(id: string): void {
    router.push({
      name: "editBauvorhaben",
      params: { id },
    });
  }

  /**
   * Öffnet die View zur Erstellung eines Bauvorhabens.
   */
  private createBauvorhaben(): void {
    router.push({
      name: "createBauvorhaben",
    });
  }
}
</script>

<style></style>
