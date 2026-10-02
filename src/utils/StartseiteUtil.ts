import { StatusAbfrage } from "@/api/api-client/isi-backend";

/**
 * Die Schnellfilter des Startseitenbereichs "Meine Vorgänge".
 *
 * Die Werte entsprechen dem Backend-Enum `SchnellfilterVorgaenge`.
 */
export type SchnellfilterVorgaenge = "ALLE" | "ZUR_BEARBEITUNG" | "ZUR_KENNTNIS" | "ABGESCHLOSSEN";

/**
 * Die Sortierkriterien des Startseitenbereichs "Meine Vorgänge".
 *
 * Die Werte entsprechen dem Backend-Enum `SortAttribute`.
 */
export type SortierungVorgaenge = "CREATED_DATE_TIME" | "LAST_MODIFIED_DATE_TIME" | "FRIST_BEARBEITUNG";

export const DEFAULT_SCHNELLFILTER: SchnellfilterVorgaenge = "ALLE";

export const DEFAULT_SORTIERUNG: SortierungVorgaenge = "CREATED_DATE_TIME";

export interface AuswahlOption<T> {
  title: string;
  value: T;
}

export const SCHNELLFILTER_OPTIONEN: Array<AuswahlOption<SchnellfilterVorgaenge>> = [
  { title: "Alle Vorgänge", value: "ALLE" },
  { title: "Zur Bearbeitung", value: "ZUR_BEARBEITUNG" },
  { title: "Zur Kenntnis", value: "ZUR_KENNTNIS" },
  { title: "Abgeschlossene Vorgänge", value: "ABGESCHLOSSEN" },
];

export const SORTIERUNG_OPTIONEN: Array<AuswahlOption<SortierungVorgaenge>> = [
  { title: "Zuletzt hinzugefügt", value: "CREATED_DATE_TIME" },
  { title: "Zuletzt bearbeitet", value: "LAST_MODIFIED_DATE_TIME" },
  { title: "Bearbeitungsfrist", value: "FRIST_BEARBEITUNG" },
];

/**
 * Bildet einen Schnellfilter auf die dazugehörigen Abfragestatus ab.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die zu filternden Status oder `undefined`, falls nicht nach Status gefiltert werden soll.
 */
export function getStatusAbfrageForSchnellfilter(
  schnellfilter: SchnellfilterVorgaenge | undefined,
): Array<StatusAbfrage> | undefined {
  switch (schnellfilter) {
    case "ZUR_BEARBEITUNG":
      return [StatusAbfrage.EinplanungBedarfe, StatusAbfrage.Angelegt];
    case "ZUR_KENNTNIS":
      return [
        StatusAbfrage.UebermitteltZurBearbeitung,
        StatusAbfrage.StartBearbeitung,
        StatusAbfrage.EinpflegenBedarfsmeldung,
      ];
    case "ABGESCHLOSSEN":
      return [StatusAbfrage.ErledigtMitFachreferat, StatusAbfrage.ErledigtOhneFachreferat];
    case "ALLE":
    default:
      return undefined;
  }
}

/**
 * Die Sortierreihenfolge zum jeweiligen Sortierkriterium.
 *
 * Nach der Bearbeitungsfrist wird aufsteigend sortiert, damit die kürzeste Restlaufzeit zuerst erscheint.
 * Die übrigen Kriterien werden absteigend sortiert, damit die neuesten Vorgänge zuerst erscheinen.
 *
 * @param sortierung das ausgewählte Sortierkriterium.
 * @returns "ASC" oder "DESC".
 */
export function getSortOrderForSortierung(sortierung: SortierungVorgaenge | undefined): "ASC" | "DESC" {
  return sortierung === "FRIST_BEARBEITUNG" ? "ASC" : "DESC";
}
