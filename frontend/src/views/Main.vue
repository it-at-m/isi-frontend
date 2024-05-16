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
    <v-speed-dial
      v-model="speedDialOpen"
      class="button-speed-dial-entity-creation"
      bottom
      right
      absolute
    >
      <template #activator>
        <v-btn
          id="speed_dial_create_button"
          v-model="speedDialOpen"
          color="secondary"
          class="text-white"
          :icon="speedDialOpen ? 'mdi-close' : 'mdi-plus'"
          size="large"
        />
      </template>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="infrastruktureinrichtung_create_button"
            class="text-h6"
            fab
            dark
            color="red-lighten-1"
            v-bind="props"
            @click="createInfrastruktureinrichtung"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Infrastruktureinrichtung erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="bauvorhaben_create_button"
            class="text-h6"
            fab
            dark
            color="indigo-lighten-1"
            v-bind="props"
            @click="createBauvorhaben"
          >
            <v-icon>mdi-account-hard-hat</v-icon>
          </v-btn>
        </template>
        <span>Bauvorhaben erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="bauleitplanverfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green-lighten-1"
            v-bind="props"
            @click="createBauleitplanverfahren"
          >
            <v-icon>mdi-comment-alert</v-icon>
          </v-btn>
        </template>
        <span>Bauleitplanverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="baugenehmigungsverfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green-lighten-1"
            v-bind="props"
            @click="createBaugenehmigungsverfahren"
          >
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
        </template>
        <span>Baugenehmigungsverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip location="left">
        <template #activator="{ props }">
          <v-btn
            id="weiteres_verfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green-lighten-1"
            v-bind="props"
            @click="createWeiteresVerfahren"
          >
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
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

<style>
.button-speed-dial-entity-creation {
  margin-bottom: 16px;
}
</style>
