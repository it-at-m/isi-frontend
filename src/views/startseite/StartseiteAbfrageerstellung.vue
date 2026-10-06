<template>
  <v-main>
    <v-container
      fluid
      class="pa-6 d-flex flex-column startseite-abfrageerstellung__container"
    >
      <v-row
        class="flex-grow-1 startseite-abfrageerstellung__row"
        no-gutters
      >
        <v-col
          cols="12"
          md="5"
          lg="4"
          class="pr-md-6 pb-6 pb-md-0 d-flex flex-column startseite-abfrageerstellung__col"
        >
          <meine-vorgaenge-liste />
        </v-col>
        <v-col
          cols="12"
          md="7"
          lg="8"
          class="d-flex flex-column startseite-abfrageerstellung__col"
        >
          <uebersicht-panel />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import MeineVorgaengeListe from "@/components/startseite/MeineVorgaengeListe.vue";
import UebersichtPanel from "@/components/startseite/UebersichtPanel.vue";
</script>

<style scoped>
/*
 * Ab dem Breakpoint "md" stehen Vorgangsliste und Übersicht nebeneinander. Dort bekommt der
 * Container eine feste, vom Viewport abgeleitete Höhe, damit die Karte unabhängig von der Anzahl
 * der Einträge in der linken Liste immer gleich groß bleibt. Die Liste scrollt stattdessen in sich.
 *
 * Die Höhe wird bewusst an genau einer Stelle definit gesetzt statt über eine Kette von
 * Prozentwerten: --v-layout-top/-bottom setzt Vuetify als Inline-Custom-Property auf dem v-main
 * (App-Bar- bzw. Footer-Höhe) und vererbt sie hierher, das Padding des Containers steckt dank
 * box-sizing: border-box bereits in dieser Höhe.
 */
@media (min-width: 960px) {
  .startseite-abfrageerstellung__container {
    height: calc(100dvh - var(--v-layout-top, 0px) - var(--v-layout-bottom, 0px));
  }

  /*
   * min-height: 0 hebt das implizite min-height: auto von Flex-Items auf, overflow: hidden stellt
   * sicher, dass ein Kind die Spalte nicht doch aufziehen kann. Ohne beides dehnen scrollbare
   * Kinder ihren Container auf die eigene Inhaltshöhe, statt zu scrollen.
   */
  .startseite-abfrageerstellung__row,
  .startseite-abfrageerstellung__col {
    min-height: 0;
  }

  .startseite-abfrageerstellung__col {
    overflow: hidden;
  }
}

/* Untereinander angeordnet behalten beide Bereiche eine sinnvolle Mindesthöhe. */
@media (max-width: 959.98px) {
  .startseite-abfrageerstellung__col {
    min-height: 60vh;
  }
}
</style>
