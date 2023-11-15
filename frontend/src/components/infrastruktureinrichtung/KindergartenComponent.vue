<template>
  <div>
    <einrichtungstraeger-component
      v-model="kindergarten"
      :einrichtungstraeger-list="einrichtungstraegerList"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
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
            max-value-signed-integer
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
            max-value-signed-integer
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
            max-value-signed-integer
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
import NumField from "@/components/common/NumField.vue";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";

@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    NumField,
    EinrichtungstraegerComponent,
  },
})
export default class KindergartenComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: KindergartenModel }) kindergarten!: KindergartenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isEinrichtungstraegerRequired!: boolean;

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.$store.getters["lookup/einrichtungstraeger"];
  }
}
</script>
<style></style>
