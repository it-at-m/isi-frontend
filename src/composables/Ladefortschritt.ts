import { computed, getCurrentInstance, onBeforeUnmount, ref } from "vue";

export type Ladestatus = "inaktiv" | "laedt" | "abgeschlossen" | "unvollstaendig";

/**
 * Verfolgt den Fortschritt eines Ladevorgangs, der aus einer festen Anzahl von Schritten besteht.
 * Nach Abschluss bleibt der Status für die angegebene Dauer sichtbar und wechselt danach wieder auf "inaktiv".
 */
export function useLadefortschritt(anzahlSchritte: number, anzeigedauerNachAbschlussMs = 3000) {
  const status = ref<Ladestatus>("inaktiv");
  const erledigteSchritte = ref(0);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const prozent = computed(() => Math.min(100, Math.round((erledigteSchritte.value / anzahlSchritte) * 100)));

  function stoppeTimer(): void {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function starte(): void {
    stoppeTimer();
    erledigteSchritte.value = 0;
    status.value = "laedt";
  }

  /**
   * Wartet auf den Request und zählt den Schritt als erledigt, unabhängig davon, ob er erfolgreich war.
   */
  async function schritt<T>(request: Promise<T>): Promise<T> {
    try {
      return await request;
    } finally {
      erledigteSchritte.value++;
    }
  }

  function beende(vollstaendig = true): void {
    erledigteSchritte.value = anzahlSchritte;
    status.value = vollstaendig ? "abgeschlossen" : "unvollstaendig";
    stoppeTimer();
    timer = setTimeout(() => {
      status.value = "inaktiv";
      timer = undefined;
    }, anzeigedauerNachAbschlussMs);
  }

  function brecheAb(): void {
    stoppeTimer();
    status.value = "inaktiv";
  }

  if (getCurrentInstance()) {
    onBeforeUnmount(stoppeTimer);
  }

  return { status, erledigteSchritte, anzahlSchritte, prozent, starte, schritt, beende, brecheAb };
}
