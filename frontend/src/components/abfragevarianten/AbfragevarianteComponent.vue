<template>
  <v-container>
    <geplante-geschossflaeche-wohnen-component
      id="geplante_geschossflaeche_wohnen_component"
      ref="geplanteGeschossflaecheWohnenComponent"
      :is-editable="isEditable"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from "vue-property-decorator";
import GeplanteGeschossflaecheWohnenComponent from "@/components/abfragevarianten/GeplanteGeschossflaecheWohnenComponent.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

@Component({ components: { FieldGroupCard, GeplanteGeschossflaecheWohnenComponent } })
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

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  @Prop()
  private sobonRelevant!: UncertainBoolean;
}
</script>

<style></style>
