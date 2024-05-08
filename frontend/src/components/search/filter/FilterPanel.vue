<template>
  <v-expansion-panel>
    <v-expansion-panel-title> Filter </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Filter"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Hier befinden sich weitere Filtereinstellung."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import PanelHeader from "@/components/search/filter/PanelHeader.vue";
</script>
