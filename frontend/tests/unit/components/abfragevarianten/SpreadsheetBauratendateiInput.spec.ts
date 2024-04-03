import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import { createHeaders, createTableData } from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";
import { DataTableHeader } from "vuetify";

const bauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> = [
  {
    jahr: "2024",
    foerderart: "foerderart1",
    wohneinheiten: 10,
  },
  {
    jahr: "2024",
    foerderart: "foerderart2",
    wohneinheiten: 11,
  },
  {
    jahr: "2024",
    foerderart: "foerderart3",
    wohneinheiten: 12,
  },
  {
    jahr: "2024",
    foerderart: "foerderart4",
    wohneinheiten: 13,
  },
  {
    jahr: "2025",
    foerderart: "foerderart1",
    wohneinheiten: 20,
  },
  {
    jahr: "2025",
    foerderart: "foerderart2",
    wohneinheiten: 21,
  },
  {
    jahr: "2025",
    foerderart: "foerderart3",
    wohneinheiten: 22,
  },
  {
    jahr: "2025",
    foerderart: "foerderart4",
    wohneinheiten: 23,
  },
  {
    jahr: "2026",
    foerderart: "foerderart1",
    wohneinheiten: 30,
  },
];

const foerderartenBauratendateiInputBasis: Array<string> = [
  "foerderart1",
  "foerderart2",
  "foerderart3",
  "foerderart4",
  "foerderart1",
];

describe("SpreadsheetBauratendateiInput.spec.ts", () => {
  test("Transformation bauratendateiInput in Header", () => {
    let result = createHeaders(foerderartenBauratendateiInputBasis);
    let expected: Array<DataTableHeader> = [
      {
        text: "Jahr",
        value: "jahr",
        align: "start",
      },
      {
        text: "foerderart1",
        value: "foerderart1",
        align: "start",
      },
      {
        text: "foerderart2",
        value: "foerderart2",
        align: "start",
      },
      {
        text: "foerderart3",
        value: "foerderart3",
        align: "start",
      },
      {
        text: "foerderart4",
        value: "foerderart4",
        align: "start",
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput undefined in Header", () => {
    let result = createHeaders(undefined);
    let expected: Array<DataTableHeader> = [
      {
        align: "start",
        text: "Jahr",
        value: "jahr",
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput in Table Data", () => {
    let result = createTableData(bauratendateiInput);
    let expected: Array<any> = [
      {
        jahr: "2024",
        foerderart1: 10,
        foerderart2: 11,
        foerderart3: 12,
        foerderart4: 13,
      },
      {
        jahr: "2025",
        foerderart1: 20,
        foerderart2: 21,
        foerderart3: 22,
        foerderart4: 23,
      },
      {
        jahr: "2026",
        foerderart1: 30,
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput undefined in Table Data", () => {
    let result = createTableData(undefined);
    let expected: Array<any> = [];
    expect(result).toEqual(expected);
  });
});
