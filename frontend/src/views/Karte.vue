<template>
  <default-layout>
    <template #navigation>
      <search-result-list />
    </template>
    <template #content>
      <city-map />
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import CityMap from "@/components/map/CityMap.vue";

@Component({
  components: {
    CityMap,
    SearchResultList,
    DefaultLayout,
  },
})
export default class Karte extends Vue {}
</script>
