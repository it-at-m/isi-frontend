import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import {
  type AbfrageSearchResultDto,
  type BauvorhabenSearchResultDto,
  type InfrastruktureinrichtungSearchResultDto,
  AbfrageDtoArtAbfrageEnum,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import VorgangKarte from "@/components/startseite/VorgangKarte.vue";
import { useLookupStore } from "@/stores/LookupStore";
import type { Vorgang } from "@/utils/StartseiteUtil";

const mockPush = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

function mountKarte(vorgang: Vorgang) {
  return mount(VorgangKarte, { shallow: true, props: { vorgang } });
}

describe("VorgangKarteTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockPush.mockReset();
    const lookupStore = useLookupStore();
    lookupStore.statusAbfrage = [{ key: "ANGELEGT", value: "Angelegt" }];
    lookupStore.verfahrensstand = [{ key: "RAHMENPLANUNG", value: "Rahmenplanung" }];
    lookupStore.infrastruktureinrichtungTyp = [{ key: "KINDERKRIPPE", value: "Kinderkrippe" }];
    lookupStore.statusInfrastruktureinrichtung = [{ key: "BESTAND", value: "Bestand" }];
  });

  test("stellt eine Abfrage wie bisher dar und navigiert zur Abfrage", async () => {
    const abfrage: AbfrageSearchResultDto = {
      type: SearchResultDtoTypeEnum.Abfrage,
      id: "abfrage-1",
      name: "Osterangerstraße 3",
      artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      statusAbfrage: "ANGELEGT" as AbfrageSearchResultDto["statusAbfrage"],
      stadtbezirke: new Set([
        { nummer: "12", name: "Schwabing-Freimann" },
        { nummer: "01", name: "Altstadt-Lehel" },
      ]),
    };
    const wrapper = mountKarte(abfrage);
    const darstellung = (wrapper.vm as any).darstellung;
    expect(darstellung.name).toBe("Osterangerstraße 3");
    expect(darstellung.farbe).toBe("green-lighten-1");
    expect(darstellung.status).toBe("Angelegt");
    expect(darstellung.stadtbezirke).toBe("01/Altstadt-Lehel, 12/Schwabing-Freimann");

    (wrapper.vm as any).routeToVorgang();
    expect(mockPush).toHaveBeenCalledWith("/abfrage/abfrage-1");
  });

  test("stellt ein Vorhaben dar und navigiert zum Vorhaben", () => {
    const bauvorhaben: BauvorhabenSearchResultDto = {
      type: SearchResultDtoTypeEnum.Bauvorhaben,
      id: "bauvorhaben-1",
      nameVorhaben: "Neubaugebiet",
      verfahrensstand: "RAHMENPLANUNG" as BauvorhabenSearchResultDto["verfahrensstand"],
    };
    const wrapper = mountKarte(bauvorhaben);
    const darstellung = (wrapper.vm as any).darstellung;
    expect(darstellung.name).toBe("Neubaugebiet");
    expect(darstellung.art).toBe("Vorhaben");
    expect(darstellung.status).toBe("Rahmenplanung");
    expect(darstellung.icon).toBe("mdi-account-hard-hat");

    (wrapper.vm as any).routeToVorgang();
    expect(mockPush).toHaveBeenCalledWith("/bauvorhaben/bauvorhaben-1");
  });

  test("stellt eine Infrastruktureinrichtung ohne Stadtbezirke dar und navigiert zur Einrichtung", () => {
    const einrichtung: InfrastruktureinrichtungSearchResultDto = {
      type: SearchResultDtoTypeEnum.Infrastruktureinrichtung,
      id: "einrichtung-1",
      nameEinrichtung: "Krippe am Park",
      infrastruktureinrichtungTyp:
        "KINDERKRIPPE" as InfrastruktureinrichtungSearchResultDto["infrastruktureinrichtungTyp"],
      status: "BESTAND" as InfrastruktureinrichtungSearchResultDto["status"],
    };
    const wrapper = mountKarte(einrichtung);
    const darstellung = (wrapper.vm as any).darstellung;
    expect(darstellung.art).toBe("Kinderkrippe");
    expect(darstellung.status).toBe("Bestand");
    expect(darstellung.stadtbezirke).toBeUndefined();

    (wrapper.vm as any).routeToVorgang();
    expect(mockPush).toHaveBeenCalledWith("/infrastruktureinrichtung/einrichtung-1");
  });

  test("navigiert ohne id nicht", () => {
    const wrapper = mountKarte({ type: SearchResultDtoTypeEnum.Bauvorhaben, nameVorhaben: "Ohne id" });
    (wrapper.vm as any).routeToVorgang();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
