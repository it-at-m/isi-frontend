<template>
  <v-dialog
    v-model="datePickerActivated"
    width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        id="datum"
        v-model="textFieldDate"
        :rules="getRules()"
        validate-on-blur
        :hint="monthPicker ? MONTH_DISPLAY_FORMAT : DISPLAY_FORMAT"
        :disabled="disabled"
        :required="required"
        @input="formChanged"
        @blur="datePickerBlurred"
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
        <template #append>
          <v-icon v-on="on">mdi-calendar</v-icon>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      id="datum_datePicker"
      v-model="datePickerDate"
      :disabled="disabled"
      locale="de"
      :type="monthPicker ? 'month' : 'date'"
      @change="deactivateDatePicker"
      @input="formChanged"
    />
  </v-dialog>
</template>

<script lang="ts">
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { Component, VModel, Prop, Mixins, Watch } from "vue-property-decorator";
import moment from "moment";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";

@Component
export default class DatePicker extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  readonly ISO_FORMAT = "YYYY-MM-DD";
  readonly DISPLAY_FORMAT = "DD.MM.YYYY";
  readonly MONTH_DISPLAY_FORMAT = "MM.YYYY";

  /**
   * Bezeichnung des Datumsfelds
   */
  @Prop({ default: "" })
  private label!: string;

  /**
   * Der Datumswert der ausgewählt bzw. eingegeben wurde
   */
  @VModel({ type: Date }) date: Date | undefined;

  /**
   * Ist das Datumsfeld ein Pflichtfeld
   */
  @Prop({ type: Boolean, default: false })
  private required!: boolean;

  @Prop({ type: Boolean, default: false })
  private disabled!: boolean;

  /**
   * Ob nur Monat und Jahr auswählbar sein sollen.
   * Siehe https://v2.vuetifyjs.com/en/components/date-pickers-month.
   */
  @Prop({ type: Boolean, default: false })
  private monthPicker!: boolean;

  @Prop({ type: Array })
  private rules!: unknown[];

  private datePickerActivated = false;

  get datePickerDate(): string {
    if (!_.isNil(this.date)) {
      const parsedValue = moment.utc(this.date);
      if (!parsedValue.isSame(0)) {
        return parsedValue.format(this.ISO_FORMAT);
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
      und werden deshalb als heutiges Datum dargestellt. */
    return moment.utc().format(this.ISO_FORMAT);
  }

  set datePickerDate(date: string) {
    this.date = moment.utc(date, this.ISO_FORMAT).toDate();
  }

  get textFieldDate(): string {
    if (!_.isNil(this.date)) {
      const parsedValue = moment.utc(this.date);
      if (!parsedValue.isSame(0)) {
        return parsedValue.format(this.getDisplayFormat());
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
      und werden deshalb als leerer String dargestellt. */
    return "";
  }

  set textFieldDate(date: string) {
    /* Hier wird das Datum im "strict mode" geparsed, um den Nutzer-Input
      möglichst strikt zu validieren (https://momentjs.com/docs/#/parsing/is-valid/). */
    const parsedValue = moment.utc(date, this.getDisplayFormat(), true);

    if (parsedValue.isValid()) {
      this.date = parsedValue.toDate();
    } else {
      this.date = undefined;
    }
  }

  private getDisplayFormat(): string {
    return this.monthPicker ? this.MONTH_DISPLAY_FORMAT : this.DISPLAY_FORMAT;
  }

  private getRules(): unknown[] {
    const allRules = this.fieldValidationRules as {
      datum: (format: string) => (v: string) => boolean | string;
      pflichtfeld: (v: string) => boolean | string;
    };
    const usedRules: unknown[] = [allRules.datum(this.getDisplayFormat())];

    if (this.required) {
      usedRules.push(allRules.pflichtfeld);
    }
    if (this.rules) {
      usedRules.push(...this.rules);
    }

    return usedRules;
  }

  private activateDatePicker() {
    this.datePickerActivated = true;
  }

  private deactivateDatePicker() {
    this.datePickerActivated = false;
  }

  private datePickerBlurred(): void {
    this.$emit("datePickerBlurred", this.date);
  }
}
</script>
