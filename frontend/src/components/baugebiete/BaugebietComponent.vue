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
            :disabled="!isEditableByAbfrageerstellung()"
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
            :disabled="!isEditableByAbfrageerstellung()"
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

    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="baugebiet.realisierungVon"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Realisierung von (JJJJ)"
            class="mx-3"
            year
            :min="abfragevarianteRealisierungVon"
            required
            maxlength="4"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungBis"
            v-model="calcRealisierungBis"
            :disabled="true"
            label="Realisierung bis (JJJJ)"
            class="mx-3"
            year
            maxlength="4"
          />
        </v-col>
      </v-row>
    </field-group-card>

    <field-group-card :card-title="geschossflaecheWohnenCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenFestgesetzt"
            v-model="baugebiet.geschossflaecheWohnen"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Gesamt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenGenehmigt"
            v-model="baugebiet.geschossflaecheWohnenGenehmigt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich Genehmigt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenFestgesetzt"
            v-model="baugebiet.geschossflaecheWohnenFestgesetzt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich Festgesetzt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="anzahlWECardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichGenehmigt"
            v-model="baugebiet.gesamtanzahlWe"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Gesamt"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichGenehmigt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichGenehmigt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich genehmigt"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichFestgesetzt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichFestgesetzt"
            :disabled="!isEditableByAbfrageerstellung()"
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
import { AbfragevarianteDto, BaurateDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import NumField from "@/components/common/NumField.vue";
import _ from "lodash";

@Component({ components: { NumField, FieldGroupCard } })
export default class BauabschnittComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  private geschossflaecheWohnenCardTitle = "Geschossfläche Wohnen";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private abfragevariante: AbfragevarianteDto | undefined;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get calcRealisierungBis(): number | undefined {
    return _.max(this.baugebiet.bauraten.map((baurate) => baurate.jahr));
  }

  get headline(): string {
    const headline = `Baugebiet ${this.baugebiet.bezeichnung} `;
    return this.displayMode === DisplayMode.NEU ? headline.concat("anlegen") : headline.concat("ändern");
  }

  get baugebietTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/baugebietTyp"];
  }

  get abfragevarianteRealisierungVon(): number | undefined {
    return this.abfragevariante?.realisierungVon;
  }
}
</script>
