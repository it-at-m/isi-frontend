<template>
  <default-layout wide>
    <template #content>
      <search-result-list />
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";

@Component({
  components: {
    SearchResultList,
    DefaultLayout,
  },
})
export default class Karte extends Vue {}
</script>
