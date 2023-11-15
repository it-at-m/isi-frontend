<template>
  <div>
    <einrichtungstraeger-component
      v-model="schule"
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
            id="infrastruktureinrichtung_schule_anzahlKlassen"
            v-model="schule.anzahlKlassen"
            class="mx-3"
            label="Anzahl der Klassen"
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
            id="infrastruktureinrichtung_schule_anzahlPlaetze"
            v-model="schule.anzahlPlaetze"
            class="mx-3"
            label="Anzahl der Plätze"
            integer
            max-value-signed-integer
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import NumField from "@/components/common/NumField.vue";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
@Component({
  components: {
    FieldGroupCard,
    NumField,
    EinrichtungstraegerComponent,
  },
})
export default class SchuleComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: SchuleModel }) schule!: SchuleModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly isEinrichtungstraegerRequired!: boolean;

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.$store.getters["lookup/einrichtungstraegerSchulen"];
  }
}
</script>
<style></style>
