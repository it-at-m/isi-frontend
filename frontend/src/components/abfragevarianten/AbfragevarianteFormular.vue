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
            v-model="abfragevariante.realisierungVon"
            label="Realisierung von (JJJJ)"
            class="mx-3"
            year
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            v-model="abfragevariante.realisierungBis"
            label="Realisierung bis (JJJJ)"
            class="mx-3"
            year
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
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

    <field-group-card :card-title="geschlossFlaecheCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
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
            v-model="abfragevariante.geschossflaecheWohnenSoBoNursaechlich"
            class="mx-3"
            label="SoBoN-urs??chliche"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            v-model="abfragevariante.geschossflaecheWohnenBestandswohnbaurecht"
            class="mx-3"
            label="Bestandswohnbaurrecht"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
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
import { Component, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";

@Component({ components: { FieldGroupCard, NumField } })
export default class AbfragevarianteForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteModel }) abfragevariante!: AbfragevarianteModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  private geschlossFlaecheCardTitle = "Geschlossfl??che";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  get planungsrechtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/planungsrecht"];
  }

  get headline(): string {
    return this.displayMode === DisplayMode.NEU ? "Abfragevariante anlegen" : `Abfragevariante Nr. ${this.abfragevariante.abfragevariantenNr} ??ndern`;
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
