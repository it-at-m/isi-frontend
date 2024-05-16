<template>
  <v-text-field
    ref="inputRef"
    v-model="formattedValue"
    :required="required"
    :rules="usedRules"
    validate-on="blur"
    @update:modelValue="formChanged()"
  >
    <!--
    Dieses Konstrukt dient dazu:
    1. Alle Slots von v-text-field zu unterstützen.
    2. Dem label-Slot einen Pflichtfeld-Stern anhängen zu können.
    3. Dafür zu sorgen, dass 2. auch mit dem label-Prop klappt.
    -->
    <template
      v-for="(index, name) in $slots"
      #[asString(name)]
    >
      <slot
        v-if="name !== 'label'"
        :name="name"
      />
    </template>
    <template #label>
      <slot name="label">
        {{ label }}
      </slot>
      <span
        v-if="required"
        class="text-secondary"
      >
        *
      </span>
    </template>
    <template
      v-if="help != undefined"
      #append
    >
      <v-tooltip
        max-width="15%"
        location="right"
      >
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps">mdi-help-circle-outline</v-icon>
        </template>
        <span>{{ help }} </span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
/**
 * NumField ist ein v-text-field, welches nur Zahlen akzeptiert und diese formatiert.
 * Dafür nutzt es https://dm4t2.github.io/vue-currency-input.
 *
 * Props:
 * - value (number): Die Zahl, die vom NumField formatiert werden soll. Wird üblicherweise mit v-model gesetzt.
 * - precision? (number, default=2): Wie viele Nachkommastellen die Zahl haben soll.
 * - min? (number, default=0): Der kleinste Wert, den die Zahl haben darf.
 * - max? (number): Der größte Wert, den die Zahl haben darf.
 * - noGrouping? (boolean): Lässt das Trennzeichen zwischen den Tausenderstellen entfallen.
 * - integer? (boolean): Identisch zu precision=0, was Nachkommastellen verhindert. Überschreibt precision.
 * - allowNegatives? (boolean): Identisch zu min=Number.MIN_SAFE_INTEGER. Überschreibt min.
 * - year? (boolean): Richtet das Feld so ein, als hätte es integer=true, min=1900, max=2100 und noGrouping=true. Überschreibt alles.
 * - required? (boolean): Stattet das Feld mit der pflichtfeld-Rule und einem Pflichtfeld-Stern hinter dem Label aus.
 * - Alle Props von v-text-field.
 *
 * Slots:
 * - Alle Slots von v-text-field.
 */

import { computed, watch } from "vue";
import { type CurrencyInputOptions, CurrencyDisplay, useCurrencyInput } from "vue-currency-input";
import { type Rule, min as minRule, max as maxRule, pflichtfeld } from "@/utils/FieldValidationRules";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  modelValue?: number;
  precision?: number;
  min?: number;
  max?: number;
  ignoreMaxValueSignedInteger?: boolean;
  ignoreMaxValueDecimalNumeralPrecision10Scale2?: boolean;
  integer?: boolean;
  allowNegatives?: boolean;
  noGrouping?: boolean;
  year?: boolean;
  required?: boolean;
  label?: string;
  rules?: Rule[];
  help?: string;
}

const MAX_VALUE_SIGNED_INTEGER = _.toNumber(2147483647);
const MAX_VALUE_DECIMAL_NUMERAL_PRECISION_10_SCALE_2 = _.toNumber("99999999.99");
const { formChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), {
  precision: 2,
  min: 0,
  ignoreMaxValueSignedInteger: false,
  ignoreMaxValueDecimalNumeralPrecision10Scale2: false,
  noGrouping: false,
  required: false,
});

// Vereinigt evtl. übergebene Rules und intern gesetzte Rules in einem Array.
const usedRules = computed(() => {
  const rules: Rule[] = [];

  if (props.rules) {
    rules.push(...props.rules);
  }

  if (props.required) {
    rules.push(pflichtfeld);
  }

  if (props.year) {
    rules.push(minRule(1900));
    rules.push(maxRule(2100));
  } else {
    if (props.min !== undefined && !props.allowNegatives) {
      rules.push(minRule(props.min));
    }
    if (props.max !== undefined) {
      rules.push(maxRule(props.max));
    } else if (props.integer && !props.ignoreMaxValueSignedInteger) {
      rules.push(maxRule(MAX_VALUE_SIGNED_INTEGER));
    } else if (!props.integer && !props.ignoreMaxValueDecimalNumeralPrecision10Scale2) {
      rules.push(maxRule(MAX_VALUE_DECIMAL_NUMERAL_PRECISION_10_SCALE_2));
    }
  }

  return rules;
});

// Legt die options für vue-currency-input fest.
const currencyInputOptions = computed(() => {
  const options: CurrencyInputOptions = {
    currency: "EUR", // Die Währung muss angegeben werden, auch wenn sie nicht angezeigt wird.
    currencyDisplay: CurrencyDisplay.hidden,
    precision: props.integer ? 0 : props.precision,
    useGrouping: !props.noGrouping,
  };

  if (props.year) {
    options.precision = 0;
    options.useGrouping = false;
  }

  return options;
});
// inputRef muss zum Funktionieren von vue-currency-input vorhanden sein.
// formattedValue ist notwendig, sobald man nicht direkt mit einem <input>-Element arbeitet.
const { inputRef, formattedValue, setValue } = useCurrencyInput(currencyInputOptions.value);

// Siehe https://dm4t2.github.io/vue-currency-input/guide.html#external-props-changes.
watch(
  () => props.modelValue,
  (value) => {
    setValue(value === undefined ? null : value);
  },
);

// Wird bloß zur korrekten Typisierung der Named Slots hergenommen.
function asString(value: string | number): string {
  return value.toString();
}
</script>
