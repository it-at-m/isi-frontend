import "@mdi/font/css/materialdesignicons.css";
import "@fontsource/roboto";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { de } from "vuetify/locale";
import colors from "vuetify/util/colors";

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blueGrey.darken2,
          accent: colors.blueGrey.darken1,
          secondary: colors.orange.lighten1,
          success: colors.green.accent4,
          warning: colors.yellow.accent4,
          error: colors.red.accent4,
        },
      },
    },
  },
  locale: {
    locale: "de",
    messages: { de },
  },
});

export default vuetify;
