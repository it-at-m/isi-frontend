import { describe, expect, test } from "vitest";
import { isGeodatenNichtVerfuegbar } from "@/utils/MapUtil";

describe("MapUtil isGeodatenNichtVerfuegbar", () => {
  test("returns true if Verortung vorhanden, aber keine Geodaten des Feldes", () => {
    expect(isGeodatenNichtVerfuegbar(0, true)).toBe(true);
  });

  test("returns false if Geodaten vorhanden sind", () => {
    expect(isGeodatenNichtVerfuegbar(2, true)).toBe(false);
  });

  test("returns false if noch keine Verortung vorhanden ist", () => {
    expect(isGeodatenNichtVerfuegbar(0, false)).toBe(false);
  });
});
