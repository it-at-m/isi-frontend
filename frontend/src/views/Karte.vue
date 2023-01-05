<template>
  <DefaultLayout wide>
    <template #content>
      <CityMap />
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import CityMap from "@/components/map/CityMap.vue";

@Component({
  components: {
    DefaultLayout,
    CityMap
  }
})
export default class Karte extends Vue {}
</script>
