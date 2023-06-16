<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
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
            id="abfragevariante_name"
            v-model.trim="abfragevariante.abfragevariantenName"
            :disabled="!isEditableByAbfrageerstellung()"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="30"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfragevariante <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="abfragevariante_satzungsbeschluss"
            v-model="abfragevariante.satzungsbeschluss"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Datum Satzungsbeschluss"
            :rules="[fieldValidationRules.requiredIfOtherEmpty(abfragevariante.realisierungVon, 'Realisierung von')]"
            month-picker
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfragevariante_planungsrecht"
            v-model="abfragevariante.planungsrecht"
            :disabled="!isEditableByAbfrageerstellung()"
            :items="planungsrechtList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label> Planungsrecht <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="abfragevariante.realisierungVon"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Realisierung von (JJJJ)"
            year
            maxlength="4"
            :rules="[
              fieldValidationRules.requiredIfOtherEmpty(abfragevariante.satzungsbeschluss, 'Datum Satzungsbeschluss'),
            ]"
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
            year
            maxlength="4"
          />
        </v-col>
      </v-row>
    </field-group-card>

    <field-group-card :card-title="geschossFlaecheCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_geschossflaecheWohnen"
            v-model="abfragevariante.geschossflaecheWohnen"
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
            id="abfragevariante_geschossflaecheWohnenGenehmigt"
            v-model="abfragevariante.geschossflaecheWohnenGenehmigt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich genehmigt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_geschossflaecheWohnenFestgesetzt"
            v-model="abfragevariante.geschossflaecheWohnenFestgesetzt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich festgesetzt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_geschossflaecheWohnenSoBoNursaechlich"
            v-model="abfragevariante.geschossflaecheWohnenSoBoNursaechlich"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="SoBoN-ursächlich"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            :required="isGeschossflaecheSobonUrsaechlichPflichtfeld"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_geschossflaecheWohnenBestandswohnbaurecht"
            v-model="abfragevariante.geschossflaecheWohnenBestandswohnbaurecht"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Bestandswohnbaurecht"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_geschossflaecheGenossenschaftlicheWohnungen"
            v-model="abfragevariante.geschossflaecheGenossenschaftlicheWohnungen"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Genossenschaftlich"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <v-checkbox
            id="abfragevariante_sonderwohnformen"
            v-model="abfragevariante.sonderwohnformen"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Sonderwohnformen"
            color="primary"
            @change="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="8"
        />
      </v-row>

      <v-expand-transition>
        <v-row
          v-if="abfragevariante.sonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="abfragevariante_geschossflaecheStudentenwohnungen"
              v-model="abfragevariante.geschossflaecheStudentenwohnungen"
              :disabled="!isEditableByAbfrageerstellung()"
              class="mx-3"
              label="Studentenwohnungen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="abfragevariante_geschossflaecheSeniorenwohnungen"
              v-model="abfragevariante.geschossflaecheSeniorenwohnungen"
              :disabled="!isEditableByAbfrageerstellung()"
              class="mx-3"
              label="Seniorenwohnungen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="abfragevariante_geschossflaecheSonstiges"
              v-model="abfragevariante.geschossflaecheSonstiges"
              :disabled="!isEditableByAbfrageerstellung()"
              class="mx-3"
              label="Nicht infrastrukturrelevant"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
        </v-row>
      </v-expand-transition>
    </field-group-card>

    <field-group-card :card-title="anzahlWECardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="abfragevariante_gesamtanzahlWe"
            v-model="abfragevariante.gesamtanzahlWe"
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
            id="abfragevariante_anzahlWeBaurechtlichGenehmigt"
            v-model="abfragevariante.anzahlWeBaurechtlichGenehmigt"
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
            id="abfragevariante_anzahlWeBaurechtlichFestgesetzt"
            v-model="abfragevariante.anzahlWeBaurechtlichFestgesetzt"
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
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import { AbfragevarianteDtoPlanungsrechtEnum, LookupEntryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import _ from "lodash";

@Component({ components: { FieldGroupCard, NumField } })
export default class AbfragevarianteForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: AbfragevarianteModel }) abfragevariante!: AbfragevarianteModel;

  @Prop()
  private mode!: DisplayMode;

  @Prop()
  private sobonRelevant!: UncertainBoolean;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get calcRealisierungBis(): number | undefined {
    let jahre: Array<number> | undefined = this.abfragevariante.bauabschnitte
      ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
      .flatMap((baugebiet) => baugebiet.bauraten)
      .map((baurate) => baurate.jahr);
    return _.max(jahre);
  }

  get isSobonRelevant(): UncertainBoolean {
    return this.sobonRelevant;
  }

  get isGeschossflaecheSobonUrsaechlichPflichtfeld(): boolean {
    const pflichtfeld =
      this.isSobonRelevant === UncertainBoolean.True &&
      (this.abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag12 ||
        this.abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag11);
    return pflichtfeld;
  }

  private geschossFlaecheCardTitle = "Geschossfläche Wohnen";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  get planungsrechtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/planungsrecht"];
  }

  get headline(): string {
    const headline = `Abfragevariante Nr: ${this.abfragevariante.abfragevariantenNr} - `;
    return this.displayMode === DisplayMode.NEU
      ? headline.concat("anlegen")
      : headline.concat(`${this.abfragevariante.abfragevariantenName} ändern`);
  }

  @Watch("abfragevariante", { immediate: true, deep: true })
  public clearSonderwohnformData(): void {
    if (!this.abfragevariante.sonderwohnformen) {
      this.abfragevariante.geschossflaecheStudentenwohnungen = undefined;
      this.abfragevariante.geschossflaecheSeniorenwohnungen = undefined;
      this.abfragevariante.geschossflaecheSonstiges = undefined;
    }
  }
}
</script>
