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
        <v-col
            cols="12"
            md="4"
        >
          <num-field
              id="abfragevariante_realisierungvon"
              v-model="abfragevariante.realisierungVon"
              label="Realisierung von (JJJJ)"
              class="mx-3"
              year
              required
              maxlength="4"
          />
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <num-field
              id="abfragevariante_realisierungBis"
              v-model="abfragevariante.realisierungBis"
              label="Realisierung bis (JJJJ)"
              class="mx-3"
              year
              required
              maxlength="4"
          />
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-select
              id="abfragevariante_planungsrecht"
              v-model="abfragevariante.planungsrecht"
              class="mx-3"
              :items="planungsrechtList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
              @change="formChanged"
          >
            <template #label>
              Planungsrecht <span class="secondary--text">*</span>
            </template>
          </v-select>
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
              class="mx-3"
              label="Wohnen"
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
              class="mx-3"
              label="Genehmigt"
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
              class="mx-3"
              label="Festgesetzt"
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
              :key="componentKeyGeschossflaecheSobonUrsaechlich"
              v-model="abfragevariante.geschossflaecheWohnenSoBoNursaechlich"
              class="mx-3"
              label="SoBoN-ursächliche"
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
              class="mx-3"
              label="Genossenschaftliche Wohnungen"
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
              class="mx-3"
              label="Geplante"
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
import {Component, Mixins, Prop, VModel, Watch} from "vue-property-decorator";
import {AbfragevarianteDtoPlanungsrechtEnum, LookupEntryDto, UncertainBoolean} from "@/api/api-client/isi-backend";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";

@Component({components: {FieldGroupCard, NumField}})
export default class AbfragevarianteForm extends Mixins(
    FieldPrefixesSuffixes,
    FieldValidationRulesMixin,
    SaveLeaveMixin,
) {
  @VModel({type: AbfragevarianteModel}) abfragevariante!: AbfragevarianteModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  // Das Attribut führt bei einer Wertänderung dazu, dass das Eingabefeld neu gerendert wird.
  // Dies ist insbesondere bei der Änderung des Planungsrechts nötig, damit die Validerung korrekt aktiviert bzw. deaktiviert wird.
  private componentKeyGeschossflaecheSobonUrsaechlich = 0;

  @Prop()
  private sobonRelevant!: UncertainBoolean;

  get isSobonRelevant(): UncertainBoolean {
    return this.sobonRelevant;
  }

  get isGeschossflaecheSobonUrsaechlichPflichtfeld(): boolean {
    const pflichtfeld = this.isSobonRelevant === UncertainBoolean.True
        && (this.abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag12
            || this.abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag11);
    this.componentKeyGeschossflaecheSobonUrsaechlich++; // Trigger, damit die Komponente neu gerendert wird
    return pflichtfeld;
  }

  private geschossFlaecheCardTitle = "Geschossfläche";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  get planungsrechtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/planungsrecht"];
  }

  get headline(): string {
    const headline = `Abfragevariante Nr. ${this.abfragevariante.abfragevariantenNr} `;
    return this.displayMode === DisplayMode.NEU ? headline.concat("anlegen") : headline.concat("ändern");
  }

  @Watch("abfragevariante", {immediate: true, deep: true})
  public clearSonderwohnformData(): void {
    if (!this.abfragevariante.sonderwohnformen) {
      this.abfragevariante.geschossflaecheStudentenwohnungen = undefined;
      this.abfragevariante.geschossflaecheSeniorenwohnungen = undefined;
      this.abfragevariante.geschossflaecheSonstiges = undefined;
    }
  }
}
</script>
