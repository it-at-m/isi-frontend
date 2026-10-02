import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { Userinfo } from "@/types/common/Userinfo";
import { useUserinfoStore } from "@/stores/Userinfostore";
import App from "@/App.vue";

const mockGetUserinfo = vi.fn();

vi.mock("@/composables/requests/UserInfoApi", () => ({
  useUserInfoApi: () => ({ getUserinfo: mockGetUserinfo }),
}));

vi.mock("@/stores/LookupStore", () => ({
  useLookupStore: () => ({ inititalize: vi.fn(), statusAbfrage: [], verfahrensstand: [] }),
}));

vi.mock("@/stores/StammdatenStore", () => ({
  useStammdatenStore: () => ({ initializeFileStamm: vi.fn(), initializeFoerdermixStamm: vi.fn() }),
}));

vi.mock("@/stores/MetabaseReportingStore", () => ({
  useMetabaseReportingStore: () => ({ initialize: vi.fn(), metabaseReportingInformation: undefined }),
}));

function mountApp(roles: Array<string>, givenname: string | undefined): VueWrapper {
  const userinfo = new Userinfo();
  userinfo.roles = roles;
  userinfo.givenname = givenname;
  userinfo.surname = "Muster";
  mockGetUserinfo.mockResolvedValue(userinfo);
  const wrapper = mount(App, { shallow: true });
  useUserinfoStore().setUserinfo(userinfo);
  return wrapper;
}

describe("AppBegruessungTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetUserinfo.mockReset();
  });

  test("begrüßt Abfrageersteller in der Titelleiste mit dem Vornamen", async () => {
    const wrapper = mountApp(["abfrageerstellung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showBegruessung).toBe(true);
    expect((wrapper.vm as any).userinfo.givenname).toBe("Simon");
  });

  test("begrüßt andere Rollen nicht", async () => {
    const wrapper = mountApp(["sachbearbeitung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showBegruessung).toBe(false);
    expect(wrapper.find("#app_begruessung").exists()).toBe(false);
  });

  test("begrüßt nicht, solange kein Vorname vorliegt", async () => {
    const wrapper = mountApp(["abfrageerstellung"], undefined);
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showBegruessung).toBe(false);
    expect(wrapper.find("#app_begruessung").exists()).toBe(false);
  });

  test("entfernt die Suchleiste in der Titelleiste für Abfrageersteller", async () => {
    const wrapper = mountApp(["abfrageerstellung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showGlobaleSuche).toBe(false);
  });

  test("behält die Suchleiste in der Titelleiste für alle anderen Rollen", async () => {
    const wrapper = mountApp(["sachbearbeitung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showGlobaleSuche).toBe(true);
  });

  test("behält die Suchleiste, solange keine Nutzerinformationen geladen sind", () => {
    mockGetUserinfo.mockResolvedValue(new Userinfo());
    const wrapper = mount(App, { shallow: true });
    expect((wrapper.vm as any).showGlobaleSuche).toBe(true);
  });

  test("blendet die Startseiteneinstellungen nur für Abfrageersteller ein", async () => {
    const mitRolle = mountApp(["abfrageerstellung"], "Simon");
    await mitRolle.vm.$nextTick();
    expect((mitRolle.vm as any).hasRoleAbfrageerstellung).toBe(true);

    setActivePinia(createPinia());
    const ohneRolle = mountApp(["sachbearbeitung"], "Simon");
    await ohneRolle.vm.$nextTick();
    expect((ohneRolle.vm as any).hasRoleAbfrageerstellung).toBe(false);
  });
});
