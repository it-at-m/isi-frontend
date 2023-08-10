<!--
Wrapper-Komponente zum Einordnen von Inhalten in das Seitenlayout.
Unterscheidet zwischen fünf verschiedenen Zonen, welche jeweils einem Slot entsprechen:
Seiteninhalt (content), Navigation (navigation), Aktionen (action), Titel (heading) und Pagination (pagination).
content hat keine besondere Positionierung. Mit der Boolean-Property "wide" nimmt es die gesamte Bildschirmbreite ein, ansonsten nur die mittleren 60%.
navigation sowie action sind Sidebars, welche nicht mitscrollen und sich über content befinden. Sie ordnen ihre Unterelemente von unten nach oben und zentriert auf der x-Achse an.
Zum Verschieben der Unterelemente auf der x-Achse können v-spacer benutzt werden, zum Verschieben auf der y-Achse die "align-self-*"-Klassen von Vuetify, siehe https://vuetifyjs.com/en/styles/flex/#flex-align-self.
heading sowie pagination sind Header- bzw. Footer-artig, scrollen nicht mit und befinden sich über content. Sie zentrieren sowohl auf der x- als auch auf der y-Achse und sind dafür gedacht, ein einziges Element unterzubringen.
Mittels der BooleanProperty "solidHeading" wird das heading weiß gefärbt und bekommt einen schmalen Transparenzverlauf, um es vom drunterliegenden content trennen zu können.
Sollen die zwei Seitenbereiche eine verstellbare Breite haben, kann der `resizable`-Prop benutzt werden.
-->

<template>
  <!-- Das `user-select` ist ein Workaround dafür, dass beim Resizen der Text auf der Seite ständig ausgewählt wird. -->
  <div
    class="wrapper"
    :style="{ 'user-select': resizingNavigation || resizingAction ? 'none' : 'auto' }"
    @mousemove="resize"
    @mouseup="stopResizing"
    @mouseleave="stopResizing"
  >
    <!--
    Bei Angabe des `solid-heading`-Props wird dem Content oben Padding hinzugefügt, sodass es sich nicht mit dem Heading überlappt.
    Bei Angabe des 'wide'-Props wird dem Content kein horizontales Padding hinzugefügt, sodass es sich mit dem Navigation- und Action Bereich überlappt.
    -->
    <div
      :class="{ 'content-wrapper': true, 'v-padded': solidHeading }"
      :style="{
        'padding-left': wide ? '0px' : navigationWidth,
        'padding-right': wide ? '0px' : actionWidth,
      }"
    >
      <slot name="content" />
    </div>
    <div class="control-wrapper">
      <div
        class="side-bar"
        :style="{ 'flex-basis': navigationWidth }"
      >
        <div class="side-bar-navigation">
          <slot name="navigation" />
        </div>
      </div>
      <div
        v-if="resizable"
        class="separator"
        @mousedown="startResizingNavigation"
      >
        <v-divider
          vertical
          inset
        />
      </div>
      <div
        class="middle-wrapper"
        :style="{ 'flex-basis': middleWrapperWidth }"
      >
        <!-- Bei Angabe des `solid-heading`-Props wird dem Heading eine transparente, untere Kante angehängt. -->
        <div>
          <div :class="{ 'middle-bar': true, white: solidHeading }">
            <slot name="heading" />
          </div>
          <div
            v-if="solidHeading"
            class="transparent-edge"
          />
        </div>
        <div class="middle-bar">
          <slot name="pagination" />
        </div>
      </div>
      <div
        v-if="resizable"
        class="separator"
        @mousedown="startResizingAction"
      >
        <v-divider
          vertical
          inset
        />
      </div>
      <div
        class="side-bar"
        :style="{ 'flex-basis': actionWidth }"
      >
        <div class="side-bar-information">
          <slot name="information" />
        </div>
        <div class="side-bar-action">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import _ from "lodash";

interface Props {
  wide?: boolean;
  solidHeading?: boolean;
  resizable?: boolean;
}

defineProps<Props>();

// Hinweis: Die Begriffe "width" und "margin" haben hier keinen direkten Bezug zu den gleichnamigen CSS-Properties.

const SIDE_BAR_BASE_WIDTH = "20%";
const MAX_SIDE_BAR_MARGIN_RATIO = 0.1;

let navigationMarginValue = 0;
let actionMarginValue = 0;
let navigationWidth = ref(SIDE_BAR_BASE_WIDTH);
let actionWidth = ref(SIDE_BAR_BASE_WIDTH);
let middleWrapperWidth = computed(() => `calc(100% - ${navigationWidth.value} - ${actionWidth.value})`);
let resizingNavigation = ref(false);
let resizingAction = ref(false);
let lastClientX = 0;

function resize(event: MouseEvent): void {
  let deltaX = event.clientX - lastClientX;
  lastClientX = event.clientX;

  if (resizingNavigation.value) {
    navigationMarginValue = _.clamp(navigationMarginValue + deltaX, -getMaxMargin(), getMaxMargin());
    navigationWidth.value = `calc(${SIDE_BAR_BASE_WIDTH} + ${navigationMarginValue}px)`;
  } else if (resizingAction.value) {
    actionMarginValue = _.clamp(actionMarginValue - deltaX, -getMaxMargin(), getMaxMargin());
    actionWidth.value = `calc(${SIDE_BAR_BASE_WIDTH} + ${actionMarginValue}px)`;
  }
}

function getMaxMargin(): number {
  return screen.availWidth * MAX_SIDE_BAR_MARGIN_RATIO;
}

function startResizingNavigation(event: MouseEvent) {
  resizingNavigation.value = true;
  lastClientX = event.clientX;
}

function startResizingAction(event: MouseEvent) {
  resizingAction.value = true;
  lastClientX = event.clientX;
}

function stopResizing(): void {
  resizingNavigation.value = false;
  resizingAction.value = false;
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  /* Variablen für Unterelemente des Wrappers */
  --middle-bar-height: 100px;
}

.content-wrapper {
  width: 100%;
  height: 100%;
}

.v-padded {
  padding-top: var(--middle-bar-height);
}

.control-wrapper {
  width: 100%;
  height: 100%;
  /* Um auf der Y-Achse direkt unter der App Bar zu liegen */
  padding-top: 92px;
  position: fixed;
  /* Um auf der Z-Achse direkt unter der App Bar zu liegen */
  z-index: 4;
  top: 0px;
  display: flex;
  /* Soll Maus-Events zu den darunterliegenden Elementen durchlassen */
  pointer-events: none;
}

.middle-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.middle-bar {
  width: 100%;
  height: var(--middle-bar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.side-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: auto;
}

.side-bar-navigation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.side-bar-information {
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-bar-action {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transparent-edge {
  width: 100%;
  height: 10px;
  background-image: linear-gradient(white, rgba(255, 255, 255, 0));
}

.separator {
  width: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  pointer-events: auto;
  cursor: col-resize;
}

/* Die Unterelemente der vier Zonen sollen Maus-Events wiederum wahrnehmen */

.middle-bar > * {
  pointer-events: auto;
}

.side-bar-navigation > * {
  pointer-events: auto;
}

.side-bar-information > * {
  pointer-events: auto;
}

.side-bar-action > * {
  pointer-events: auto;
}
</style>
