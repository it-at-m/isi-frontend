<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="infrastrukturabfrage.abfrage"
    >
    </abfrage-common-component>
    <allgemeine-informationen-component
      id="abfrage_allgemeine_informationen_component"
      ref="abfrageAllgemeineInformationenComponent"
      v-model="infrastrukturabfrage"
    >
    </allgemeine-informationen-component>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Watch } from "vue-property-decorator";
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenComponent from "@/components/abfragen/AllgemeineInformationenComponent.vue";
import { LookupEntryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

@Component({
  components: {
    AbfrageCommonComponent,
    AllgemeineInformationenComponent,
    FieldGroupCard,
    TriSwitch,
  },
})
export default class BauleitplanverfahrenComponent extends Mixins(
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: InfrastrukturabfrageModel }) infrastrukturabfrage!: InfrastrukturabfrageModel;

  private sobonJahrVisible = false;

  get sobonVerfahrensgrundsaetzeJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonVerfahrensgrundsaetzeJahr"];
  }

  @Watch("infrastrukturabfrage.sobonRelevant", { immediate: true })
  private sobonRelevantChanged(value: UncertainBoolean): void {
    if (value === UncertainBoolean.True) {
      this.sobonJahrVisible = true;
    } else {
      this.sobonJahrVisible = false;
      this.infrastrukturabfrage.sobonJahr = undefined;
    }
  }
}
</script>

<style></style>
