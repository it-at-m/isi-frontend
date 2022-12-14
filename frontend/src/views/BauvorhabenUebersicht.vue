<template>
  <DefaultLayout>
    <template #content>
      <div
        v-if="bauvorhabenList.length !== 0"
        class="py-12"
      >
        <v-hover
          v-for="item in bauvorhabenList"
          :key="item.id"
          v-slot="{ hover }"
        >
          <v-card
            outlined
            class="mb-4 transition-swing"
            :elevation="hover ? 4 : 0"
            @click="editBauvorhaben(item.id)"
          >
            <v-card-title>
              {{ item.nameVorhaben }}
            </v-card-title>
            <v-card-text>
              <span>Bauvorhabennummer: {{ item.bauvorhabenNummer }}</span>
              <v-spacer />
              <span>Grundstücksgröße: {{ item.grundstuecksgroesse }} m²</span>
              <v-spacer />
              <span>Stand: {{ getLookupValue(item.standVorhaben, standVorhabenList) }}</span>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
      <!-- Falls noch keine Bauvorhaben vorhanden sind, wird Folgendes angezeigt -->
      <div
        v-else
        class="d-flex justify-center align-center"
        style="height: 100%"
      >
        <span
          v-if="fetchSuccess === true"
          class="text-h6"
        >Keine Bauvorhaben vorhanden</span>
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
      <v-btn
        dark
        fab
        x-large
        color="secondary"
        class="align-self-end"
        @click="createBauvorhaben()"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import router from "@/router";
import DefaultLayout from "@/components/DefaultLayout.vue";
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";

@Component({
  components: { DefaultLayout }
})
export default class BauvorhabenUebersicht extends Mixins(BauvorhabenApiRequestMixin) {
  private fetchSuccess: boolean | null = null;
  
  get bauvorhabenList(): BauvorhabenDto[] {
    return this.$store.getters["search/resultBauvorhaben"];
  }

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
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
      params: { id }
    });
  }

  /**
   * Öffnet die View zur Erstellung eines Bauvorhabens.
   */
  private createBauvorhaben(): void {
    router.push({
      name: "createBauvorhaben"
    });
  }
}
</script>

<style></style>
