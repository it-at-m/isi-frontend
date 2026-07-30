import { describe, expect, test } from "vitest";
import { getAbfrageIcon } from "@/utils/AbfrageIconUtil";
import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";

describe("AbfrageIconUtil", () => {
  test("returns map-outline for Bauleitplanverfahren", () => {
    expect(getAbfrageIcon(AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren)).toBe("mdi-map-outline");
  });

  test("returns floor-plan for Baugenehmigungsverfahren", () => {
    expect(getAbfrageIcon(AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren)).toBe("mdi-floor-plan");
  });

  test("returns notebook-outline for WeiteresVerfahren", () => {
    expect(getAbfrageIcon(AbfrageDtoArtAbfrageEnum.WeiteresVerfahren)).toBe("mdi-notebook-outline");
  });

  test("returns empty string for Unspecified", () => {
    expect(getAbfrageIcon(AbfrageDtoArtAbfrageEnum.Unspecified)).toBe("");
  });

  test("returns empty string for undefined", () => {
    expect(getAbfrageIcon(undefined)).toBe("");
  });

  test("returns empty string for unknown string value", () => {
    expect(getAbfrageIcon("UNKNOWN")).toBe("");
  });
});
