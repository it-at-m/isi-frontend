<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <common-bezeichnung-bauliche-nutzung-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <common-realisierungszeitraum-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <geschossflaeche-wohnen-weiteres-verfahren-component
      v-model="baugebiet"
      :is-editable="isEditable"
    />
    <anzahl-wohneinheiten-weiteres-verfahren-component
      v-model="baugebiet"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="baugebiet" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { AbfragevarianteWeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import NumField from "@/components/common/NumField.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import CommonBezeichnungBaulicheNutzungComponent from "../CommonBezeichnungBaulicheNutzungComponent.vue";
import CommonRealisierungszeitraumComponent from "../CommonRealisierungszeitraumComponent.vue";
import GeschossflaecheWohnenWeiteresVerfahrenComponent from "./GeschossflaecheWohnenWeiteresVerfahrenComponent.vue";
import AnzahlWohneinheitenWeiteresVerfahrenComponent from "./AnzahlWohneinheitenWeiteresVerfahrenComponent.vue";

@Component({
  components: {
    NumField,
    FieldGroupCard,
    BauratenAggregiertComponent,
    GeschossflaecheWohnenWeiteresVerfahrenComponent,
    AnzahlWohneinheitenWeiteresVerfahrenComponent,
    CommonBezeichnungBaulicheNutzungComponent,
    CommonRealisierungszeitraumComponent,
  },
})
export default class BaugebietBaugenehmigungsverfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get headline(): string {
    const headline = `Baugebiet ${this.baugebiet.bezeichnung} `;
    return headline;
  }
}
</script>
