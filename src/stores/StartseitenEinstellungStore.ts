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
      try {
        const einstellung = await getStartseitenEinstellung();
        this.schnellfilter = (einstellung.schnellfilter as unknown as SchnellfilterVorgaenge) ?? DEFAULT_SCHNELLFILTER;
        this.sortierung = (einstellung.sortBy as unknown as SortierungVorgaenge) ?? DEFAULT_SORTIERUNG;
      } catch {
        // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen.
      } finally {
        this.geladen = true;
      }
    },
    /**
     * Übernimmt erfolgreich gespeicherte Einstellungen.
     */
    setEinstellung(schnellfilter: SchnellfilterVorgaenge, sortierung: SortierungVorgaenge): void {
      this.schnellfilter = schnellfilter;
      this.sortierung = sortierung;
      this.geladen = true;
    },
  },
});
