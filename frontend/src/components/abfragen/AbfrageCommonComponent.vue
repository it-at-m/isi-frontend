<template>
  <div>
    <statusleiste-component :abfrage="abfrage" />
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="name_field"
            ref="nameAbfrageField"
            v-model.trim="abfrage.name"
            :disabled="!isEditable"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="70"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfrage <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import StatusleisteComponent from "./StatusleisteComponent.vue";

@Component({
  components: {
    FieldGroupCard,
    StatusleisteComponent,
  },
})
export default class AbfrageCommonComponent extends Mixins(
  AbfrageSecurityMixin,
  SaveLeaveMixin,
  FieldValidationRulesMixin,
) {
  @VModel({ type: AbfrageModel }) abfrage!: AbfrageModel;

  @Prop({ type: Boolean, default: true })
  private isEditableProp!: boolean;

  get isEditable(): boolean {
    return this.isEditableProp;
  }

  @Prop({ type: Boolean, default: false })
  private readonly isNew!: boolean;
}
</script>
