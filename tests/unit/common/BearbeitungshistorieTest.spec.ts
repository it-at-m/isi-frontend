import { beforeEach, describe, expect, test } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { BearbeitungsArt, StatusAbfrage, type BearbeitungshistorieDto } from "@/api/api-client/isi-backend";
import Bearbeitungshistorie from "@/components/common/Bearbeitungshistorie.vue";
import { useLookupStore } from "@/stores/LookupStore";

function mountComponent(modelValue: Array<BearbeitungshistorieDto> | undefined): VueWrapper {
  return mount(Bearbeitungshistorie, { shallow: true, props: { modelValue } });
}

describe("BearbeitungshistorieTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useLookupStore().statusAbfrage = [{ key: "START_BEARBEITUNG", value: "Start Bearbeitung" }];
  });

  test("zeigt die aktuellsten Einträge zuerst", () => {
    const wrapper = mountComponent([
      { art: BearbeitungsArt.Erstellt, zeitpunkt: new Date(2026, 0, 1) },
      { art: BearbeitungsArt.Aktualisiert, zeitpunkt: new Date(2026, 0, 3) },
      { art: BearbeitungsArt.Statusaenderung, zeitpunkt: new Date(2026, 0, 2) },
    ]);

    expect((wrapper.vm as any).eintraege.map((eintrag: BearbeitungshistorieDto) => eintrag.art)).toEqual([
      BearbeitungsArt.Aktualisiert,
      BearbeitungsArt.Statusaenderung,
      BearbeitungsArt.Erstellt,
    ]);
  });

  test("beschreibt Erstellung, Aktualisierung und Statusänderung", () => {
    const vm = mountComponent([]).vm as any;

    expect(vm.aktionText({ art: BearbeitungsArt.Erstellt })).toBe("Erstellt");
    expect(vm.aktionText({ art: BearbeitungsArt.Aktualisiert })).toBe("Aktualisiert");
    expect(vm.aktionText({ art: BearbeitungsArt.Statusaenderung, zielStatus: StatusAbfrage.StartBearbeitung })).toBe(
      "Statusänderung: Start Bearbeitung",
    );
  });

  test("gibt einen Eintrag ohne Art nicht als Statusänderung aus", () => {
    const vm = mountComponent([]).vm as any;

    expect(vm.aktionText({ zielStatus: StatusAbfrage.StartBearbeitung })).toBe("");
  });

  test("zeigt Datum und Uhrzeit der Änderung", () => {
    const vm = mountComponent([]).vm as any;

    expect(vm.zeitpunktFormatted(new Date("2026-11-10T09:05:00"))).toBe("10.11.2026 09:05");
    expect(vm.zeitpunktFormatted(undefined)).toBe("");
  });

  test("blendet die Historie ohne Einträge aus", () => {
    expect(mountComponent(undefined).find("#benutzerinformation_menu").exists()).toBe(false);
    expect(mountComponent([]).find("#benutzerinformation_menu").exists()).toBe(false);
  });

  test("zeigt die Historie mit Einträgen an", () => {
    const wrapper = mountComponent([{ art: BearbeitungsArt.Erstellt, zeitpunkt: new Date(2026, 0, 1) }]);

    expect(wrapper.find("#benutzerinformation_menu").exists()).toBe(true);
  });
});
