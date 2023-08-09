<template>
  <default-layout>
    <template #navigation>
      <search-result-list />
    </template>
    <template #content>
      <city-map />
    </template>
    <template #action>
      <v-btn
        color="secondary"
        @click="searchAndFilterDialogOpen = true"
      >
        <v-icon left>mdi-filter-outline</v-icon>
        <span>Filter-/Sucheinstellungen</span>
      </v-btn>
      <v-dialog
        v-model="searchAndFilterDialogOpen"
        max-width="1024px"
      >
        <search-and-filter-options @close-search-and-filter-options="searchAndFilterDialogOpen = false" />
      </v-dialog>
      <v-spacer />
      <div class="align-self-end">
        <v-speed-dial
          v-model="speedDialOpen"
          bottom
          right
        >
          <template #activator>
            <v-btn
              v-model="speedDialOpen"
              color="secondary"
              dark
              fab
              x-large
            >
              <v-icon v-if="speedDialOpen"> mdi-close </v-icon>
              <v-icon v-else> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-btn
            class="text-h6"
            fab
            dark
            color="red"
            @click="createInfrastruktureinrichtung"
            v-text="'I'"
          />
          <v-btn
            class="text-h6"
            fab
            dark
            color="indigo"
            @click="createBauvorhaben"
            v-text="'B'"
          />
          <v-btn
            class="text-h6"
            fab
            dark
            color="green"
            @click="createAbfrage"
            v-text="'A'"
          />
        </v-speed-dial>
      </div>
    </template>
  </default-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import CityMap from "@/components/map/CityMap.vue";
import router from "@/router";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";

@Component({
  components: {
    SearchAndFilterOptions,
    CityMap,
    SearchResultList,
    DefaultLayout,
  },
})
export default class Karte extends Vue {
  private searchAndFilterDialogOpen = false;
  private speedDialOpen = false;

  private createAbfrage(): void {
    router.push({
      name: "newabfrage",
    });
  }

  private createBauvorhaben(): void {
    router.push({
      name: "createBauvorhaben",
    });
  }

  private createInfrastruktureinrichtung(): void {
    router.push({
      name: "createInfrastruktureinrichtung",
    });
  }
}
</script>
