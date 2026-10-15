import { defineStore } from "pinia";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import {
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  type SchnellfilterVorgaenge,
  type SortierungVorgaenge,
} from "@/utils/StartseiteUtil";

interface State {
  schnellfilter: SchnellfilterVorgaenge;
  sortierung: SortierungVorgaenge;
  geladen: boolean;
  // Generationszähler, um zu verhindern, dass veraltete Netzwerkantworten neuere lokale Änderungen überschreiben
  requestGeneration: number;
}

/**
 * Hält die gespeicherten Startseiteneinstellungen des Nutzers für den Bereich "Meine Vorgänge".
 *
 * Der Store ist die gemeinsame Quelle für die Profileinstellungen und die Vorgangsliste, damit eine
 * gespeicherte Änderung sofort in der Liste ankommt, ohne die Seite neu zu laden.
 */
export const useStartseitenEinstellungStore = defineStore("startseitenEinstellung", {
  state: () =>
    ({
      schnellfilter: DEFAULT_SCHNELLFILTER,
      sortierung: DEFAULT_SORTIERUNG,
      geladen: false,
      requestGeneration: 0,
    }) as State,
  getters: {},
  actions: {
    /**
     * Lädt die gespeicherten Einstellungen einmalig vom Backend.
     *
     * Sind noch keine gespeichert oder schlägt der Request fehl, bleiben die Standardwerte bestehen.
     */
    async initialize(): Promise<void> {
      if (this.geladen) {
        return;
      }
      const { getStartseitenEinstellung } = useStartseitenEinstellungApi();
      const generation = this.requestGeneration;
      try {
        const einstellung = await getStartseitenEinstellung();
        // Wenn sich die Generation während des Wartens erhöht hat, wurde eine neuere lokale Änderung angewendet;
        // überschreibe in diesem Fall nicht die neueren Einstellungen mit der aktuellen, noch in-flight Response.
        if (this.requestGeneration !== generation) {
          return;
        }
        this.schnellfilter = (einstellung.schnellfilter as unknown as SchnellfilterVorgaenge) ?? DEFAULT_SCHNELLFILTER;
        this.sortierung = (einstellung.sortBy as unknown as SortierungVorgaenge) ?? DEFAULT_SORTIERUNG;
        // Nur bei erfolgreichem Laden als geladen markieren, damit ein fehlgeschlagener Request später erneut versucht werden kann.
        this.geladen = true;
      } catch {
        // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen und die Initialisierung gilt nicht als abgeschlossen.
      }
    },
    /**
     * Übernimmt erfolgreich gespeicherte Einstellungen.
     */
    setEinstellung(schnellfilter: SchnellfilterVorgaenge, sortierung: SortierungVorgaenge): void {
      this.schnellfilter = schnellfilter;
      this.sortierung = sortierung;
      // Generation erhöhen, um wartende initialize()-Requests zu invalidieren.
      this.requestGeneration++;
      this.geladen = true;
    },
  },
});
