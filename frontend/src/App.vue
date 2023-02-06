<template>
  <v-app>
    <TheSnackbar />
    <v-app-bar
      app
      color="primary"
      elevation="8"
      height="50"
      extension-height="42"
    >
      <v-row align="center">
        <v-col
          cols="3"
          class="d-flex align-center justify-start"
        >
          <router-link to="/">
            <v-img
              src="src/assets/isi-logo.svg?url"
              max-width="32"
              max-height="32"
              class="mr-1"
            />
          </router-link>
          <router-link to="/">
            <v-toolbar-title class="text-h4 white--text font-weight-bold">
              ISI
            </v-toolbar-title>
          </router-link>
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center justify-center"
        >
          <v-text-field
            id="suchfeld"
            v-model="query"
            dense
            flat
            solo-inverted
            dark
            hide-details
            label="Suche"
            clearable
            prepend-inner-icon="mdi-magnify"
            color="black"
            style="max-width: 800px"
            @keyup.enter="search"
          />
        </v-col>
        <v-col
          cols="3"
          class="d-flex align-center justify-end"
        >
          <v-btn
            text
            fab
          >
            <v-icon class="white--text">
              mdi-account-circle
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <template #extension>
        <div
          class="accent d-flex justify-space-around"
          style="width: 100%"
        >
          <v-btn
            depressed
            tile
            text
            color="white"
            height="42"
            :class="`text-wrap text-h6 tab ${currentRouteHasTag('karte') ? 'active' : ''}`"
            @click="goToRoute('/karte')"
            v-text="'Karte'"
          />
          <v-btn
            depressed
            tile
            text
            color="white"
            height="42"
            :class="`text-wrap text-h6 tab ${currentRouteHasTag('abfragen') ? 'active' : ''}`"
            @click="goToRoute('/abfragenuebersicht')"
            v-text="'Abfragen'"
          />
          <v-btn
            depressed
            tile
            text
            color="white"
            height="42"
            :class="`text-wrap text-h6 tab ${currentRouteHasTag('bauvorhaben') ? 'active' : ''}`"
            @click="goToRoute('/bauvorhabenuebersicht')"
            v-text="'Bauvorhaben'"
          />
          <v-btn
            depressed
            tile
            text
            color="white"
            height="42"
            :class="`text-wrap text-h6 tab ${currentRouteHasTag('infrastruktureinrichtungen') ? 'active' : ''}`"
            @click="goToRoute('/infrastruktureinrichtungenuebersicht')"
            v-text="'Infrastruktureinrichtungen'"
          />
        </div>
      </template>
    </v-app-bar>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TheSnackbar from "@/components/TheSnackbar.vue";
import { RouteTag } from "./router";

@Component({
  components: { TheSnackbar }
})
export default class App extends Vue {

  public query = "";

  /*logo = new URL("./assets/isi-logo.svg", import.meta.url).href;*/

  created(): void {
    this.$store.dispatch("lookup/initialize");
    this.$store.dispatch("fileInfoStamm/initialize");
  }

  mounted(): void {
    this.query = this.$route.params.query;
  }

  @Watch("$route.params.query")
  public function(query: string): void {
    if (this.query !== query) this.query = query;
  }

  /**
   * Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
   */
  public async search(): Promise<void> {
    if (this.query !== "" && this.query !== null) {
      this.$store.dispatch("snackbar/showMessage", {
        message: "Sie haben nach " + this.query + " gesucht. ;)"
      });
    }
  }

  private goToRoute(path: string): void {
    this.$router.push({ path });
  }

  private currentRouteHasTag(tag: RouteTag): boolean {
    return this.$router.currentRoute.meta?.tag === tag;
  }

}
</script>

<style>
.tab {
  text-transform: none;
  flex-grow: 1;
}

.tab.active {
  backdrop-filter: brightness(115%);
}

.main {
  background-color: white;
}

.v-toolbar__extension {
  padding: 0px;
}
</style>
