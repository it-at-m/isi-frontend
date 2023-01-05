<template>
  <v-container class="table">
    <v-data-table
      :headers="headers"
      :items="stammdaten"
      :items-per-page="10"
      class="elevation-1"
      group-by="category"
      hide-default-footer
      @click:row="(item) => enterSelected(item)"
      @change="formChanged"
    >
      <template #header="{ text }">
        <span class="text-right">
          {{ text }}
        </span>
      </template>
      <template #group.header="{ items, isOpen, toggle }">
        <td :colspan="headers.length">
          <v-icon @click="toggle">
            {{ isOpen ? "mdi-minus" : "mdi-plus" }}
          </v-icon>
          <span> {{ items[0].category }}</span>
        </td>
      </template>
    </v-data-table>
    <v-row class="mt-4">
      <v-col
        cols="12"
        md="4"
      />
      <v-col
        cols="12"
        md="4"
        class="text-center"
      >
        <v-btn
          class="text-wrap"
          block
          @click="freieEingabe()"
          v-text="'Freie Eingabe'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import FoerderMixStammDisplay from "@/types/bauraten/FoerdermixStammDisplay";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixApiRequestMixin from "@/mixins/requests/FoerdermixApiRequestMixin";
import { FoerdermixStammDto } from "@/api/api-client";
import { createFoerdermix } from "@/utils/Factories";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class FoerdermixTabelle extends Mixins(
  FoerdermixApiRequestMixin,
  SaveLeaveMixin
) {
  @Prop()
  private value!: FoerdermixModel;

  get foerdermix(): FoerdermixModel {
    return this.value;
  }

  set foerdermix(model: FoerdermixModel) {
    this.$emit("input", model);
  }

  private stammdaten: FoerderMixStammDisplay[] = [];

  private headers = [
    {
      text: "",
      align: "center",
      value: "name",
      sortable: false,
    },
    {
      text: "Freifinanzierter Geschosswohnungsbau",
      value: "anteilFreifinanzierterGeschosswohnungsbau",
      align: "center",
    },
    {
      text: "Geförderter Mietwohnungsbau",
      value: "anteilGefoerderterMietwohnungsbau",
      align: "center",
    },
    {
      text: "MünchenModell",
      value: "anteilMuenchenModell",
      align: "center",
      width: "5%",
    },
    {
      text: "Preisgedämpfter Mietwohnungsbau",
      value: "anteilPreisgedaempfterMietwohnungsbau",
      align: "center",
    },
    {
      text: "Konzeptioneller Mietwohnungsbau",
      value: "anteilKonzeptionellerMietwohnungsbau",
      align: "center",
    },
    {
      text: "Baugemeinschaften",
      value: "anteilBaugemeinschaften",
      align: "center",
    },
    {
      text: "Ein- und Zweifamilienhäuser",
      value: "anteilEinUndZweifamilienhaeuser",
      align: "center",
    },
    { text: "Category", value: "category", align: "right" },
  ];

  mounted(): void {
    this.loadFoerdermixStaemme();
  }

  enterSelected(item: FoerderMixStammDisplay): void {
    this.foerdermix = FoerderMixStammDisplay.mapDisplayToFoerderMix(item);
  }

  /**
   * Setzt alle Felder auf 0
   */
  freieEingabe(): void {
    this.foerdermix = new FoerdermixModel(createFoerdermix());
  }

  async loadFoerdermixStaemme(): Promise<void> {
    await this.getFoerdermixStaemme(true).then((dto: FoerdermixStammDto[]) => {
      dto.forEach((foerdermixStamm: FoerdermixStammDto) => {
        this.stammdaten.push(
            FoerderMixStammDisplay.mapFoerdermixStammToDisplay(foerdermixStamm)
        );
        this.$store.dispatch("foerdermix/foerdermixStammdaten", dto);
      });
    });
  }
}
</script>

<style>
.table {
  width: 106%;
  left: 20%;
}
</style>
