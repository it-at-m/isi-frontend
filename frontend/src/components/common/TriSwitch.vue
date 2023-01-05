<template>
  <v-input
    class="pt-6"
    :value="valueInternal"
    :rules="rules"
    :disabled="disabled"
  >
    <template #label>
      <span>
        <slot name="label">{{ label }}</slot>
      </span>
    </template>
    <template #default>
      <div class="mx-3" />
      <span :class="`annotation ${getAnnotationColor('off')}`">
        <slot name="offText">{{ offText }}</slot>
      </span>
      <input
        v-model="valueAsPosition"
        :class="`slider mx-2 ${getBackgroundColor()}`"
        type="range"
        min="0"
        max="2"
        :step="isCollapsed() ? 2 : 1"
        @change="formChanged"
      >
      <span :class="`annotation ${getAnnotationColor('on')}`">
        <slot name="onText">{{ onText }}</slot>
      </span>
    </template>
  </v-input>
</template>

<script lang="ts">
import {Component, Mixins, Prop, VModel } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { UncertainBoolean } from "@/api/api-client";

type Position = "0" | "1" | "2";

/**
 * Eine Input-Komponente, welche sehr einem Switch ähnelt, jedoch einen mittleren Ausgangszustand hat.
 * Dieser Ausgangszustand ist nach einer Interaktion mit dem Switch nicht mehr erreichbar.
 * 
 * Die Komponente erwartet einen String-Prop 'value', welcher einen der drei Werte von {@link UncertainBoolean} annehmen darf.
 * Sobald dieser Wert nicht 'UNDEFINED' ist, ist der entsprechende mittlere Ausgangszustand nicht mehr erreichbar.
 * 
 * Mit den Props 'off-text' und 'on-text' kann jeweils eine Anmerkung für den "aus"- bzw. "an"-Zustand angegeben werden.
 * Die Props 'label', 'disabled' und 'rules' verhalten sich wie bei anderen Input-Komponenten in Vuetfiy.
 * Darüber hinaus können 'label', 'offText' und 'onText' auch über gleichnamige Slots befüllt werden.
 */
@Component
export default class TriSwitch extends Mixins(SaveLeaveMixin) {
  
  @VModel({ type: String })
  private valueInternal!: UncertainBoolean;

  @Prop()
  private readonly label: string | undefined;

  @Prop()
  private readonly offText: string | undefined;

  @Prop()
  private readonly onText: string | undefined;

  @Prop({ type: Boolean, default: false })
  private readonly disabled!: boolean;

  @Prop()
  private readonly rules: Array<(v: string) => boolean | string> | undefined;

  /**
   * Gibt in Abhängigkeit vom Zustand der Komponente eine Position für den Regler des Range Sliders zurück.
   * 
   * @return Entweder "0", "1" oder "2".
   */
  get valueAsPosition(): Position {
    switch (this.valueInternal) {
      case UncertainBoolean.True:
        return "2";
      case UncertainBoolean.False:
        return "0";
      default:
        return "1";
    }
  }

  /**
   * Setzt den Zustand der Komponente in Abhängigkeit davon, wo der Regler des Range Sliders ist.
   * 
   * @param position Entweder "0", "1" oder "2".
   */
  set valueAsPosition(position: Position) {
    switch (position) {
      case "2":
        this.valueInternal = UncertainBoolean.True;
        break;
      case "0":
        this.valueInternal = UncertainBoolean.False;
        break;
      default:
        this.valueInternal = UncertainBoolean.Unspecified;
    }
  }
  
  /**
   * Bestimmt die Hintergrundfarbe für den Range Slider.
   * 
   * @return Die entsprechende(n) CSS-Klasse(n).
   */
  private getBackgroundColor(): string {
    switch (this.valueInternal) {
      case UncertainBoolean.True:
        return "primary";
      case UncertainBoolean.False:
        return "grey";
      default:
        return "grey lighten-1";
    }
  }

  /**
   * Bestimmt die Textfarbe für die Texte links und rechts vom Range Slider.
   * 
   * @param type Entweder "on" oder "off", was für den rechten "onText" oder den linken "offText" steht.
   * @return Die entsprechende CSS-Klasse.
   */
  private getAnnotationColor(type: "on" | "off"): string {    
    if (this.valueInternal !== UncertainBoolean.Unspecified) {
      if (type === "on" && this.valueInternal === UncertainBoolean.True
      || type === "off" && this.valueInternal === UncertainBoolean.False) {
        return "";
      }
    }

    return "grey--text";
  }

  /**
   * Prüft, ob der interne Wert der Komponente nicht 'UNSPECIFIED' ist.
   * Dies entspricht einem "kollabierten" Switch.
   * 
   * @return Ob der Switch kollabiert ist.
   */
  private isCollapsed(): boolean {
    return this.valueInternal !== UncertainBoolean.Unspecified;
  }
}
</script>

<style scoped>
.annotation {
  transition: color 0.4s;
}

.slider {
  appearance: none;
  width: 60px;
  height: 24px;
  border-radius: 12px;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.4s;
}

/* Da der Regler des Range Sliders nicht browserunabhängig gestyled werden kann, müssen getrennte Konfigurationen bentutzt werden.
   (-webkit ist für Chrome, Safari und Edge; -moz ist für Firefox) */

.slider::-webkit-slider-thumb {
  appearance: none;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: white;
  transition: box-shadow 0.2s;
}

.slider::-moz-range-thumb {
  appearance: none;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: white;
  transition: box-shadow 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  box-shadow: 0px 0px 0px 10px rgba(50, 50, 50, 0.2);
}

.slider::-moz-range-thumb:hover {
  box-shadow: 0px 0px 0px 10px rgba(50, 50, 50, 0.2);
}
</style>
