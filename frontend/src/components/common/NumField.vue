<template>
  <v-text-field
    ref="inputRef"
    v-model="formattedValue"
    v-bind="$attrs"
    :required="required"
    :rules="usedRules"
    validate-on-blur
    @input="formChanged"
  >
    <!--
    Dieses Konstrukt dient dazu:
    1. Alle Slots von v-text-field zu unterstützen.
    2. Dem label-Slot einen Pflichtfeld-Stern anhängen zu können.
    3. Dafür zu sorgen, dass 2. auch mit dem label-Prop klappt.
    -->
    <template
      v-for="(index, name) in $slots"
      #[name]
    >
      <slot :name="name" />
    </template>
    <template #label>
      <slot name="label">
        {{ label }}
      </slot>
      <span
        v-if="required"
        class="secondary--text"
      >
        *</span
      >
    </template>
  </v-text-field>
</template>

<script lang="ts">
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

import { watch } from "vue";
import { CurrencyDisplay, CurrencyInputOptions, useCurrencyInput } from "vue-currency-input";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import store from "@/store/index";

interface Props {
  value: number;
  precision?: number;
  min?: number;
  max?: number;
  integer?: boolean;
  allowNegatives?: boolean;
  noGrouping?: boolean;
  year?: boolean;
  required?: boolean;
  label?: string;
  rules?: unknown[];
}

// <script setup> wird hier wegen technischen Einschränkungen bis zur Einführung von Vue 3 nicht genutzt.
export default {
  name: "NumField",
  props: {
    value: Number,
    precision: {
      type: Number,
      required: false,
      default: 2,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
    },
    integer: {
      type: Boolean,
      required: false,
    },
    allowNegatives: {
      type: Boolean,
      required: false,
    },
    noGrouping: {
      type: Boolean,
      required: false,
      default: false,
    },
    year: {
      type: Boolean,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    rules: {
      type: Array,
      required: false,
    },
  },
  setup(props: Props): unknown {
    // Vereinigt evtl. übergebene Rules und die intern gesetzten Rules in einem Array.

    const usedRules: unknown[] = [];

    if (props.rules) {
      usedRules.push(...props.rules);
    }

    // Da die Composition API keine Mixins unterstützt, müssen die Rules importiert werden.
    const allRules = new FieldValidationRulesMixin().fieldValidationRules as {
      min: (limit: number) => (v: string) => boolean | string;
      max: (limit: number) => (v: string) => boolean | string;
      pflichtfeld: (v: string) => boolean | string;
    };

    if (props.year) {
      usedRules.push(allRules.min(1900));
      usedRules.push(allRules.max(2100));
    } else {
      if (props.min !== undefined && !props.allowNegatives) {
        usedRules.push(allRules.min(props.min));
      }
      if (props.max !== undefined) {
        usedRules.push(allRules.max(props.max));
      }
    }

    if (props.required) {
      usedRules.push(allRules.pflichtfeld);
    }

    // Legt die options für vue-currency-input fest.

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

    // Initiert alles Notwendige für den Einsatz des Inputfelds.

    // inputRef muss zum Funktionieren von vue-currency-input vorhanden sein.
    // formattedValue ist notwendig, sobald man nicht direkt mit einem <input>-Element arbeitet.
    const { inputRef, formattedValue, setValue } = useCurrencyInput(options);

    // Siehe https://dm4t2.github.io/vue-currency-input/guide.html#external-props-changes.
    watch(
      () => props.value,
      (value) => {
        setValue(value);
      }
    );

    // Da die Composition API keine Mixins unterstützt, muss diese Funktion direkt implementiert werden.
    function formChanged(): void {
      // Da die aktuelle Version des Stores die Composition API nicht unterstützt, muss der Store importiert werden.
      store.dispatch("common/formChanged");
    }

    return { usedRules, formChanged, inputRef, formattedValue };
  },
};
</script>
