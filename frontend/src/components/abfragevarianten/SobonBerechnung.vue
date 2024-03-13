<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-checkbox
        id="sobon_berechnung"
        ref="sobonBerechnungCheckbox"
        v-model="sobonBerechnung.isASobonBerechnung"
        :disabled="!isEditableBySachbearbeitung()"
        class="mx-3"
        label="SoBoN-Berechnung"
        color="primary"
        @change="sobonBerechnungChanged"
      />
    </v-col>
    <v-expand-transition>
      <v-col
        v-if="sobonBerechnung.isASobonBerechnung"
        cols="12"
        md="6"
      >
        <v-select
          id="sobon_berechnung_foerdermix_stammdaten_dropdown"
          v-model="sobonFoerdermix"
          :disabled="!isEditableBySachbearbeitung()"
          :items="groupedStammdaten"
          label="Fördermix für Berechnung"
          item-text="foerdermix.bezeichnung"
          return-object
          @change="formChanged"
        />
      </v-col>
    </v-expand-transition>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { FoerdermixStammDto, SobonBerechnungDto } from "@/api/api-client/isi-backend";
import {
  groupItemsToHeader,
  mapFoerdermixStammModelToFoerderMix,
  mapFoerdermixToFoerderMixStammModel,
} from "@/utils/MapperUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { createFoerdermixDto } from "@/utils/Factories";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import SobonBerechnungModel from "@/types/model/abfragevariante/SobonBerechnungModel";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;
@Component
export default class SobonBerechnung extends Mixins(SaveLeaveMixin, AbfrageSecurityMixin) {
  @VModel({ type: SobonBerechnungModel })
  sobonBerechnung!: SobonBerechnungModel;

  private groupedStammdaten: GroupedStammdaten = [];

  mounted(): void {
    this.setGroupedStammdatenList();
  }

  get sobonFoerdermix(): FoerdermixStammDto {
    return mapFoerdermixToFoerderMixStammModel(
      this.sobonBerechnung.sobonFoerdermix ?? new FoerdermixModel(createFoerdermixDto()),
    );
  }

  set sobonFoerdermix(item: FoerdermixStammModel) {
    this.sobonBerechnung.sobonFoerdermix = mapFoerdermixStammModelToFoerderMix(item);
  }
  private setGroupedStammdatenList(): void {
    let stammdaten = this.$store.getters["stammdaten/foerdermixStammdaten"];
    stammdaten = stammdaten.filter((foerdermixStaemme: FoerdermixStammDto) => {
      return (
        foerdermixStaemme.foerdermix.bezeichnung !== "private Fläche" &&
        foerdermixStaemme.foerdermix.bezeichnung !== "städtische Fläche"
      );
    });
    this.groupedStammdaten = groupItemsToHeader(stammdaten, true);
  }

  private sobonBerechnungChanged(): void {
    this.formChanged();
    if (!this.sobonBerechnung.isASobonBerechnung) {
      this.sobonBerechnung.sobonFoerdermix = undefined;
    }
  }
}
</script>

<style></style>
