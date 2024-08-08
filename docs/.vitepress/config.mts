import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ISI Dokumentation",
  description: "Informationssystem für soziale Infrastrukturplanung",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Release Notes", link: "/releasenotes" },
      { text: "Einführung", link: "/einfuehrung" },
      { text: "Technischer Setup", link: "/technical_setup" },
      { text: "Roadmap", link: "/roadmap" },
      { text: "Konventionen", link: "/conventions" },
      { text: "Kontakt", link: "/contact" },
      { text: "Impressum", link: "/impressum" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/it-at-m/isi-frontend" }],

    search: {
      provider: "local",
    },
  },
});
