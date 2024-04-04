import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import { DataTableHeader } from "vuetify";
import _ from "lodash";

export function createHeaders(foerderartenBauratendateiInputBasis: Array<string> | undefined): Array<DataTableHeader> {
  const headers = createHeadersForFoerderarten(foerderartenBauratendateiInputBasis);
  const headerForJahr = {
    text: "Jahr",
    value: "jahr",
    align: "start",
    width: "10%",
  } as DataTableHeader;
  headers.unshift(headerForJahr);
  const headerForActions = {
    text: "",
    value: "actions",
    sortable: false,
    align: "end",
    width: "10%",
  } as DataTableHeader;
  headers.push(headerForActions);
  return headers;
}

export function createHeadersForFoerderarten(
  foerderartenBauratendateiInputBasis: Array<string> | undefined,
): Array<DataTableHeader> {
  return _.uniq(_.toArray(foerderartenBauratendateiInputBasis)).map((headerFoerderart) => {
    return {
      text: headerFoerderart,
      value: headerFoerderart,
      align: "start",
    } as DataTableHeader;
  });
}

export function createTableData(
  bauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> | undefined,
): Array<any> {
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
   *   foerderartX: 2385
   * }
   */
  let index = 0;
  const tableDataObjects: Array<any> = [];
  jahrWithWohneinheitenForEachFoerderart.forEach((foerderartenWithWohneinheiten, jahr) => {
    const tableEntry = new Map<string | undefined, string | number | undefined>();
    tableEntry.set("jahr", jahr);
    tableEntry.set("index", index++);
    foerderartenWithWohneinheiten.forEach((wohneinheiten, forderart) => {
      tableEntry.set(forderart, wohneinheiten);
    });
    tableDataObjects.push(Object.fromEntries(tableEntry.entries()));
  });
  return tableDataObjects;
}

/**
 *
 */
export function createBauratendateiInput(tableData: Array<any>): Array<WohneinheitenProFoerderartProJahrDto> {
  const newBauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> = [];
  tableData.forEach((tableEntry) => {
    const tableEntryMap = new Map(Object.entries(tableEntry));
    const jahr: string | undefined = tableEntryMap.get("jahr") as string | undefined;
    tableEntryMap.delete("jahr");
    tableEntryMap.forEach((wohneinheiten, foerderart) => {
      const wohneinheitenProFoerderartProJahr = {
        jahr: jahr,
        foerderart: foerderart,
        wohneinheiten: wohneinheiten,
      } as WohneinheitenProFoerderartProJahrDto;
      newBauratendateiInput.push(wohneinheitenProFoerderartProJahr);
    });
  });
  return newBauratendateiInput;
}
