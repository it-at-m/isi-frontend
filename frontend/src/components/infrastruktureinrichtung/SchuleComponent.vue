<template>
  <div>
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
            required
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
            required
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import NumField from "@/components/common/NumField.vue";

@Component({
  components: {
    FieldGroupCard,
    NumField,
  },
})
export default class SchuleComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: SchuleModel }) schule!: SchuleModel;
}
</script>
<style></style>
