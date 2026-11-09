import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SearchResultList from "@/components/search/SearchResultList.vue";
import { HINWEIS_SUCHE_STARTEN, useSearchStore } from "@/stores/SearchStore";
import { useUserinfoStore } from "@/stores/Userinfostore";
import { type SearchResultDto, SearchResultDtoTypeEnum, StatusAbfrage } from "@/api/api-client/isi-backend";

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForEntities: vi.fn() }),
}));

describe("SearchResultListPropsTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("füllt ohne Props das umgebende Element in beiden Richtungen vollständig aus", () => {
    const wrapper: VueWrapper = mount(SearchResultList, { shallow: true });
    expect(wrapper.props("width")).toBe("100%");
    expect(wrapper.props("height")).toBe("100%");
  });

  test("übernimmt gesetzte Breiten- und Höhenangaben", () => {
    const wrapper: VueWrapper = mount(SearchResultList, {
      shallow: true,
      props: { width: "450px", height: "600px" },
    });
    expect(wrapper.props("width")).toBe("450px");
    expect(wrapper.props("height")).toBe("600px");
  });

  test("zeigt ohne Filter vor der ersten Suche den Suchhinweis", () => {
    const wrapper: VueWrapper = mount(SearchResultList, { shallow: true, global: { renderStubDefaultSlot: true } });
    const hinweis = wrapper.findComponent({ name: "VAlert" });
    expect(hinweis.props("type")).toBe("info");
    expect(hinweis.text()).toBe(HINWEIS_SUCHE_STARTEN);
  });

  test("zeigt nach einer Suche ohne Treffer den bisherigen Text", async () => {
    useSearchStore().setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
    const wrapper: VueWrapper = mount(SearchResultList, { shallow: true, global: { renderStubDefaultSlot: true } });
    expect(wrapper.text()).toContain("Keine Suchergebnisse vorhanden");
    expect(wrapper.findComponent({ name: "VAlert" }).exists()).toBe(false);
  });

  describe("Links zu den Suchergebnissen", () => {
    function mountWithSearchResults(searchResults: Array<SearchResultDto>): VueWrapper {
      useSearchStore().setSearchResults({ searchResults, page: 1, numberOfPages: 1 });
      return mount(SearchResultList, { shallow: true, global: { renderStubDefaultSlot: true } });
    }

    test("verlinkt die Suchergebnisse, damit sie in einem neuen Tab geöffnet werden können", () => {
      const wrapper = mountWithSearchResults([
        { type: SearchResultDtoTypeEnum.Abfrage, id: "abfrage-1" },
        { type: SearchResultDtoTypeEnum.Bauvorhaben, id: "bauvorhaben-1" },
        { type: SearchResultDtoTypeEnum.Infrastruktureinrichtung, id: "einrichtung-1" },
      ]);
      expect(wrapper.find("#search_result_item_0").attributes("to")).toBe("/abfrage/abfrage-1");
      expect(wrapper.find("#search_result_item_1").attributes("to")).toBe("/bauvorhaben/bauvorhaben-1");
      expect(wrapper.find("#search_result_item_2").attributes("to")).toBe("/infrastruktureinrichtung/einrichtung-1");
    });

    test("erzeugt ohne ID keinen Link", () => {
      const wrapper = mountWithSearchResults([
        { type: SearchResultDtoTypeEnum.Abfrage },
        { type: SearchResultDtoTypeEnum.Bauvorhaben },
        { type: SearchResultDtoTypeEnum.Infrastruktureinrichtung },
      ]);
      expect(wrapper.find("#search_result_item_0").attributes("to")).toBeUndefined();
      expect(wrapper.find("#search_result_item_1").attributes("to")).toBeUndefined();
      expect(wrapper.find("#search_result_item_2").attributes("to")).toBeUndefined();
    });

    test("erzeugt für Anwender keinen Link zu nicht erledigten Abfragen", () => {
      useUserinfoStore().setUserinfo({ roles: ["anwender"] } as never);
      const wrapper = mountWithSearchResults([
        { type: SearchResultDtoTypeEnum.Abfrage, id: "offen", statusAbfrage: StatusAbfrage.Angelegt },
        { type: SearchResultDtoTypeEnum.Abfrage, id: "erledigt", statusAbfrage: StatusAbfrage.ErledigtMitFachreferat },
      ]);
      expect(wrapper.find("#search_result_item_0").attributes("to")).toBeUndefined();
      expect(wrapper.find("#search_result_item_1").attributes("to")).toBe("/abfrage/erledigt");
    });
  });
});
