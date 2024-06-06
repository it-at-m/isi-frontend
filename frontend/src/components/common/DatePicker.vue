<template>
  <v-dialog
    v-model="datePickerActive"
    width="290px"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        id="datum"
        v-model="textFieldDate"
        :rules="usedRules"
        variant="underlined"
        validate-on="blur"
        :hint="displayFormat"
        :disabled="disabled"
        :required="required"
        @update:model-value="formChanged"
        @blur="blur"
      >
        <template #label>
          {{ label }}
          <span
            v-if="required"
            class="text-secondary"
          >
            *
          </span>
        </template>
        <template #append>
          <v-icon v-bind="activatorProps">mdi-calendar</v-icon>
        </template>
      </v-text-field>
    </template>
    <!-- Picker für die tagesgenaue Auswahl -->
    <v-date-picker
      v-if="!monthPicker"
      id="datum_datePicker"
      v-model="datePickerDate"
      :disabled="disabled"
      show-week
      show-adjacent-months
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      color="primary"
      @update:model-value="deactivateDatePicker"
    />
    <!-- Picker für die monatsgenaue Auswahl -->
    <v-date-picker
      v-else
      id="datum_datePicker"
      v-model="datePickerDate"
      :disabled="disabled"
      :view-mode="viewMode"
      color="primary"
      @update:year="updateYearForMonthPicker"
      @update:view-mode="updateViewModeForMonthPicker"
      @update:month="setTextFieldDateForMonthPicker"
      @update:model-value="deactivateDatePicker"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Rule } from "@/utils/FieldValidationRules";
import { datum, pflichtfeld } from "@/utils/FieldValidationRules";
import moment from "moment";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  monthPicker?: boolean; // Ob nur Monat und Jahr auswählbar sein sollen
  rules?: Rule[]; // Welche Validierungsregeln gelten
}

interface Emits {
  (event: "blur", value: Date | undefined): void;
}

const ISO_FORMAT = "YYYY-MM-DD";
const DISPLAY_FORMAT = "DD.MM.YYYY";
const MONTH_DISPLAY_FORMAT = "MM.YYYY";
const { formChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), { label: "", required: false, disabled: false, monthPicker: false });
const emit = defineEmits<Emits>();
const date = defineModel<Date | undefined>();
const datePickerActive = ref(false);
const displayFormat = computed(() => (props.monthPicker ? MONTH_DISPLAY_FORMAT : DISPLAY_FORMAT));

// Month picker props
const viewMode = ref("months");
const selectedYear = ref();

const datePickerDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return moment(parsedValue.format(ISO_FORMAT)).toDate();
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als heutiges Datum dargestellt. */
    return new Date();
  },

  set(value: Date) {
    date.value = value;
    formChanged();
  },
});

const textFieldDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return parsedValue.local().format(displayFormat.value);
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als leerer String dargestellt. */
    return "";
  },

  set(value: string) {
    /* Hier wird das Datum im "strict mode" geparsed, um den Nutzer-Input
    möglichst strikt zu validieren (https://momentjs.com/docs/#/parsing/is-valid/). */
    const parsedValue = moment.utc(value, displayFormat.value, true);
    if (parsedValue.isValid()) {
      date.value = parsedValue.toDate();
    } else {
      date.value = undefined;
    }
    formChanged();
  },
});

const usedRules = computed(() => {
  if (props.disabled) {
    return [];
  }

  const usedRules: Rule[] = [datum(displayFormat.value)];

  if (props.required) {
    usedRules.push(pflichtfeld);
  }
  if (props.rules) {
    usedRules.push(...props.rules);
  }

  return usedRules;
});

function updateViewModeForMonthPicker(mode: string): void {
  viewMode.value = mode === "year" ? "year" : "months";
}

function updateYearForMonthPicker(year: number): void {
  selectedYear.value = year;
}

function setTextFieldDateForMonthPicker(monthIndex: number): void {
  let selectedDate: Date;
  if (_.isNil(selectedYear.value)) {
    const year = _.isNil(date.value) ? new Date().getFullYear() : date.value.getFullYear();
    selectedDate = new Date(year, monthIndex, 2);
  } else {
    selectedDate = new Date(selectedYear.value, monthIndex, 2);
  }
  textFieldDate.value = moment.utc(selectedDate).local().format(displayFormat.value);
  selectedYear.value = undefined;
  deactivateDatePicker();
}

function deactivateDatePicker(): void {
  datePickerActive.value = false;
}

function blur(): void {
  emit("blur", date.value);
}
</script>
