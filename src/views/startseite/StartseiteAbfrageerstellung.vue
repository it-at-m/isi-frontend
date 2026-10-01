<template>
  <v-main>
    <v-container
      fluid
      class="pa-6 fill-height align-start"
    >
      <v-row
        class="fill-height"
        no-gutters
      >
        <v-col
          cols="12"
          md="5"
          lg="4"
          class="pr-md-6 pb-6 pb-md-0"
          style="min-height: 60vh"
        >
          <meine-vorgaenge-liste />
        </v-col>
        <v-col
          cols="12"
          md="7"
          lg="8"
          style="min-height: 60vh"
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
