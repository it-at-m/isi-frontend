<template>
  <div>
    <v-text-field
      v-if="!datePickerActivated"
      id="datum"
      v-model="datumTextField"
      append-icon="mdi-calendar"
      :rules="required ? [fieldValidationRules.pflichtfeld, fieldValidationRules.datum] : [fieldValidationRules.datum]"
      validate-on-blur
      :required="required"
      @click:append="activateDatePicker"
    >
      <template #label>
        {{ label
        }}<span
          v-if="required"
          class="secondary--text"
        >
          *</span
        >
      </template>
    </v-text-field>
    <v-dialog
      v-else
      ref="dialog"
      v-model="datePickerActivated"
      width="290px"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          id="datum_formattiertesDatum"
          v-model="datumTextFieldFormatted"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          @click:append="activateDatePicker"
          v-on="on"
        />
      </template>
      <v-date-picker
        id="datum_datePicker"
        v-model="datumDatePicker"
        locale="de"
        @change="deactivateDatePicker"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { Component, Prop, Mixins } from "vue-property-decorator";
import moment from "moment";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class DatePicker extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  /**
   * Bezeichnung des Datumsfelds
   */
  @Prop({ default: "" })
  private label!: string;

  /**
   * Der Datumswert der ausgewählt bzw. eingegeben wurde
   */
  @Prop({ default: undefined })
  private value!: Date;

  private isNewDateInput = false;

  get datum(): Date {
    return this.value;
  }

  set datum(date: Date) {
    this.formChanged();
    this.$emit("input", date);
  }

  /**
   * Ist das Datumsfeld ein Pflichtfeld
   */
  @Prop({ type: Boolean, default: false })
  private required!: boolean;

  private datePickerActivated = false;

  get datumDatePicker(): string {
    const datumAsString: string = moment.utc(this.datum).format("YYYY-MM-DD");
    return datumAsString;
  }

  set datumDatePicker(date: string) {
    const datumAsDate: Date = moment.utc(date, "YYYY-MM-DD").toDate();
    this.datum = datumAsDate;
  }

  private activateDatePicker() {
    this.datePickerActivated = true;
  }

  private deactivateDatePicker() {
    this.datePickerActivated = false;
  }

  get datumTextField(): string {
    return this.datumTextFieldFormatted;
  }

  set datumTextField(datum: string) {
    // moment in strict mode (true). Dies bewirkt, dass das Moment Objekt bei einem Parse Fehler als invalid behandelt wird
    const datumFormattedInUtc: moment.Moment = moment.utc(datum, "DD.MM.YYYY", true);
    if (datumFormattedInUtc.isValid()) {
      const datumAsDate: Date = datumFormattedInUtc.toDate();
      this.datum = datumAsDate;
    }
  }
  /**
   * Das Datum wird in den Factories immer auf den 1970-01-01 initialisert.
   * Falls das Datum den Initailwert hat wird ein leeres Feld angezeigt.
   * Ist aber der Datepicker geöffnet und das Datum ist immer noch der 1970-01-01 wird es auf das akutelle Datum geändert.
   */
  get datumTextFieldFormatted(): string {
    if (this.datePickerActivated) {
      if (moment(this.datum, "DD-MM-YYYY").isSame(moment("1970-01-01"), "day")) this.datum = new Date();
      return moment(this.datum).format("DD.MM.YYYY");
    } else {
      return moment(this.datum, "DD-MM-YYYY").isSame(moment("1970-01-01"), "day")
        ? ""
        : moment(this.datum).format("DD.MM.YYYY");
    }
  }
}
</script>
