<template>
  <field-group-card>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          id="baugebiet_bezeichnung"
          v-model.trim="baugebiet.bezeichnung"
          :disabled="!isEditable"
          :rules="[fieldValidationRules.pflichtfeld]"
          maxlength="255"
          validate-on-blur
          @input="formChanged"
        >
          <template #label> Bezeichnung des Baugebiets <span class="secondary--text">*</span> </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-select
          id="baugebiet_art_bauliche_nutzung"
          v-model="baugebiet.artBaulicheNutzung"
          :disabled="!isEditable"
          class="mx-3"
          :items="artBaulicheNutzungList"
          item-value="key"
          item-text="value"
          :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
          @change="formChanged"
        >
          <template #label> Art der baulichen Nutzung <span class="secondary--text">*</span> </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="artBaulicheNutzungFreieEingabeVisible"
            id="art_bauliche_nutzung_freie_eingabe_field"
            ref="artBaulicheNutzungFreieEingabeField"
            v-model="baugebiet.artBaulicheNutzungFreieEingabe"
            :disabled="!isEditable"
            label="Freie Eingabe"
            maxlength="1000"
            @input="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import {
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  LookupEntryDto,
  BauvorhabenDtoArtFnpEnum,
  BaugebietDtoArtBaulicheNutzungEnum,
} from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import NumField from "@/components/common/NumField.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import _ from "lodash";

@Component({ components: { NumField, FieldGroupCard, BauratenAggregiertComponent } })
export default class CommonBezeichnungBaulicheNutzungComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  private lookupStore = useLookupStore();

  @Prop()
  private abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto
    | undefined;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private artBaulicheNutzungFreieEingabeVisible = false;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get headline(): string {
    const headline = `Baugebiet ${this.baugebiet.bezeichnung} `;
    return headline;
  }

  get artBaulicheNutzungList(): LookupEntryDto[] {
    return this.lookupStore.artBaulicheNutzung;
  }

  @Watch("baugebiet.artBaulicheNutzung", { immediate: true })
  private artFnpChanged(): void {
    if (_.isEqual(this.baugebiet.artBaulicheNutzung, BaugebietDtoArtBaulicheNutzungEnum.FreieEingabe)) {
      this.artBaulicheNutzungFreieEingabeVisible = true;
    } else {
      this.baugebiet.artBaulicheNutzungFreieEingabe = undefined;
      this.artBaulicheNutzungFreieEingabeVisible = false;
    }
  }
}
</script>
