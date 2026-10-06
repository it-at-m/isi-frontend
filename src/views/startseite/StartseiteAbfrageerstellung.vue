<template>
  <v-main class="startseite-abfrageerstellung">
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
 * Ab dem Breakpoint "md" stehen Vorgangsliste und Übersicht nebeneinander. Dort wird die Seite
 * an die Höhe des Viewports gebunden, damit die Karte unabhängig von der Anzahl der Einträge
 * in der linken Liste immer gleich groß bleibt. Die Liste scrollt stattdessen in sich.
 *
 * Die Höhe von 100vh berücksichtigt die App-Bar, da das v-main deren Höhe als padding-top
 * erhält und Vuetify global mit box-sizing: border-box rechnet.
 */
@media (min-width: 960px) {
  .startseite-abfrageerstellung {
    height: 100vh;
  }

  .startseite-abfrageerstellung__container {
    height: 100%;
  }

  /*
   * min-height: 0 hebt das implizite min-height: auto von Flex-Items auf. Ohne das dehnen
   * scrollbare Kinder ihren Container auf die eigene Inhaltshöhe statt zu scrollen.
   */
  .startseite-abfrageerstellung__row,
  .startseite-abfrageerstellung__col {
    min-height: 0;
  }
}

/* Untereinander angeordnet behalten beide Bereiche eine sinnvolle Mindesthöhe. */
@media (max-width: 959.98px) {
  .startseite-abfrageerstellung__col {
    min-height: 60vh;
  }
}
</style>
