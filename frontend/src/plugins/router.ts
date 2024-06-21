import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";
import Abfrage from "../views/Abfrage.vue";
import Bauvorhaben from "../views/Bauvorhaben.vue";
import Infrastruktureinrichtung from "../views/Infrastruktureinrichtung.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // https://router.vuejs.org/guide/advanced/scroll-behavior#Scroll-Behavior
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 };
  },
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/abfrage",
      component: Abfrage,
    },
    {
      path: "/abfrage/:id",
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
