import { describe, expect, test } from "vitest";
import type { BauratendateiInputDto, WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import type DataTableHeader from "@/types/common/DataTableHeader";
import {
  createBauratendateiInput,
  createHeaders,
  createTableData,
  sumWohneinheitenOfBauratendateiInput,
} from "@/utils/BauratendateiUtils";

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
  "foerderart1",
  "foerderart1",
  "foerderart2",
];

describe("BauratendateiUtils.spec.ts", () => {
  test("Transformation bauratendateiInput in Header", () => {
    const result = createHeaders(foerderartenBauratendateiInputBasis);
    const expected: Array<DataTableHeader> = [
      {
        title: "Jahr",
        key: "jahr",
        align: "start",
        width: "10%",
      },
      {
        title: "foerderart1",
        sortable: false,
        key: "foerderart1",
        align: "start",
      },
      {
        title: "foerderart2",
        sortable: false,
        key: "foerderart2",
        align: "start",
      },
      {
        title: "foerderart3",
        sortable: false,
        key: "foerderart3",
        align: "start",
      },
      {
        title: "foerderart4",
        sortable: false,
        key: "foerderart4",
        align: "start",
      },
      {
        title: "Gesamt",
        sortable: false,
        key: "gesamt",
        align: "start",
      },
      {
        align: "end",
        sortable: false,
        title: "",
        key: "actions",
        width: "10%",
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput undefined in Header", () => {
    const result = createHeaders(undefined);
    const expected: Array<DataTableHeader> = [
      {
        title: "Jahr",
        key: "jahr",
        align: "start",
        width: "10%",
      },
      {
        title: "Gesamt",
        sortable: false,
        key: "gesamt",
        align: "start",
      },
      {
        align: "end",
        sortable: false,
        title: "",
        key: "actions",
        width: "10%",
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput in Table Data", () => {
    const result = createTableData(bauratendateiInput);
    const expected: Array<any> = [
      {
        index: 0,
        jahr: "2024",
        foerderart1: 10,
        foerderart2: 11,
        foerderart3: 12,
        foerderart4: 13,
        gesamt: 46,
      },
      {
        index: 1,
        jahr: "2025",
        foerderart1: 20,
        foerderart2: 21,
        foerderart3: 22,
        foerderart4: 23,
        gesamt: 86,
      },
      {
        index: 2,
        jahr: "2026",
        foerderart1: 30,
        gesamt: 30,
      },
    ];
    expect(result).toEqual(expected);
  });

  test("Transformation bauratendateiInput undefined in Table Data", () => {
    const result = createTableData(undefined);
    const expected: Array<any> = [];
    expect(result).toEqual(expected);
  });

  test("Transformation Table Data to WohneinheitenProFoerderartProJahrDto", () => {
    const tableData: Array<any> = [
      {
        index: 0,
        jahr: "2024",
        foerderart1: 10,
        foerderart2: 11,
        foerderart3: 12,
        foerderart4: 13,
        gesamt: 46,
      },
      {
        index: 1,
        jahr: "2025",
        foerderart1: 20,
        foerderart2: 21,
        foerderart3: 22,
        foerderart4: 23,
        gesamt: 86,
      },
      {
        index: 2,
        jahr: "2026",
        foerderart1: 30,
        gesamt: 30,
      },
    ];
    const result = createBauratendateiInput(tableData);
    expect(result).toEqual(bauratendateiInput);
  });

  test("Transformation empty Table Data to WohneinheitenProFoerderartProJahrDto", () => {
    const result = createBauratendateiInput([]);
    const expected: Array<WohneinheitenProFoerderartProJahrDto> = [];
    expect(result).toEqual(expected);
  });

  test("sumWohneinheitenOfBauratendateiInput with BauratendateiInput", () => {
    const bauratendateiInputs = [
      {
        wohneinheiten: [
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
        ],
      } as BauratendateiInputDto,
      {
        wohneinheiten: [
          {
            jahr: "2024",
            foerderart: "foerderart4",
            wohneinheiten: 2,
          },
          {
            jahr: "2024",
            foerderart: "foerderart3",
            wohneinheiten: 8,
          },
        ],
      } as BauratendateiInputDto,
      {
        wohneinheiten: [
          {
            jahr: "2026",
            foerderart: "foerderart2",
            wohneinheiten: 9,
          },
        ],
      } as BauratendateiInputDto,
    ];
    const result = sumWohneinheitenOfBauratendateiInput(bauratendateiInputs);
    const expected = new Map<string, number>();
    expected.set("2024_foerderart3", 8);
    expected.set("2024_foerderart4", 15);
    expected.set("2025_foerderart1", 20);
    expected.set("2026_foerderart2", 9);
    expect(result).toEqual(expected);
  });

  test("sumWohneinheitenOfBauratendateiInput with empty BauratendateiInput", () => {
    const result = sumWohneinheitenOfBauratendateiInput([]);
    const expected = new Map<string, number>();
    expect(result).toEqual(expected);
  });
});
