<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <abfragevariante-common-component
      id="abfragevariante_common_component"
      ref="abfragevarianteCommonComponent"
      :is-editable="isEditable"
    />

    <geplante-geschossflaeche-wohnen-component
      id="geplante_geschossflaeche_wohnen_component"
      ref="geplanteGeschossflaecheWohnenComponent"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-component
      id="geplante_anzahl_wohneinheiten_component"
      ref="geplanteAnzahlWohneinheitenComponent"
      :is-editable="isEditable"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from "vue-property-decorator";
import AbfragevarianteCommonComponent from "@/components/abfragevarianten/AbfragevarianteCommonComponent.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";

@Component({ components: { FieldGroupCard, AbfragevarianteCommonComponent } })
export default class BauleitplanverfahrenComponent extends Vue {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;
}
</script>

<style></style>
