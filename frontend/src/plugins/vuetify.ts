import "@mdi/font/css/materialdesignicons.css";
import "@fontsource/roboto";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import de from "vuetify/src/locale/de";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export const theme = {
  themes: {
    light: {
      primary: colors.blueGrey.darken2,
      accent: colors.blueGrey.darken1,
      secondary: colors.orange.lighten1,
      success: colors.green.accent4,
      warning: colors.yellow.accent4,
      error: colors.red.accent4
    }
  }
};

Vue.component("MyComponent", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "de";
    }
  }
});

export default new Vuetify({
  lang: {
    locales: { de },
    current: "de"
  },
  theme: theme
});
