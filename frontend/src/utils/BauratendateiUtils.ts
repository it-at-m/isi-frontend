import type { BauratendateiInputDto, WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import type { DataTableHeader } from "@/types/common/DataTableHeader";
import _ from "lodash";

export const ATTRIBUTE_KEY_JAHR = "jahr";

export const ATTRIBUTE_HEADER_VALUE_JAHR = "Jahr";

export const ATTRIBUTE_KEY_GESAMT = "gesamt";

export const ATTRIBUTE_KEY_INDEX = "index";

export const ROUNDING_PRECISION = 2;

export const JAHR_FOERDERART_SEPERATOR = "_";

export function createHeaders(foerderartenBauratendateiInputBasis: Array<string> | undefined): Array<DataTableHeader> {
  const headers = createHeadersForFoerderarten(foerderartenBauratendateiInputBasis);
  const headerForJahr: DataTableHeader = {
    title: ATTRIBUTE_HEADER_VALUE_JAHR,
    key: ATTRIBUTE_KEY_JAHR,
    align: "start",
    width: "10%",
  };
  headers.unshift(headerForJahr);
  const headerForGesamt: DataTableHeader = {
    title: "Gesamt",
    key: "gesamt",
    sortable: false,
    align: "start",
  };
  headers.push(headerForGesamt);
  const headerForActions: DataTableHeader = {
    title: "",
    key: "actions",
    sortable: false,
    align: "end",
    width: "10%",
  };
  headers.push(headerForActions);
  return headers;
}

export function createHeadersForFoerderarten(
  foerderartenBauratendateiInputBasis: Array<string> | undefined,
): Array<DataTableHeader> {
  return _.uniq(_.toArray(foerderartenBauratendateiInputBasis)).map((headerFoerderart) => {
    return {
      title: headerFoerderart,
      key: headerFoerderart,
      align: "start",
    };
  });
}

/**
 * Transformiert die WohneinheitenProFoerderartProJahrDtos in Tabellendaten.
 *
 *
 * Gegebenen WohneinheitenProFoerderartProJahrDtos:
 * [
 *   {
 *     jahr: "2024",
 *     foerderart: "foerderart1"
 *     wohneinheiten: 1000
 *   },
 *   ...
 *   {
 *     jahr: "2024",
 *     foerderart: "foerderartX"
 *     wohneinheiten: 2385
 *   }
 * ]
 *
 * -> wird zu ->
 *
 * {
 *   jahr: 2024,
 *   foerderart1: 1000,
 *   ...
 *   foerderartX: 2385
 * }
 */
export function createTableData(
  bauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> | undefined,
): Array<unknown> {
  /**
   * Ermittlung der Wohneinheiten je Förderart je Jahr.
   */
  const jahrWithWohneinheitenForEachFoerderart = new Map<
    string | undefined,
    Map<string | undefined, number | undefined>
  >();
  for (const input of _.toArray(bauratendateiInput)) {
    if (jahrWithWohneinheitenForEachFoerderart.has(input.jahr)) {
      const foerderartWithWohneinheit = jahrWithWohneinheitenForEachFoerderart.get(input.jahr);
      if (!_.isNil(foerderartWithWohneinheit)) {
        foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
      }
    } else {
      const foerderartWithWohneinheit = new Map<string | undefined, number | undefined>();
      foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
      jahrWithWohneinheitenForEachFoerderart.set(input.jahr, foerderartWithWohneinheit);
    }
  }
  /**
   * Überführen der obig ermittelten Wohneinheiten je Förderart je Jahr in Objekte.
   *
   * {
   *   jahr: 2024,
   *   foerderart1: 1000,
   *   ...
   *   foerderartX: 2385,
   *   gesamt: 10385
   * }
   */
  let index = 0;
  const tableDataObjects: Array<unknown> = [];
  jahrWithWohneinheitenForEachFoerderart.forEach((foerderartenWithWohneinheiten, jahr) => {
    const tableEntry = new Map<string | undefined, string | number | undefined>();
    tableEntry.set(ATTRIBUTE_KEY_JAHR, jahr);
    tableEntry.set(ATTRIBUTE_KEY_INDEX, index++);
    let gesamtWohneinheiten = 0;
    foerderartenWithWohneinheiten.forEach((wohneinheiten, forderart) => {
      tableEntry.set(forderart, wohneinheiten);
      gesamtWohneinheiten = gesamtWohneinheiten + (_.isNil(wohneinheiten) ? 0 : wohneinheiten);
    });
    tableEntry.set(ATTRIBUTE_KEY_GESAMT, gesamtWohneinheiten);
    tableDataObjects.push(Object.fromEntries(tableEntry.entries()));
  });
  return tableDataObjects;
}

/**
 * Erstellt aus den in der Tabelle gegebenen Daten die WohneinheitenProFoerderartProJahrDtos.
 *
 * Ein Element aus Array der Tabellendaten:
 * {
 *   jahr: 2024,
 *   foerderart1: 1000,
 *   ...
 *   foerderartX: 2385,
 *   gesamt: 10385
 * }
 *
 * -> wird zu ->
 *
 * WohneinheitenProFoerderartProJahrDtos:
 *[
 *   {
 *     jahr: "2024",
 *     foerderart: "foerderart1"
 *     wohneinheiten: 1000
 *   },
 *   ...
 *   {
 *     jahr: "2024",
 *     foerderart: "foerderartX"
 *     wohneinheiten: 2385
 *   }
 *]
 */
export function createBauratendateiInput(
  tableData: Array<Record<string, unknown>>,
): Array<WohneinheitenProFoerderartProJahrDto> {
  const newBauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> = [];
  _.cloneDeep(tableData).forEach((tableEntry) => {
    const tableEntryMap = new Map(Object.entries(tableEntry));
    const jahr: string | undefined = tableEntryMap.get(ATTRIBUTE_KEY_JAHR) as string | undefined;
    tableEntryMap.delete(ATTRIBUTE_KEY_JAHR);
    tableEntryMap.delete(ATTRIBUTE_KEY_INDEX);
    tableEntryMap.delete(ATTRIBUTE_KEY_GESAMT);
    tableEntryMap.forEach((wohneinheiten, foerderart) => {
      const wohneinheitenProFoerderartProJahr = {
        jahr: jahr,
        foerderart: foerderart,
        wohneinheiten: _.isNil(wohneinheiten) ? 0 : wohneinheiten,
      } as WohneinheitenProFoerderartProJahrDto;
      newBauratendateiInput.push(wohneinheitenProFoerderartProJahr);
    });
  });
  return newBauratendateiInput;
}

/**
 * Summiert die Wohneinheiten je Jahr und Förderart für die gegebenen BauratendateiInputDto.
 *
 * Gibt eine Map mit Key konkateniert aus dem Jahr und der Förderart und dem Value als Summe der Wohneinheiten zurück.
 */
export function sumWohneinheitenOfBauratendateiInput(
  bauratendateiInputs: Array<BauratendateiInputDto>,
): Map<string, number> {
  const sum = new Map<string, number>();
  bauratendateiInputs
    .flatMap((bauratendateiInput) => _.toArray(bauratendateiInput.wohneinheiten))
    .forEach((wohneinheitenProFoerderartProJahr) => {
      const jahrAndFoerderart = (
        _.isNil(wohneinheitenProFoerderartProJahr.jahr) ? "" : wohneinheitenProFoerderartProJahr.jahr
      ).concat(
        JAHR_FOERDERART_SEPERATOR,
        _.isNil(wohneinheitenProFoerderartProJahr.foerderart) ? "" : wohneinheitenProFoerderartProJahr.foerderart,
      );
      const wohneinheiten = _.isNil(wohneinheitenProFoerderartProJahr.wohneinheiten)
        ? 0
        : wohneinheitenProFoerderartProJahr.wohneinheiten;
      if (sum.has(jahrAndFoerderart)) {
        const alreadySavedWohneinheiten = sum.get(jahrAndFoerderart);
        sum.set(
          jahrAndFoerderart,
          (_.isNil(alreadySavedWohneinheiten) ? 0 : alreadySavedWohneinheiten) + wohneinheiten,
        );
      } else {
        sum.set(jahrAndFoerderart, wohneinheiten);
      }
    });
  return sum;
}
