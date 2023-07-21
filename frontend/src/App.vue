<template>
  <v-app>
    <the-snackbar />
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
            <v-toolbar-title class="text-h4 white--text font-weight-bold">ISI</v-toolbar-title>
          </router-link>
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center justify-center"
        >
          <v-autocomplete
            id="suchfeld"
            v-model="selectedSuggestion"
            :items="suchwortSuggestions"
            :search-input.sync="searchQuery"
            clearable
            color="black"
            flat
            hide-details
            label="Suche"
            no-filter
            prepend-inner-icon="mdi-magnify"
            return-object
            solo-inverted
            @keyup.enter="addSelectedSuggestionsToSearchQueryOrSearchForEntities"
            @update:list-index="updateSearchQuery"
            @update:search-input="suggest"
            @click:clear="clearSearch"
          >
            <template v-slot:no-data>
              <v-list class="pa-3">
                <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
              </v-list>
            </template>
          </v-autocomplete>
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
              <v-list-item>
                <v-list-item-title>
                  <a
                    target="_blank"
                    :href="getDatenschutzhinweisUrl()"
                  >
                    Datenschutzhinweis<span class="mdi mdi-launch" />
                  </a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu
            id="app_nutzerinformationen_menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template #activator="{ on, attrs }">
              <v-icon
                id="app_nutzerinformationen_icon"
                class="white--text"
                v-bind="attrs"
                v-on="on"
              >
                mdi-account-circle
              </v-icon>
            </template>

            <v-card class="userinfo-card">
              <span id="app_nutzerinformationen_vorname_nachname">
                {{ userinfo.givenname + " " + userinfo.surname }}
              </span>
              <v-divider />
              <span
                id="app_nutzerinformationen_abteilung"
                class="userinfo-subtitles"
              >
                <v-icon>mdi-office-building</v-icon>{{ userinfo.department }}
              </span>
              <br />
              <span
                id="app_nutzerinformationen_user_rollen"
                class="userinfo-subtitles"
              >
                <v-icon>mdi-account-badge</v-icon>{{ userRoles }}
              </span>
            </v-card>
          </v-menu>
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
import Component from "vue-class-component";
import { Mixins, Watch } from "vue-property-decorator";
import TheSnackbar from "@/components/TheSnackbar.vue";
import VersionInfo from "@/components/common/VersionInfo.vue";
import { RouteTag } from "./router";
import UserInfoApiRequestMixin from "@/mixins/requests/UserInfoApiRequestMixin";
import { Userinfo } from "./types/common/Userinfo";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import { SearchQueryForEntitiesDto, SuchwortSuggestionsDto } from "@/api/api-client/isi-backend";

@Component({
  components: { TheSnackbar, VersionInfo },
})
export default class App extends Mixins(UserInfoApiRequestMixin, SearchApiRequestMixin) {
  public query = "";

  private logo: string = new URL("./assets/isi-logo.svg", import.meta.url).href;

  public showVersionInfo = false;

  private userinfo = new Userinfo();

  private menu = false;

  // Suche
  private searchQuery = "";

  private suggestions: SuchwortSuggestionsDto = { suchwortSuggestions: [] };

  private selectedSuggestion = "";

  // Schreibt alle Nutzerollen in einen String für die Darstellung
  get userRoles(): string {
    return _.join(this.userinfo.roles, ", ");
  }

  get suchwortSuggestions(): Array<string> {
    return _.isNil(this.suggestions.suchwortSuggestions) ? [] : this.suggestions.suchwortSuggestions;
  }

  created(): void {
    this.$store.dispatch("lookup/initialize");
    this.$store.dispatch("fileInfoStamm/initialize");
  }

  mounted(): void {
    this.getUserinfo().then((userinfo: Userinfo) => {
      this.userinfo = userinfo;
      this.$store.commit("userinfo/userinfo", userinfo);
    });
    this.query = this.$route.params.query;
  }

  @Watch("$route.params.query")
  public function(query: string): void {
    if (this.query !== query) this.query = query;
  }

  private getDatenschutzhinweisUrl(): string {
    return import.meta.env.VITE_DATENSCHUTZHINWEIS_URL as string;
  }

  /**
   * Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
   */
  public async search(): Promise<void> {
    if (this.query !== "" && this.query !== null) {
      this.$store.dispatch("snackbar/showMessage", {
        message: "Sie haben nach " + this.query + " gesucht. ;)",
      });
    }
  }

  private goToRoute(path: string): void {
    this.$router.push({ path });
  }

  private currentRouteHasTag(tag: RouteTag): boolean {
    return this.$router.currentRoute.meta?.tag === tag;
  }

  private updateSearchQuery(itemIndex: number) {
    if (itemIndex >= 0) {
      this.selectedSuggestion = this.suchwortSuggestions[itemIndex];
    }
  }

  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const searchQueryForSuggestion = _.last(splittedSearchwords);
    if (!_.isEmpty(searchQueryForSuggestion)) {
      this.searchForSearchwordSuggestion(query).then((suchwortSuggestions) => {
        this.suggestions = suchwortSuggestions;
      });
    }
  }

  private addSelectedSuggestionsToSearchQueryOrSearchForEntities(): void {
    if (_.isEmpty(this.selectedSuggestion)) {
      const searchQueryForEntitiesDto = {
        searchQuery: this.searchQuery,
        selectInfrastrukturabfrage: true,
        selectBauvorhaben: true,
        selectGrundschule: true,
        selectGsNachmittagBetreuung: true,
        selectHausFuerKinder: true,
        selectKindergarten: true,
        selectKinderkrippe: true,
        selectMittelschule: true,
      } as SearchQueryForEntitiesDto;
      this.searchForEntities(searchQueryForEntitiesDto).then((searchResults) => searchResults);
    } else {
      this.searchQuery += this.selectedSuggestion + " ";
      this.selectedSuggestion = "";
    }
  }

  private clearSearch(): void {
    this.suggestions = {
      suchwortSuggestions: [],
    };
    this.searchQuery = "";
    this.selectedSuggestion = "";
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

.userinfo-subtitles {
  font-size: 14px;
  color: grey;
}

.userinfo-card {
  padding: 10px;
  overflow: hidden;
}
</style>
