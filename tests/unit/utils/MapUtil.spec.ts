import { describe, expect, test } from "vitest";
import { SCHULSPRENGEL_ABFRAGE_AKTIV, isSchulsprengelNichtVerfuegbar } from "@/utils/MapUtil";

describe("MapUtil isSchulsprengelNichtVerfuegbar", () => {
  test("Schulsprengel-Abfrage ist vorübergehend deaktiviert", () => {
    expect(SCHULSPRENGEL_ABFRAGE_AKTIV).toBe(false);
  });

  test("returns true for Verortung ohne Schulsprengel", () => {
    expect(isSchulsprengelNichtVerfuegbar(0, 1)).toBe(true);
  });

  test("returns false if Schulsprengel vorhanden sind", () => {
    expect(isSchulsprengelNichtVerfuegbar(2, 1)).toBe(false);
  });

  test("returns false if noch keine Verortung vorhanden ist", () => {
    expect(isSchulsprengelNichtVerfuegbar(0, 0)).toBe(false);
  });
});
