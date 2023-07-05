<template>
  <div>
    <infrastruktureinrichtung-component
      id="infrastruktureinrichtung_kinderkrippe_component"
      ref="infrastruktureinrichtungComponent"
      v-model="kinderkrippe"
      :mode="displayMode"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippePlaetze"
            v-model="kinderkrippe.anzahlKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der Kinderkrippenplätze"
            integer
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippeGruppen"
            v-model="kinderkrippe.anzahlKinderkrippeGruppen"
            class="mx-3"
            label="Anzahl der Kinderkrippengruppen"
            integer
            required
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kinderkrippe_wohnungsnaheKinderkrippePlaetze"
            v-model="kinderkrippe.wohnungsnaheKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kinderkrippenplätze"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        />
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import NumField from "@/components/common/NumField.vue";

@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    NumField,
  },
})
export default class KinderkrippeComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: KinderkrippeModel }) kinderkrippe!: KinderkrippeModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }
}
</script>
<style></style>
