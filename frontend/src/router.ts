import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Karte from "./views/Karte.vue";
import AbfragenUebersicht from "./views/AbfragenUebersicht.vue";
import BauvorhabenUebersicht from "./views/BauvorhabenUebersicht.vue";
import InfrastruktureinrichtungenUebersicht from "./views/InfrastruktureinrichtungenUebersicht.vue";
import Abfrage from "./views/Abfrage.vue";
import Bauvorhaben from "./views/Bauvorhaben.vue";
import Infrastruktureinrichtung from "./views/Infrastruktureinrichtung.vue";

Vue.use(Router);

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 * */
/* eslint-disable @typescript-eslint/no-explicit-any */
const routerMethods = ["push", "replace"];
routerMethods.forEach((method: string) => {
  const originalCall = (Router.prototype as any)[method];
  (Router.prototype as any)[method] = function (location: any, onResolve: any, onReject: any): Promise<any> {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject);
    }
    return (originalCall.call(this, location) as any).catch((err: any) => err);
  };
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export type RouteTag = "karte" | "abfragen" | "bauvorhaben" | "infrastruktureinrichtungen";

export default new Router({
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/karte",
      name: "karte",
      meta: { tag: "karte" },
      component: Karte,
    },
    {
      path: "/abfragenuebersicht",
      name: "abfragenuebersicht",
      meta: { tag: "abfragen" },
      component: AbfragenUebersicht,
    },
    {
      path: "/abfrageninformationen/abfrage/:id",
      name: "updateabfrage",
      meta: { tag: "abfragen" },
      component: Abfrage,
    },
    {
      path: "/abfrageninformationen/abfrage",
      name: "newabfrage",
      meta: { tag: "abfragen" },
      component: Abfrage,
    },
    {
      path: "/bauvorhabenuebersicht",
      name: "viewAllBauvorhaben",
      meta: { tag: "bauvorhaben" },
      component: BauvorhabenUebersicht,
    },
    {
      path: "/bauvorhaben",
      name: "createBauvorhaben",
      meta: { tag: "bauvorhaben" },
      component: Bauvorhaben,
    },
    {
      path: "/bauvorhaben/:id",
      name: "editBauvorhaben",
      meta: { tag: "bauvorhaben" },
      component: Bauvorhaben,
    },
    {
      path: "/infrastruktureinrichtunguebersicht",
      name: "infrastruktureinrichtungenuebersicht",
      meta: { tag: "infrastruktureinrichtungen" },
      component: InfrastruktureinrichtungenUebersicht,
    },
    {
      path: "/infrastruktureinrichtung",
      name: "createInfrastruktureinrichtung",
      meta: { tag: "infrastruktureinrichtungen" },
      component: Infrastruktureinrichtung,
    },
    {
      path: "/infrastruktureinrichtung/:id",
      name: "editInfrastruktureinrichtung",
      meta: { tag: "infrastruktureinrichtungen" },
      component: Infrastruktureinrichtung,
    },
    { path: "*", redirect: "/" }, //Fallback 2
  ],
});

declare module "vue-router" {
  interface RouteMeta {
    tag?: RouteTag;
  }
}
