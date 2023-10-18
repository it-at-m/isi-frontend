<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="planungsursaechliche_gf_wohnen_field"
            ref="planungsursaechlicheGfWohnenField"
            v-model="abfragevarianteSachbearbeitung.gfWohnenPlanungsursaechlich"
            :disabled="!isEditableBySachbearbeitung()"
            class="mx-3"
            label="Planungsursächliche GF Wohnen"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              id="sobon_orientierungswert_jahr_dropdown"
              ref="sobonOrientierungswertJahrDropdown"
              v-model="abfragevarianteSachbearbeitung.sobonOrientierungswertJahr"
              :items="sobonOrientierungswertJahrList"
              item-value="key"
              item-text="value"
              :rules="sobonOrientierungswertJahrValidator"
              @change="formChanged"
            >
              <template #label> Jahr für SoBoN-Orientierungwerte <span class="secondary--text">*</span> </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            :disabled="!isEditableBySachbearbeitung()"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

@Component({ components: { FieldGroupCard, NumField } })
export default class AbfragevarianteSachbearbeitungFormular extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonOrientierungswertJahr"];
  }

  get sobonOrientierungswertJahrValidator(): unknown[] {
    if (this.isEditableBySachbearbeitung()) {
      const usedRules: unknown[] = [];
      // Objekte der benötigten Rules anlegen, um daraus eine Liste von Rules anlegen zu können
      const rules = new FieldValidationRulesMixin().fieldValidationRules as {
        notUnspecified: (v: string) => boolean | string;
        pflichtfeld: (v: string) => boolean | string;
      };
      usedRules.push(rules.notUnspecified);
      usedRules.push(rules.pflichtfeld);
      return usedRules;
    }
    return [];
  }
}
</script>
