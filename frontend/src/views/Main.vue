<template>
  <v-container
    fluid
    class="fill-height pa-0"
  >
    <v-row class="fill-height justify-center mx-0">
      <v-col
        class="py-0"
        cols="12"
        md="3"
      >
        <search-result-list />
      </v-col>
      <v-col
        class="pa-0"
        cols="12"
        md="9"
      >
        <search-result-city-map />
      </v-col>
    </v-row>
    <v-speed-dial location="bottom center">
      <template #activator="{ props: activatorProps }">
        <v-btn
          id="speed_dial_create_button"
          v-bind="activatorProps"
          color="secondary"
          :icon="speedDialOpen ? 'mdi-close' : 'mdi-plus'"
          size="x-large"
          @click="speedDialOpen = !speedDialOpen"
        />
      </template>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="infrastruktureinrichtung_create_button"
            class="text-h6"
            icon="mdi-home"
            color="red-lighten-1"
            v-bind="props"
            @click="createInfrastruktureinrichtung"
          />
        </template>
        <span>Infrastruktureinrichtung erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="bauvorhaben_create_button"
            class="text-h6"
            icon="mdi-account-hard-hat"
            color="indigo-lighten-1"
            v-bind="props"
            @click="createBauvorhaben"
          />
        </template>
        <span>Bauvorhaben erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="bauleitplanverfahren_create_button"
            class="text-h6"
            icon="mdi-comment-alert"
            color="green-lighten-1"
            v-bind="props"
            @click="createBauleitplanverfahren"
          />
        </template>
        <span>Bauleitplanverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="baugenehmigungsverfahren_create_button"
            class="text-h6"
            icon="mdi-account-multiple-plus"
            color="green-lighten-1"
            v-bind="props"
            @click="createBaugenehmigungsverfahren"
          />
        </template>
        <span>Baugenehmigungsverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="weiteres_verfahren_create_button"
            class="text-h6"
            icon="mdi-account-plus"
            color="green-lighten-1"
            v-bind="props"
            @click="createWeiteresVerfahren"
          />
        </template>
        <span>Weiteres Verfahren erstellen</span>
      </v-tooltip>
    </v-speed-dial>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import SearchResultCityMap from "@/components/map/SearchResultCityMap.vue";
import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import { useRouter } from "vue-router";

const router = useRouter();
const speedDialOpen = ref(false);

function createBauleitplanverfahren(): void {
  router.push("/abfrage?art=" + AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren);
}

function createBaugenehmigungsverfahren(): void {
  router.push("/abfrage?art=" + AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren);
}

function createWeiteresVerfahren(): void {
  router.push("/abfrage?art=" + AbfrageDtoArtAbfrageEnum.WeiteresVerfahren);
}

function createBauvorhaben(): void {
  router.push("/bauvorhaben");
}

function createInfrastruktureinrichtung(): void {
  router.push("/infrastruktureinrichtung");
}
</script>
