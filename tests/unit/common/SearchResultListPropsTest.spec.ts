import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SearchResultList from "@/components/search/SearchResultList.vue";

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

  test("behält ohne Props die bisherige Breite von 450px bei", () => {
    const wrapper: VueWrapper = mount(SearchResultList, { shallow: true });
    expect(wrapper.props("width")).toBe("450px");
  });

  test("füllt ohne height-Prop das umgebende Element vollständig aus", () => {
    const wrapper: VueWrapper = mount(SearchResultList, { shallow: true });
    expect(wrapper.props("height")).toBe("100%");
  });

  test("übernimmt gesetzte Breiten- und Höhenangaben", () => {
    const wrapper: VueWrapper = mount(SearchResultList, {
      shallow: true,
      props: { width: "100%", height: "100%" },
    });
    expect(wrapper.props("width")).toBe("100%");
    expect(wrapper.props("height")).toBe("100%");
  });
});
