import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SearchResultList from "@/components/search/SearchResultList.vue";
import { HINWEIS_SUCHE_STARTEN, useSearchStore } from "@/stores/SearchStore";

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForEntities: vi.fn() }),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: vi.fn() }),
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
});
