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
    <common-component
      id="abfragevariante_common_component"
      ref="abfragevarianteCommonComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-component
      id="geplante_geschossflaeche_wohnen_component"
      ref="geplanteGeschossflaecheWohnenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-component
      id="geplante_anzahl_wohneinheiten_component"
      ref="geplanteAnzahlWohneinheitenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <sachbearbeitung-component
      id="sachbearbeitung_component"
      ref="sachbearbeitungComponent"
      v-model="abfragevariante"
    />
    <bedarfsmeldung-fachreferate-component
      id="bedarfsmeldung_fachreferate_component"
      ref="bedarfsmeldungFachreferateComponent"
      v-model="abfragevariante"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from "vue-property-decorator";
import CommonComponent from "@/components/abfragevarianten/CommonComponent.vue";
import GeplanteGeschossflaecheWohnenComponent from "@/components/abfragevarianten/GeplanteGeschossflaecheWohnenComponent.vue";
import GeplanteAnzahlWohneinheitenComponent from "@/components/abfragevarianten/GeplanteAnzahlWohneinheitenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BedarfsmeldungFachreferateComponent from "@/components/abfragevarianten/BedarfsmeldungFachreferateComponent.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";

@Component({
  components: {
    FieldGroupCard,
    CommonComponent,
    GeplanteGeschossflaecheWohnenComponent,
    GeplanteAnzahlWohneinheitenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungFachreferateComponent,
  },
})
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

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteBauleitplanverfahrenModel(
      this.abfragevariante,
    ).getAbfragevariantenNrForContextAnzeigeAbfragevariante(this.anzeigeContextAbfragevariante)} - `;
    return this.displayMode === DisplayMode.NEU
      ? headline.concat("anlegen")
      : headline.concat(`${this.abfragevariante.name}`);
  }
}
</script>

<style></style>
