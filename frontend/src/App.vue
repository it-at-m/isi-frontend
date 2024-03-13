<template>
  <v-app>
    <the-snackbar />
    <v-app-bar
      app
      color="primary"
      elevation="8"
      height="50"
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
          <search-input-field />
        </v-col>
        <v-col
          cols="3"
          class="d-flex align-center justify-end"
        >
          <v-menu
            id="app_help_menu"
            offset-x
            offset-y
            transition="slide-y-transition"
          >
            <template #activator="{ on }">
              <v-btn
                small
                icon
                fab
                v-on="on"
              >
                <v-icon class="white--text"> mdi-help-circle </v-icon>
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
            offset-y
            transition="slide-y-transition"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                small
                icon
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon
                  id="app_nutzerinformationen_icon"
                  class="white--text"
                >
                  mdi-account-circle
                </v-icon>
              </v-btn>
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
import UserInfoApiRequestMixin from "@/mixins/requests/UserInfoApiRequestMixin";
import { Userinfo } from "./types/common/Userinfo";
import _ from "lodash";
import SearchInputField from "@/components/search/SearchInputField.vue";

@Component({
  components: { SearchInputField, TheSnackbar, VersionInfo },
})
export default class App extends Mixins(UserInfoApiRequestMixin) {
  public query = "";

  private logo: string = new URL("./assets/isi-logo.svg", import.meta.url).href;

  public showVersionInfo = false;

  private userinfo = new Userinfo();

  private menu = false;

  // Schreibt alle Nutzerollen in einen String für die Darstellung
  get userRoles(): string {
    return _.join(this.userinfo.roles, ", ");
  }

  created(): void {
    this.$store.dispatch("lookup/initialize");
    this.$store.dispatch("fileInfoStamm/initialize");
    this.$store.dispatch("stammdaten/initialize");
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
