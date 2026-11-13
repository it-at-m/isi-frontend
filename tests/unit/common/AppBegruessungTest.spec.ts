import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { Userinfo } from "@/types/common/Userinfo";
import { useUserinfoStore } from "@/stores/Userinfostore";
import App from "@/App.vue";
import { SCHNELLFILTER_OPTIONEN, SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG } from "@/utils/StartseiteUtil";

const mockGetUserinfo = vi.fn();

vi.mock("@/composables/requests/UserInfoApi", () => ({
  useUserInfoApi: () => ({ getUserinfo: mockGetUserinfo }),
}));

const mockApplyStandardFilter = vi.fn();

vi.mock("@/composables/requests/filter/useStandardFilter", () => ({
  useStandardFilter: () => ({ applyStandardFilter: mockApplyStandardFilter }),
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
    mockApplyStandardFilter.mockReset();
  });

  test("übernimmt beim Laden der Anwendung einmalig den Standard-Filter aus den Profileinstellungen", async () => {
    const wrapper = mountApp(["sachbearbeitung"], "Simon");
    await wrapper.vm.$nextTick();
    expect(mockApplyStandardFilter).toHaveBeenCalledTimes(1);
  });

  test("begrüßt Abfrageersteller in der Titelleiste mit dem Vornamen", async () => {
    const wrapper = mountApp(["abfrageerstellung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showBegruessung).toBe(true);
    expect((wrapper.vm as any).userinfo.givenname).toBe("Simon");
  });

  test("begrüßt die Sachbearbeitung in der Titelleiste mit dem Vornamen", async () => {
    const wrapper = mountApp(["sachbearbeitung"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showBegruessung).toBe(true);
  });

  test("begrüßt andere Rollen nicht", async () => {
    const wrapper = mountApp(["bedarfsmeldung_kita"], "Simon");
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

  test("entfernt die Suchleiste in der Titelleiste bei personalisierter Startseite", async () => {
    const abfrageerstellung = mountApp(["abfrageerstellung"], "Simon");
    await abfrageerstellung.vm.$nextTick();
    expect((abfrageerstellung.vm as any).showGlobaleSuche).toBe(false);

    setActivePinia(createPinia());
    const sachbearbeitung = mountApp(["sachbearbeitung"], "Simon");
    await sachbearbeitung.vm.$nextTick();
    expect((sachbearbeitung.vm as any).showGlobaleSuche).toBe(false);
  });

  test("behält die Suchleiste in der Titelleiste für alle anderen Rollen", async () => {
    const wrapper = mountApp(["bedarfsmeldung_kita"], "Simon");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).showGlobaleSuche).toBe(true);
  });

  test("behält die Suchleiste, solange keine Nutzerinformationen geladen sind", () => {
    mockGetUserinfo.mockResolvedValue(new Userinfo());
    const wrapper = mount(App, { shallow: true });
    expect((wrapper.vm as any).showGlobaleSuche).toBe(true);
  });

  test("übergibt den Startseiteneinstellungen die Schnellfilter der personalisierten Startseite", async () => {
    const abfrageerstellung = mountApp(["abfrageerstellung"], "Simon");
    await abfrageerstellung.vm.$nextTick();
    expect((abfrageerstellung.vm as any).startseitenKonfiguration?.schnellfilterOptionen).toEqual(
      SCHNELLFILTER_OPTIONEN,
    );

    setActivePinia(createPinia());
    const sachbearbeitung = mountApp(["sachbearbeitung"], "Simon");
    await sachbearbeitung.vm.$nextTick();
    expect((sachbearbeitung.vm as any).startseitenKonfiguration?.schnellfilterOptionen).toEqual(
      SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
    );

    setActivePinia(createPinia());
    const andereRolle = mountApp(["bedarfsmeldung_kita"], "Simon");
    await andereRolle.vm.$nextTick();
    expect((andereRolle.vm as any).startseitenKonfiguration?.schnellfilterOptionen).toBeUndefined();
  });
});
