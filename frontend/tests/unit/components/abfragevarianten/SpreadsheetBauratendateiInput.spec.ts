import Service from "@/components/common/Service";
import SpreadsheetBauratendateiInput from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
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
    const result = spreadsheetBauratendateiInput.headersForFoerderarten;
    expect(result).toEqual(2);
  });
});
