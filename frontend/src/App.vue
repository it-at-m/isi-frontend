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
              id="app_logo"
              :src="logo"
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
            id="app_suchfeld"
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
          <v-menu
            offset-y
            transition="slide-y-transition"
          >
            <template #activator="{ on }">
              <v-btn
                small
                text
                fab
              >
                <v-icon
                  class="white--text"
                  v-on="on"
                >
                  mdi-help-circle
                </v-icon>
              </v-btn>
            </template>
            <v-list class="text-center">
              <v-list-item @click="showVersionInfo = true">
                <v-list-item-title>Versionsinformationen</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            small
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
            id="app_karte_button"
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
            id="app_abfrage_button"
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
            id="app_bauvorhaben_button"
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
            id="app_infrastruktureinrichtung_button"
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
    <version-info v-model="showVersionInfo" />
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
import VersionInfo from "@/components/common/VersionInfo.vue";
import { RouteTag } from "./router";

@Component({
  components: { TheSnackbar, VersionInfo }
})
export default class App extends Vue {

  public query = "";
  
  private logo: string = new URL("./assets/isi-logo.svg", import.meta.url).href;

  public showVersionInfo = false;

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
