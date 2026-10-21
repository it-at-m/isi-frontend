import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { defineComponent, nextTick, ref, type Ref } from "vue";
import { mount } from "@vue/test-utils";
import {
  createAbfrageTabTitleName,
  createTabTitle,
  DEFAULT_TAB_TITLE,
  TAB_TITLE_ABFRAGE,
  TAB_TITLE_BAUVORHABEN,
  TAB_TITLE_INFRASTRUKTUREINRICHTUNG,
  useTabTitle,
} from "@/composables/TabTitle";

interface Objekt {
  name?: string;
}

function mountWithTabTitle(objekt: Ref<Objekt>, isNew: Ref<boolean>) {
  return mount(
    defineComponent({
      setup() {
        useTabTitle(objekt, (objekt) => objekt.name, isNew, TAB_TITLE_ABFRAGE);
        return () => null;
      },
    }),
  );
}

describe("TabTitle.spec.ts", () => {
  beforeEach(() => {
    document.title = DEFAULT_TAB_TITLE;
  });

  afterEach(() => {
    document.title = DEFAULT_TAB_TITLE;
  });

  describe("createTabTitle", () => {
    test("stellt bei gespeicherten Objekten die Art des Objekts vor den Namen", () => {
      expect(createTabTitle(TAB_TITLE_ABFRAGE, "Abfrage 1", false)).toBe("Abfrage: Abfrage 1");
      expect(createTabTitle(TAB_TITLE_BAUVORHABEN, "Vorhaben 1", false)).toBe("Vorhaben: Vorhaben 1");
      expect(createTabTitle(TAB_TITLE_INFRASTRUKTUREINRICHTUNG, "Kita 1", false)).toBe("Einrichtung: Kita 1");
    });

    test("zeigt bei neuen Objekten unabhängig vom Namen einen Text für das neue Objekt", () => {
      expect(createTabTitle(TAB_TITLE_ABFRAGE, "Abfrage 1", true)).toBe("Neue Abfrage");
      expect(createTabTitle(TAB_TITLE_BAUVORHABEN, undefined, true)).toBe("Neues Bauvorhaben");
      expect(createTabTitle(TAB_TITLE_INFRASTRUKTUREINRICHTUNG, "", true)).toBe("Neue Infrastruktureinrichtung");
    });

    test("zeigt den Standardtitel, solange der Name eines gespeicherten Objekts fehlt", () => {
      expect(createTabTitle(TAB_TITLE_ABFRAGE, undefined, false)).toBe(DEFAULT_TAB_TITLE);
      expect(createTabTitle(TAB_TITLE_ABFRAGE, "   ", false)).toBe(DEFAULT_TAB_TITLE);
    });

    test("entfernt Leerzeichen am Anfang und Ende des Namens", () => {
      expect(createTabTitle(TAB_TITLE_ABFRAGE, "  Abfrage 1 ", false)).toBe("Abfrage: Abfrage 1");
    });
  });

  describe("createAbfrageTabTitleName", () => {
    test("hängt den Namen einer gespeicherten Abfragevariante an den Namen der Abfrage an", () => {
      expect(createAbfrageTabTitleName("Innenstadt", { id: "variante-1", name: "Variante 1" })).toBe(
        "Innenstadt - Variante 1",
      );
      expect(
        createTabTitle(
          TAB_TITLE_ABFRAGE,
          createAbfrageTabTitleName("Innenstadt", { id: "variante-1", name: " Variante 1 " }),
          false,
        ),
      ).toBe("Abfrage: Innenstadt - Variante 1");
    });

    test("verwendet ohne geöffnete Abfragevariante nur den Namen der Abfrage", () => {
      expect(createAbfrageTabTitleName("Innenstadt")).toBe("Innenstadt");
    });

    test("verwendet bei einer ungespeicherten oder unbenannten Abfragevariante nur den Namen der Abfrage", () => {
      expect(createAbfrageTabTitleName("Innenstadt", { name: "Neue Variante" })).toBe("Innenstadt");
      expect(createAbfrageTabTitleName("Innenstadt", { id: "variante-1", name: "  " })).toBe("Innenstadt");
    });

    test("hängt ohne Namen der Abfrage keinen Variantennamen an", () => {
      expect(createAbfrageTabTitleName(undefined, { id: "variante-1", name: "Variante 1" })).toBeUndefined();
    });
  });

  describe("useTabTitle", () => {
    test("setzt für ein neues Objekt den Text für das neue Objekt", () => {
      mountWithTabTitle(ref<Objekt>({}), ref(true));
      expect(document.title).toBe("Neue Abfrage");
    });

    test("übernimmt den Namen des geladenen Objekts", async () => {
      const objekt = ref<Objekt>({});
      mountWithTabTitle(objekt, ref(false));
      expect(document.title).toBe(DEFAULT_TAB_TITLE);

      objekt.value = { name: "Geladen" };
      await nextTick();
      expect(document.title).toBe("Abfrage: Geladen");
    });

    test("übernimmt nach dem Speichern eines neuen Objekts dessen Namen", async () => {
      const objekt = ref<Objekt>({ name: "Neu" });
      const isNew = ref(true);
      mountWithTabTitle(objekt, isNew);

      objekt.value = { name: "Gespeichert" };
      isNew.value = false;
      await nextTick();
      expect(document.title).toBe("Abfrage: Gespeichert");
    });

    test("übernimmt Eingaben im Formular erst nach dem Speichern", async () => {
      const objekt = ref<Objekt>({ name: "Gespeichert" });
      mountWithTabTitle(objekt, ref(false));

      objekt.value.name = "Ungespeicherte Eingabe";
      await nextTick();
      expect(document.title).toBe("Abfrage: Gespeichert");

      objekt.value = { name: "Ungespeicherte Eingabe" };
      await nextTick();
      expect(document.title).toBe("Abfrage: Ungespeicherte Eingabe");
    });

    test("reagiert bei einem Getter nur auf das Austauschen der beobachteten Objekte", async () => {
      const abfrage = ref<Objekt>({ name: "Innenstadt" });
      const selected = ref<Objekt>({ name: "Variante 1" });
      mount(
        defineComponent({
          setup() {
            useTabTitle(
              () => [abfrage.value, selected.value] as const,
              ([abfrage, selected]) => `${abfrage.name} - ${selected.name}`,
              ref(false),
              TAB_TITLE_ABFRAGE,
            );
            return () => null;
          },
        }),
      );
      expect(document.title).toBe("Abfrage: Innenstadt - Variante 1");

      selected.value.name = "Ungespeicherte Eingabe";
      await nextTick();
      expect(document.title).toBe("Abfrage: Innenstadt - Variante 1");

      selected.value = { name: "Variante 2" };
      await nextTick();
      expect(document.title).toBe("Abfrage: Innenstadt - Variante 2");
    });

    test("setzt beim Verlassen den Standardtitel", () => {
      const wrapper = mountWithTabTitle(ref<Objekt>({ name: "Gespeichert" }), ref(false));
      expect(document.title).toBe("Abfrage: Gespeichert");

      wrapper.unmount();
      expect(document.title).toBe(DEFAULT_TAB_TITLE);
    });
  });
});
