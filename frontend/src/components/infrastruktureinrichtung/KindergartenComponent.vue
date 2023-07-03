<template>
  <div>
    <infrastruktureinrichtung-component
      id="infrastruktureinrichtung_kindergarten_component"
      ref="infrastruktureinrichtungComponent"
      v-model="kindergarten.infrastruktureinrichtung"
      :mode="displayMode"
      :is-editable="isEditable"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kindergarten_anzahlKindergartenPlaetze"
            v-model="kindergarten.anzahlKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der Kindergartenplätze"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kindergarten_anzahlKindergartenGruppen"
            v-model="kindergarten.anzahlKindergartenGruppen"
            class="mx-3"
            label="Anzahl der Kindergartengruppen"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kindergarten_wohnungsnaheKindergartenPlaetze"
            v-model="kindergarten.wohnungsnaheKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kindergartenplätze"
            integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-row />
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
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
export default class KindergartenComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: KindergartenModel }) kindergarten!: KindergartenModel;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }
}
</script>
<style></style>
