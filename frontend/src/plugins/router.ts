import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Abfrage from "../views/Abfrage.vue";
import Bauvorhaben from "../views/Bauvorhaben.vue";
import Infrastruktureinrichtung from "../views/Infrastruktureinrichtung.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/abfrageninformationen/abfrage/:id",
      component: Abfrage,
    },
    {
      path: "/abfrageninformationen/abfrage",
      component: Abfrage,
    },
    {
      path: "/bauvorhaben",
      component: Bauvorhaben,
    },
    {
      path: "/bauvorhaben/:id",
      component: Bauvorhaben,
    },
    {
      path: "/infrastruktureinrichtung",
      component: Infrastruktureinrichtung,
    },
    {
      path: "/infrastruktureinrichtung/:id",
      component: Infrastruktureinrichtung,
    },
    { path: "/:catchAll(.*)*", redirect: "/" },
  ],
});

export default router;
