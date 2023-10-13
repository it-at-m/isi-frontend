<template>
  <v-container>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="name_field"
            ref="nameField"
            v-model.trim="abfragevariante.name"
            :disabled="!isEditable"
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
            id="satzungsbeschluss_datepicker"
            ref="satzungsbeschlussDatePicker"
            v-model="abfragevariante.satzungsbeschluss"
            :disabled="!isEditable"
            label="Datum Satzungsbeschluss"
            month-picker
            @datePickerBlurred="datumSatzungsbeschlussChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="wesentliche_rechtsgrundlage_dropdown"
            ref="wesentlicheRechtsgrundlageDropdown"
            v-model="abfragevariante.wesentlicheRechstgrundlage"
            :items="wesentlicheRechtsgrundlageBauleitplanverfahrenList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Wesentliche Rechtsgrundlage
              <span class="secondary--text">*</span>
            </template>
          </v-autocomplete>
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
            :disabled="!isEditable"
            label="Realisierung von (JJJJ)"
            year
            maxlength="4"
            required
            help="Erfolgt bei Datum Satzungsbeschluss eine Eingabe, wird das Datum 'Realisierung von' neu berechnet. 'Realisierung von' kann jedoch weiterhin geändert werden."
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
            help="Nach Angabe bzw. Berechnung der Bauraten wird das Feld automatisch befüllt."
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, VModel, Mixins, Prop } from "vue-property-decorator";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

@Component({ components: { FieldGroupCard } })
export default class BauleitplanverfahrenComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get wesentlicheRechtsgrundlageBauleitplanverfahrenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/wesentlicheRechtsgrundlageBauleitplanverfahren"];
  }

  get calcRealisierungBis(): number | undefined {
    let jahre: Array<number> | undefined = this.abfragevariante.bauabschnitte
      ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
      .flatMap((baugebiet) => baugebiet.bauraten)
      .map((baurate) => baurate.jahr);
    return _.max(jahre);
  }

  private datumSatzungsbeschlussChanged(datumSatzungsbeschluss: Date): void {
    if (!_.isNil(datumSatzungsbeschluss)) {
      this.abfragevariante.realisierungVon =
        datumSatzungsbeschluss.getMonth() + 1 < 7
          ? datumSatzungsbeschluss.getFullYear() + 3
          : datumSatzungsbeschluss.getFullYear() + 4;
    }
  }
}
</script>

<style></style>
