<!--
Wrapper-Komponente zum Einordnen von Inhalten in das Seitenlayout.
Unterscheidet zwischen fünf verschiedenen Zonen, welche jeweils einem Slot entsprechen:
Seiteninhalt (content), Navigation (navigation), Aktionen (action), Titel (heading) und Pagination (pagination).
content hat keine besondere Positionierung. Mit der Boolean-Property "wide" nimmt es die gesamte Bildschirmbreite ein, ansonsten nur die mittleren 60%.
navigation sowie action sind Sidebars, welche nicht mitscrollen und sich über content befinden. Sie ordnen ihre Unterelemente von unten nach oben und zentriert auf der x-Achse an.
Zum Verschieben der Unterelemente auf der x-Achse können v-spacer benutzt werden, zum Verschieben auf der y-Achse die "align-self-*"-Klassen von Vuetify, siehe https://vuetifyjs.com/en/styles/flex/#flex-align-self.
heading sowie pagination sind Header- bzw. Footer-artig, scrollen nicht mit und befinden sich über content. Sie zentrieren sowohl auf der x- als auch auf der y-Achse und sind dafür gedacht, ein einziges Element unterzubringen.
Mittels der BooleanProperty "solidHeading" wird das heading weiß gefärbt und bekommt einen schmalen Transparenzverlauf, um es vom drunterliegenden content trennen zu können.
Soll navigation eine verstellbare Breite haben, kann der `resizable`-Prop benutzt werden.
-->

<template>
  <!-- Das `user-select` ist ein Workaround dafür, dass beim Resizen der Text auf der Seite ständig ausgewählt wird. -->
  <div
    class="wrapper"
    :style="{ 'user-select': resizing ? 'none' : 'auto' }"
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
        'padding-left': wide ? '0px' : navigationWidth + 'px',
        'padding-right': wide ? '0px' : actionWidth + 'px',
      }"
    >
      <slot name="content" />
    </div>
    <div class="control-wrapper">
      <div
        class="side-bar"
        :style="{ 'flex-basis': navigationWidth + 'px' }"
      >
        <div class="side-bar-navigation">
          <slot name="navigation" />
        </div>
      </div>
      <div
        v-if="resizable"
        class="separator"
        @mousedown="startResizing"
      >
        <v-divider
          vertical
          inset
        />
      </div>
      <div
        class="middle-wrapper"
        :style="{ 'flex-basis': middleWrapperWidth + 'px' }"
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
        class="side-bar"
        :style="{ 'flex-basis': actionWidth + 'px' }"
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

const SIDE_BAR_RATIO = 0.2; // Anteil der Bildschirmbreite
const MAX_NAVIGATION_RATIO = 0.4; // Anteil der Bildschirmbreite
const MIN_NAVIGATION_WIDTH = 150; // Pixel

const resizing = ref(false);
const navigationMargin = ref(0);
let lastClientX = 0;

const windowWidth = ref(innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = innerWidth;
});

const navigationWidth = computed(() => {
  const value = windowWidth.value * SIDE_BAR_RATIO + navigationMargin.value;
  return _.clamp(value, MIN_NAVIGATION_WIDTH, windowWidth.value * MAX_NAVIGATION_RATIO);
});
const actionWidth = computed(() => {
  return windowWidth.value * SIDE_BAR_RATIO;
});
const middleWrapperWidth = computed(() => {
  return windowWidth.value - navigationWidth.value - actionWidth.value;
});

function resize(event: MouseEvent): void {
  if (resizing.value) {
    const deltaX = event.clientX - lastClientX;
    lastClientX = event.clientX;
    const min = -(windowWidth.value * SIDE_BAR_RATIO - MIN_NAVIGATION_WIDTH);
    const max = windowWidth.value * MAX_NAVIGATION_RATIO - windowWidth.value * SIDE_BAR_RATIO;
    navigationMargin.value = _.clamp(navigationMargin.value + deltaX, min, max);
  }
}

function startResizing(event: MouseEvent) {
  resizing.value = true;
  lastClientX = event.clientX;
}

function stopResizing(): void {
  resizing.value = false;
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
