import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ReferencedItemsList from "@/components/bauvorhaben/ReferencedItemsList.vue";

const mockGetReferencedAbfrageList = vi.fn();
const mockGetReferencedInfrastruktureinrichtungenList = vi.fn();

vi.mock("@/composables/requests/BauvorhabenApi", () => ({
  useBauvorhabenApi: () => ({
    getReferencedAbfrageList: mockGetReferencedAbfrageList,
    getReferencedInfrastruktureinrichtungenList: mockGetReferencedInfrastruktureinrichtungenList,
  }),
}));

vi.mock("@/composables/requests/AbfragenApi", () => ({
  useAbfragenApi: () => ({ getById: vi.fn() }),
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { id: "bauvorhaben-1" } }),
}));

function mountComponent(): VueWrapper {
  return mount(ReferencedItemsList, { shallow: true, global: { renderStubDefaultSlot: true } });
}

async function openPanel(wrapper: VueWrapper, index: number): Promise<void> {
  await wrapper.findAllComponents({ name: "VExpansionPanel" })[index].trigger("click");
  await flushPromises();
}

describe("ReferencedItemsListTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetReferencedAbfrageList.mockReset();
    mockGetReferencedInfrastruktureinrichtungenList.mockReset();
  });

  test("verlinkt die Abfragen, damit sie in einem neuen Tab geöffnet werden können", async () => {
    mockGetReferencedAbfrageList.mockResolvedValue([{ id: "abfrage-1", name: "Abfrage 1" }, { name: "ohne ID" }]);
    const wrapper = mountComponent();
    await openPanel(wrapper, 0);
    expect(wrapper.find("#abfragen_bauvorhaben_reference0").attributes("to")).toBe("/abfrage/abfrage-1");
    expect(wrapper.find("#abfragen_bauvorhaben_reference1").attributes("to")).toBeUndefined();
  });

  test("verlinkt die Infrastruktureinrichtungen, damit sie in einem neuen Tab geöffnet werden können", async () => {
    mockGetReferencedInfrastruktureinrichtungenList.mockResolvedValue([
      { id: "einrichtung-1", nameEinrichtung: "Kita 1" },
      { nameEinrichtung: "ohne ID" },
    ]);
    const wrapper = mountComponent();
    await openPanel(wrapper, 1);
    expect(wrapper.find("#infrastruktureinrichtungen_bauvorhaben_reference0").attributes("to")).toBe(
      "/infrastruktureinrichtung/einrichtung-1",
    );
    expect(wrapper.find("#infrastruktureinrichtungen_bauvorhaben_reference1").attributes("to")).toBeUndefined();
  });
});
