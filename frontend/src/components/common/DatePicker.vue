<template>
  <v-dialog
    v-model="datePickerActive"
    width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        id="datum"
        v-model="textFieldDate"
        :rules="usedRules"
        validate-on-blur
        :hint="displayFormat"
        :disabled="disabled"
        :required="required"
        @input="formChanged"
        @blur="blur"
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
      :first-day-of-week="1"
      locale="de"
      :type="monthPicker ? 'month' : 'date'"
      @change="datePickerActive = false"
      @input="formChanged"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import moment from "moment";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";
import { datum, pflichtfeld } from "@/utils/FieldValidationRules";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  monthPicker?: boolean; // Ob nur Monat und Jahr auswählbar sein sollen
  rules?: unknown[]; // Welche Validierungsregeln gelten
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
const date = defineModel<Date>();
const datePickerActive = ref(false);
const displayFormat = computed(() => (props.monthPicker ? MONTH_DISPLAY_FORMAT : DISPLAY_FORMAT));

const datePickerDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return parsedValue.format(ISO_FORMAT);
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als heutiges Datum dargestellt. */
    return moment.utc().format(ISO_FORMAT);
  },
  set(value: string) {
    date.value = moment.utc(value, ISO_FORMAT).toDate();
  },
});

const textFieldDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return parsedValue.format(displayFormat.value);
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als leerer String dargestellt. */
    return "";
  },
  set() {
    /* Hier wird das Datum im "strict mode" geparsed, um den Nutzer-Input
    möglichst strikt zu validieren (https://momentjs.com/docs/#/parsing/is-valid/). */
    const parsedValue = moment.utc(date.value, displayFormat.value, true);
    date.value = parsedValue.toDate();
  },
});

const usedRules = computed(() => {
  if (props.disabled) {
    return [];
  }

  const usedRules: unknown[] = [datum(displayFormat.value)];

  if (props.required) {
    usedRules.push(pflichtfeld);
  }
  if (props.rules) {
    usedRules.push(...props.rules);
  }

  return usedRules;
});

function blur(): void {
  emit("blur", date.value);
}
</script>
