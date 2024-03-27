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
    foerderart: "forderart2",
    wohneinheiten: 11,
  },
  {
    jahr: "2024",
    foerderart: "forderart3",
    wohneinheiten: 12,
  },
  {
    jahr: "2024",
    foerderart: "forderart4",
    wohneinheiten: 13,
  },
  {
    jahr: "2025",
    foerderart: "foerderart1",
    wohneinheiten: 20,
  },
  {
    jahr: "2025",
    foerderart: "forderart2",
    wohneinheiten: 21,
  },
  {
    jahr: "2025",
    foerderart: "forderart3",
    wohneinheiten: 22,
  },
  {
    jahr: "2025",
    foerderart: "forderart4",
    wohneinheiten: 23,
  },
  {
    jahr: "2026",
    foerderart: "foerderart1",
    wohneinheiten: 30,
  },
];

describe("SpreadsheetBauratendateiInput.spec.ts", () => {
  test("Transformation bauratendateiInput in Header", () => {
    let result = createHeaders(bauratendateiInput);
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
        text: "forderart2",
        value: "forderart2",
        align: "start",
      },
      {
        text: "forderart3",
        value: "forderart3",
        align: "start",
      },
      {
        text: "forderart4",
        value: "forderart4",
        align: "start",
      },
    ];
    expect(result).toEqual(expected);
  });
});
