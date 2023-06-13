<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevarianteSachbearbeitung_geschossflaecheWohnenPlanungsursaechlich"
            v-model="abfragevarianteSachbearbeitung.geschossflaecheWohnenPlanungsursaechlich"
            class="mx-3"
            label="Planungsursächliche Geschossfläche Wohnen"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfragevarianteSachbearbeitung_soBoNOrientierungswertJahr"
            v-model="abfragevarianteSachbearbeitung.soBoNOrientierungswertJahr"
            :items="sobonOrientierungswertJahrList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label> Jahr für SoBoN-Orientierungwerte <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="bedarfsmeldungenFachreferateTitle">
      <v-row justify="center"> <v-col cols="12"></v-col></v-row
    ></field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import AbfragevarianteSachbearbeitungModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

@Component({ components: { FieldGroupCard, NumField } })
export default class AbfragevarianteForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: AbfragevarianteSachbearbeitungModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteSachbearbeitungModel;

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonOrientierungswertJahr"];
  }

  private weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

  private bedarfsmeldungenFachreferateTitle = "Bedarfsmeldungen der Fachreferate";
}
</script>
