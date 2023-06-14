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
            id="baugebiet_bezeichnung"
            v-model.trim="baugebiet.bezeichnung"
            :disabled="!isEditable"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Bezeichnung des Baugegebiets <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-select
            id="baugebiet_baugebietTyp"
            v-model="baugebiet.baugebietTyp"
            :disabled="!isEditable"
            class="mx-3"
            :items="baugebietTypList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label> Baugebiet Typ <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="geschossFlaecheCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenGenehmigt"
            v-model="baugebiet.geschossflaecheWohnenGenehmigt"
            :disabled="!isEditable"
            class="mx-3"
            label="Genehmigt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenFestgesetzt"
            v-model="baugebiet.geschossflaecheWohnenFestgesetzt"
            :disabled="!isEditable"
            class="mx-3"
            label="Festgesetzt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="anzahlWECardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichGenehmigt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichGenehmigt"
            :disabled="!isEditable"
            class="mx-3"
            label="Baurechtlich genehmigt"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichFestgesetzt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichFestgesetzt"
            :disabled="!isEditable"
            class="mx-3"
            label="Baurechtlich festgesetzt"
            integer
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
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
  private geschossFlaecheCardTitle = "Geschossfläche";

  private anzahlWohneinheitenCardTitle = "Anzahl Wohneinheiten";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Number, default: 1 })
  private readonly anzeigeContext!: AnzeigeContext;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get headline(): string {
    const headline = `Baugebiet ${this.baugebiet.bezeichnung} `;
    return this.displayMode === DisplayMode.NEU ? headline.concat("anlegen") : headline.concat("ändern");
  }

  get baugebietTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/baugebietTyp"];
  }

  get isEditable(): boolean {
    let isEditable = false;
    if (this.anzeigeContext === AnzeigeContext.ABFRAGEVARIANTE) {
      isEditable = this.isEditableByAbfrageerstellung();
    } else if (this.anzeigeContext === AnzeigeContext.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      isEditable = this.isEditableBySachbearbeitung();
    }
    return isEditable;
  }
}
</script>
