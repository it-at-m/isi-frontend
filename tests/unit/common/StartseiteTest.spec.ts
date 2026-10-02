import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { Userinfo } from "@/types/common/Userinfo";
import { useUserinfoStore } from "@/stores/Userinfostore";
import Main from "@/views/Main.vue";
import UebersichtPanel from "@/components/startseite/UebersichtPanel.vue";

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function setRoles(roles: Array<string>): void {
  const userinfo = new Userinfo();
  userinfo.roles = roles;
  userinfo.givenname = "Simon";
  useUserinfoStore().setUserinfo(userinfo);
}

describe("StartseiteTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Rollenweiche der Startseite", () => {
    test("zeigt Abfrageerstellern die neue Startseite", () => {
      setRoles(["abfrageerstellung"]);
      const wrapper: VueWrapper = mount(Main, { shallow: true });
      expect((wrapper.vm as any).hasRoleAbfrageerstellung).toBe(true);
      expect(wrapper.findComponent({ name: "StartseiteAbfrageerstellung" }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "StartseiteStandard" }).exists()).toBe(false);
    });

    test("zeigt die neue Startseite auch bei Mischrollen", () => {
      setRoles(["sachbearbeitung", "abfrageerstellung"]);
      const wrapper: VueWrapper = mount(Main, { shallow: true });
      expect(wrapper.findComponent({ name: "StartseiteAbfrageerstellung" }).exists()).toBe(true);
    });

    test("lässt die Startseite für alle anderen Rollen unverändert", () => {
      setRoles(["sachbearbeitung"]);
      const wrapper: VueWrapper = mount(Main, { shallow: true });
      expect((wrapper.vm as any).hasRoleAbfrageerstellung).toBe(false);
      expect(wrapper.findComponent({ name: "StartseiteStandard" }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "StartseiteAbfrageerstellung" }).exists()).toBe(false);
    });

    test("zeigt ohne geladene Nutzerinformationen die bisherige Startseite", () => {
      const wrapper: VueWrapper = mount(Main, { shallow: true });
      expect(wrapper.findComponent({ name: "StartseiteStandard" }).exists()).toBe(true);
    });
  });

  describe("UebersichtPanel", () => {
    test("zeigt standardmäßig die Kartenansicht mit Vergrößern-Möglichkeit", () => {
      const wrapper: VueWrapper = mount(UebersichtPanel, { shallow: true });
      expect((wrapper.vm as any).ansicht).toBe("KARTE");
      const karte = wrapper.findComponent({ name: "SearchResultCityMap" });
      expect(karte.exists()).toBe(true);
      expect(karte.props("expandable")).toBe(true);
      expect(wrapper.findComponent({ name: "SearchResultList" }).exists()).toBe(false);
    });

    test("schaltet auf die Listenansicht um", async () => {
      const wrapper: VueWrapper = mount(UebersichtPanel, { shallow: true });
      (wrapper.vm as any).ansicht = "LISTE";
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent({ name: "SearchResultList" }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: "SearchResultCityMap" }).exists()).toBe(false);
    });

    test("enthält eine eigene Suchleiste", () => {
      const wrapper: VueWrapper = mount(UebersichtPanel, { shallow: true });
      expect(wrapper.findComponent({ name: "SearchInputField" }).exists()).toBe(true);
    });
  });
});
