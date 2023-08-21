<template>
  <map-layout wide>
    <template #content>
      <city-map />
    </template>
  </map-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MapLayout from "@/components/map/MapLayout.vue";
import CityMap from "@/components/map/CityMap.vue";

@Component({
  components: {
    MapLayout,
    CityMap,
  },
})
export default class Karte extends Vue {}
</script>
