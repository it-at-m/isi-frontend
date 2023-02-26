<template>
  <v-container>
    <v-row
      class="text-center"
    >
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="text-h3 font-weight-bold mb-3">
          Willkommen beim Informationssystem für soziale Infrastruktur
        </h1>
        <p>
          Das API-Gateway ist: <span
            id="app_status"
            :class="status"
          >{{ status }}</span>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HealthService from "@/api/HealthService";
import HealthState from "@/types/HealthState";

@Component
export default class App extends Vue {

  base: string | undefined = import.meta.env.VITE_VUE_APP_API_URL
  status = "DOWN"

  mounted(): void {
    HealthService.checkHealth()
        .then((content: HealthState) => this.status = content.status)
        .catch(error => {
          this.$store.dispatch('snackbar/showMessage', error);
        });
  }
}
</script>

<style scoped>
.UP {
  color: limegreen;
}

.DOWN {
  color: lightcoral;
}
</style>