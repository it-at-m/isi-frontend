<template>
  <div class="wrapper">
    <!-- Bei Angabe des 'wide'-Props bzw. des 'solid-heading'-Props wird 'h-padded' bzw. 'v-padded' von den CSS-Klassen entfernt bzw. zu den CSS-Klassen hinzugefügt. -->
    <div :class="`content-wrapper${wide ? '' : ' h-padded'}${solidHeading ? ' v-padded' : ''}`">
      <slot name="content" />
    </div>
    <div class="control-wrapper">
      <div class="side-bar">
        <div class="side-bar-navigation">
          <slot name="navigation" />
        </div>
      </div>
      <div class="middle-wrapper">
        <!-- Bei Angabe des 'solid-heading'-Props wird 'transparent-edge' zu den CSS-Klassen hinzugefügt. -->
        <div>
          <div :class="`middle-bar${solidHeading ? ' white' : ''}`">
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
      <div class="side-bar">
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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Wrapper-Komponente zum Einordnen von Inhalten in das Seitenlayout.
 * Unterscheidet zwischen fünf verschiedenen Zonen, welche jeweils einem Slot entsprechen:
 * Seiteninhalt (content), Navigation (navigation), Aktionen (action), Titel (heading) und Pagination (pagination).
 * content hat keine besondere Positionierung. Mit der Boolean-Property "wide" nimmt es die gesamte Bildschirmbreite ein, ansonsten nur die mittleren 60%.
 * navigation sowie action sind Sidebars, welche nicht mitscrollen und sich über content befinden. Sie ordnen ihre Unterelemente von unten nach oben und zentriert auf der x-Achse an.
 * Zum Verschieben der Unterelemente auf der x-Achse können v-spacer benutzt werden, zum Verschieben auf der y-Achse die "align-self-*"-Klassen von Vuetify, siehe https://vuetifyjs.com/en/styles/flex/#flex-align-self.
 * heading sowie pagination sind Header- bzw. Footer-artig, scrollen nicht mit und befinden sich über content. Sie zentrieren sowohl auf der x- als auch auf der y-Achse und sind dafür gedacht, ein einziges Element unterzubringen.
 * Mittels der BooleanProperty "solidHeading" wird das heading weiß gefärbt und bekommt einen schmalen Transparenzverlauf, um es vom drunterliegenden content trennen zu können.
 */
@Component
export default class DefaultLayout extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly wide!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly solidHeading!: boolean;
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  /* Variablen für Unterelemente des Wrappers */
  --side-bar-width: 20%;
  --middle-bar-height: 100px;
}

.content-wrapper {
  width: 100%;
  height: 100%;
}

.h-padded {
  padding-left: var(--side-bar-width);
  padding-right: var(--side-bar-width);
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
  width: calc(100% - var(--side-bar-width) * 2);
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
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.side-bar-navigation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
