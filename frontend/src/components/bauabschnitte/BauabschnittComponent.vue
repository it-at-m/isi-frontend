<template>
  <div>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="bauabschnitt_bezeichnung"
            v-model.trim="bauabschnitt.bezeichnung"
            :disabled="!isEditable"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Bezeichnung des Bauabschnitts <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { AnzeigeContext } from "@/views/Abfrage.vue";

@Component({ components: { FieldGroupCard } })
export default class BauabschnittComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: BauabschnittModel }) bauabschnitt!: BauabschnittModel;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get headline(): string {
    const headline = `Bauabschnitt ${this.bauabschnitt.bezeichnung} `;
    return this.displayMode === DisplayMode.NEU ? headline.concat("anlegen") : headline.concat("ändern");
  }
}
</script>
