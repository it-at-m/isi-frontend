<template>
  <div>
    <einrichtungstraeger-component
      v-model="kinderkrippe"
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
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippePlaetze"
            v-model="kinderkrippe.anzahlKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der Kinderkrippenplätze"
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
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippeGruppen"
            v-model="kinderkrippe.anzahlKinderkrippeGruppen"
            class="mx-3"
            label="Anzahl der Kinderkrippengruppen"
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
            id="infrastruktureinrichtung_kinderkrippe_wohnungsnaheKinderkrippePlaetze"
            v-model="kinderkrippe.wohnungsnaheKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kinderkrippenplätze"
            integer
            :disabled="!isEditable"
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
import NumField from "@/components/common/NumField.vue";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    NumField,
    EinrichtungstraegerComponent,
  },
})
export default class KinderkrippeComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: KinderkrippeModel }) kinderkrippe!: KinderkrippeModel;

  private lookupStore = useLookupStore();

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isEinrichtungstraegerRequired!: boolean;

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.lookupStore.einrichtungstraeger;
  }
}
</script>
<style></style>
