<template>
  <v-container>
    <abfrage-component
      id="abfrage_infrastrukturabfrage_abfragecomponent_component"
      ref="abfrageComponent"
      v-model="infrastrukturabfrage.abfrage"
    >
      <template #aktenzeichenProLBK>
        <v-text-field
          id="abfrage_infrastrukturabfrage_aktenzeichenprolbk"
          v-model="infrastrukturabfrage.aktenzeichenProLbk"
          label="Aktenzeichen ProLBK"
          maxlength="255"
          @input="formChanged"
        />
      </template>
    </abfrage-component>
    <field-group-card :card-title="sobonCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <TriSwitch
            id="abfrage_infrastrukturabfrage_sobonRelevant_triswitch"
            v-model="infrastrukturabfrage.sobonRelevant"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
          >
            <template #label>
              SoBoN-relevant <span class="secondary--text">*</span>
            </template>
          </TriSwitch>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              v-if="sobonJahrVisible"
              id="abfrage_infrastrukturabfrage_sobonJahr_dropdown"
              v-model="infrastrukturabfrage.sobonJahr"
              :items="sobonVerfahrensgrundsaetzeJahrList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld]"
              @change="formChanged"
            >
              <template #label>
                Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN <span class="secondary--text">*</span>
              </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="offiziellCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
        >
          <TriSwitch
            id="abfrage_infrastrukturabfrage_offiziellerVerfahrensschritt_triswitch"
            v-model="infrastrukturabfrage.offiziellerVerfahrensschritt"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
          >
            <template #label>
              Offiziell <span class="secondary--text">*</span>
            </template>
          </TriSwitch>
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import {Component, Mixins, VModel, Watch} from "vue-property-decorator";
import AbfrageComponent from "@/components/abfragen/AbfrageComponent.vue";
import {LookupEntryDto, UncertainBoolean} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: {
    AbfrageComponent,
    FieldGroupCard,
    TriSwitch
  },
  mixins: [FieldValidationRulesMixin],
})
export default class InfrastrukturabfrageComponent extends Mixins(SaveLeaveMixin) {
  @VModel({type: InfrastrukturabfrageModel}) infrastrukturabfrage!: InfrastrukturabfrageModel;

  private sobonCardTitle = "SoBoN";

  private offiziellCardTitle = "Verfahrensschritt";

  private sobonJahrVisible = false;
  
  mounted(): void {
    console.log("InfrastrukturabfrageComponent mounted");
  }

  get sobonVerfahrensgrundsaetzeJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonVerfahrensgrundsaetzeJahr"];
  }

  @Watch("infrastrukturabfrage.sobonRelevant", {immediate: true})
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
