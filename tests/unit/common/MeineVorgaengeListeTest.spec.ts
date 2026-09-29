import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import MeineVorgaengeListe from "@/components/startseite/MeineVorgaengeListe.vue";

const mockSearchForEntities = vi.fn();
const mockGetStartseitenEinstellung = vi.fn();
const mockPush = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForEntities: mockSearchForEntities }),
}));

vi.mock("@/composables/requests/startseite/StartseitenEinstellungApi", () => ({
  useStartseitenEinstellungApi: () => ({ getStartseitenEinstellung: mockGetStartseitenEinstellung }),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

let wrapper: VueWrapper;

function mountComponent(): VueWrapper {
  return mount(MeineVorgaengeListe, { shallow: true });
}

describe("MeineVorgaengeListeTest.spec.ts", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    mockSearchForEntities.mockReset();
    mockGetStartseitenEinstellung.mockReset();
    mockPush.mockReset();
    mockSearchForEntities.mockResolvedValue({ searchResults: [], numberOfPages: 0, page: 1 });
    mockGetStartseitenEinstellung.mockRejectedValue(new Error("keine Einstellungen"));
    wrapper = mountComponent();
    await wrapper.vm.$nextTick();
  });

  describe("createSearchQuery", () => {
    test("schränkt serverseitig auf die eigenen Abfragen ein", () => {
      const vm = wrapper.vm as any;
      const query = vm.createSearchQuery(1);
      expect(query.filterNurEigeneAbfragen).toBe(true);
    });

    test("durchsucht ausschließlich die drei Abfragearten", () => {
      const vm = wrapper.vm as any;
      const query = vm.createSearchQuery(1);
      expect(query.selectBauleitplanverfahren).toBe(true);
      expect(query.selectBaugenehmigungsverfahren).toBe(true);
      expect(query.selectWeiteresVerfahren).toBe(true);
      expect(query.selectBauvorhaben).toBe(false);
      expect(query.selectGrundschule).toBe(false);
      expect(query.selectGsNachmittagBetreuung).toBe(false);
      expect(query.selectHausFuerKinder).toBe(false);
      expect(query.selectKindergarten).toBe(false);
      expect(query.selectKinderkrippe).toBe(false);
      expect(query.selectMittelschule).toBe(false);
    });

    test("setzt für 'Alle Vorgänge' keinen Statusfilter", () => {
      const vm = wrapper.vm as any;
      expect(vm.createSearchQuery(1).filterStatusAbfrage).toBeUndefined();
    });

    test("übernimmt den Schnellfilter in filterStatusAbfrage", async () => {
      const vm = wrapper.vm as any;
      vm.schnellfilter = "ZUR_BEARBEITUNG";
      await wrapper.vm.$nextTick();
      expect(vm.createSearchQuery(1).filterStatusAbfrage).toEqual([
        StatusAbfrage.EinplanungBedarfe,
        StatusAbfrage.Angelegt,
      ]);
    });

    test("sortiert die Bearbeitungsfrist aufsteigend, die übrigen Kriterien absteigend", async () => {
      const vm = wrapper.vm as any;
      vm.sortierung = "FRIST_BEARBEITUNG";
      await wrapper.vm.$nextTick();
      let query = vm.createSearchQuery(1);
      expect(query.sortBy).toBe("FRIST_BEARBEITUNG");
      expect(query.sortOrder).toBe("ASC");

      vm.sortierung = "LAST_MODIFIED_DATE_TIME";
      await wrapper.vm.$nextTick();
      query = vm.createSearchQuery(1);
      expect(query.sortBy).toBe("LAST_MODIFIED_DATE_TIME");
      expect(query.sortOrder).toBe("DESC");
    });

    test("übernimmt die angeforderte Seite", () => {
      const vm = wrapper.vm as any;
      expect(vm.createSearchQuery(3).page).toBe(3);
    });
  });

  describe("Laden der Vorgänge", () => {
    test("lädt beim Mounten einmalig", () => {
      expect(mockSearchForEntities).toHaveBeenCalledTimes(1);
    });

    test("löst bei Wechsel des Schnellfilters einen neuen Request aus", async () => {
      const vm = wrapper.vm as any;
      mockSearchForEntities.mockClear();
      vm.schnellfilter = "ABGESCHLOSSEN";
      await wrapper.vm.$nextTick();
      expect(mockSearchForEntities).toHaveBeenCalledTimes(1);
      expect(mockSearchForEntities.mock.calls[0][0].filterStatusAbfrage).toEqual([
        StatusAbfrage.ErledigtMitFachreferat,
        StatusAbfrage.ErledigtOhneFachreferat,
      ]);
    });

    test("löst bei Wechsel der Sortierung einen neuen Request aus", async () => {
      const vm = wrapper.vm as any;
      mockSearchForEntities.mockClear();
      vm.sortierung = "FRIST_BEARBEITUNG";
      await wrapper.vm.$nextTick();
      expect(mockSearchForEntities).toHaveBeenCalledTimes(1);
      expect(mockSearchForEntities.mock.calls[0][0].sortBy).toBe("FRIST_BEARBEITUNG");
    });

    test("übernimmt die Suchergebnisse in die Liste", async () => {
      const vm = wrapper.vm as any;
      mockSearchForEntities.mockResolvedValue({
        searchResults: [{ id: "abfrage-1", name: "Osterangerstraße 3" }],
        numberOfPages: 1,
        page: 1,
      });
      await vm.loadVorgaenge();
      expect(vm.vorgaenge).toHaveLength(1);
      expect(vm.vorgaenge[0].id).toBe("abfrage-1");
    });

    test("zeigt einen Hinweis, wenn keine eigenen Vorgänge vorhanden sind", () => {
      expect((wrapper.vm as any).vorgaenge).toHaveLength(0);
      expect(wrapper.find("#meine_vorgaenge_leer").exists()).toBe(true);
      expect(wrapper.find("#meine_vorgaenge_liste").exists()).toBe(false);
    });

    test("zeigt die Liste statt des Hinweises, sobald Vorgänge vorhanden sind", async () => {
      const vm = wrapper.vm as any;
      mockSearchForEntities.mockResolvedValue({
        searchResults: [{ id: "abfrage-1", name: "Osterangerstraße 3" }],
        numberOfPages: 1,
        page: 1,
      });
      await vm.loadVorgaenge();
      await wrapper.vm.$nextTick();
      expect(wrapper.find("#meine_vorgaenge_liste").exists()).toBe(true);
      expect(wrapper.find("#meine_vorgaenge_leer").exists()).toBe(false);
    });
  });

  describe("Voreinstellungen aus dem Profil", () => {
    test("werden beim Mounten übernommen", async () => {
      mockGetStartseitenEinstellung.mockResolvedValue({
        schnellfilter: "ZUR_KENNTNIS",
        sortBy: "FRIST_BEARBEITUNG",
        sortOrder: "ASC",
      });
      const eigenerWrapper = mountComponent();
      await eigenerWrapper.vm.$nextTick();
      await eigenerWrapper.vm.$nextTick();
      const vm = eigenerWrapper.vm as any;
      expect(vm.schnellfilter).toBe("ZUR_KENNTNIS");
      expect(vm.sortierung).toBe("FRIST_BEARBEITUNG");
    });

    test("fallen bei einem Fehler auf die Standardwerte zurück", () => {
      const vm = wrapper.vm as any;
      expect(vm.schnellfilter).toBe("ALLE");
      expect(vm.sortierung).toBe("CREATED_DATE_TIME");
    });
  });
});
