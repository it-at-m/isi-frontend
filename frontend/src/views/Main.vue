<template>
  <v-navigation-drawer
    width="20vw"
    permanent
  >
    <search-result-list />
  </v-navigation-drawer>
  <v-main>
    <search-result-city-map />
    <v-speed-dial
      v-model="speedDialOpen"
      location="top"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          id="speed_dial_create_button"
          v-bind="activatorProps"
          color="secondary"
          :icon="speedDialOpen ? 'mdi-close' : 'mdi-plus'"
          size="x-large"
          elevation="8"
          location="bottom end"
          position="absolute"
          class="mr-8 mb-8"
          style="z-index: 400"
          :data-x="activatorProps"
        />
      </template>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="infrastruktureinrichtung_create_button"
            class="text-h6"
            icon="mdi-home"
            color="red-lighten-1"
            size="large"
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
            size="large"
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
            size="large"
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
            size="large"
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
            size="large"
            v-bind="props"
            @click="createWeiteresVerfahren"
          />
        </template>
        <span>Weiteres Verfahren erstellen</span>
      </v-tooltip>
    </v-speed-dial>
  </v-main>
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
