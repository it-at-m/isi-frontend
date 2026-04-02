import { describe, expect, test } from "vitest";
import {
  EntityModelInfrastruktureinrichtungResultTypeEnum,
  EntityModelInfrastruktureinrichtungFromJSON,
  EntityModelInfrastruktureinrichtungToJSON,
  EntityModelInfrastruktureinrichtungInfrastruktureinrichtungTypEnum,
  EntityModelInfrastruktureinrichtungStatusEnum,
} from "@/api/api-client/isi-backend/models/EntityModelInfrastruktureinrichtung";
import {
  InfrastruktureinrichtungRequestBodyResultTypeEnum,
  InfrastruktureinrichtungRequestBodyFromJSON,
  InfrastruktureinrichtungRequestBodyToJSON,
  InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum,
  InfrastruktureinrichtungRequestBodyStatusEnum,
} from "@/api/api-client/isi-backend/models/InfrastruktureinrichtungRequestBody";

describe("EntityModelInfrastruktureinrichtung", () => {
  describe("ResultTypeEnum", () => {
    test("has correct BAUVORHABEN value", () => {
      expect(EntityModelInfrastruktureinrichtungResultTypeEnum.Bauvorhaben).toBe("BAUVORHABEN");
    });

    test("has correct ABFRAGE value", () => {
      expect(EntityModelInfrastruktureinrichtungResultTypeEnum.Abfrage).toBe("ABFRAGE");
    });

    test("has correct INFRASTRUKTUREINRICHTUNG value", () => {
      expect(EntityModelInfrastruktureinrichtungResultTypeEnum.Infrastruktureinrichtung).toBe(
        "INFRASTRUKTUREINRICHTUNG",
      );
    });

    test("has exactly three enum values", () => {
      const values = Object.values(EntityModelInfrastruktureinrichtungResultTypeEnum);
      expect(values).toHaveLength(3);
    });
  });

  describe("FromJSON - resultType field", () => {
    test("parses resultType as enum value from JSON", () => {
      const json = { resultType: "BAUVORHABEN" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBe(EntityModelInfrastruktureinrichtungResultTypeEnum.Bauvorhaben);
    });

    test("parses resultType as ABFRAGE from JSON", () => {
      const json = { resultType: "ABFRAGE" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBe(EntityModelInfrastruktureinrichtungResultTypeEnum.Abfrage);
    });

    test("parses resultType as INFRASTRUKTUREINRICHTUNG from JSON", () => {
      const json = { resultType: "INFRASTRUKTUREINRICHTUNG" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBe(EntityModelInfrastruktureinrichtungResultTypeEnum.Infrastruktureinrichtung);
    });

    test("resultType is undefined when not present in JSON", () => {
      const json = {};
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBeUndefined();
    });

    test("resultType is undefined when null in JSON", () => {
      const json = { resultType: null };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBeUndefined();
    });
  });

  describe("FromJSON - bauvorhabenName field", () => {
    test("parses bauvorhabenName as string from JSON", () => {
      const json = { bauvorhabenName: "Testbauvorhaben" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.bauvorhabenName).toBe("Testbauvorhaben");
    });

    test("bauvorhabenName is undefined when not present in JSON", () => {
      const json = {};
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.bauvorhabenName).toBeUndefined();
    });

    test("bauvorhabenName is undefined when null in JSON", () => {
      const json = { bauvorhabenName: null };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.bauvorhabenName).toBeUndefined();
    });

    test("bauvorhabenName accepts empty string", () => {
      const json = { bauvorhabenName: "" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.bauvorhabenName).toBe("");
    });
  });

  describe("FromJSON - resultType and bauvorhabenName together", () => {
    test("parses both resultType and bauvorhabenName correctly", () => {
      const json = { resultType: "INFRASTRUKTUREINRICHTUNG", bauvorhabenName: "Mein Vorhaben" };
      const result = EntityModelInfrastruktureinrichtungFromJSON(json);
      expect(result.resultType).toBe(EntityModelInfrastruktureinrichtungResultTypeEnum.Infrastruktureinrichtung);
      expect(result.bauvorhabenName).toBe("Mein Vorhaben");
    });

    test("returns null/undefined for null input", () => {
      const result = EntityModelInfrastruktureinrichtungFromJSON(null);
      expect(result).toBeNull();
    });
  });

  describe("ToJSON - resultType and bauvorhabenName fields", () => {
    test("serializes resultType enum value to JSON", () => {
      const entity = {
        resultType: EntityModelInfrastruktureinrichtungResultTypeEnum.Bauvorhaben,
      };
      const result = EntityModelInfrastruktureinrichtungToJSON(entity);
      expect(result.resultType).toBe("BAUVORHABEN");
    });

    test("serializes bauvorhabenName string to JSON", () => {
      const entity = {
        bauvorhabenName: "Test Vorhaben",
      };
      const result = EntityModelInfrastruktureinrichtungToJSON(entity);
      expect(result.bauvorhabenName).toBe("Test Vorhaben");
    });

    test("serializes both resultType and bauvorhabenName", () => {
      const entity = {
        resultType: EntityModelInfrastruktureinrichtungResultTypeEnum.Infrastruktureinrichtung,
        bauvorhabenName: "Kita Nord",
      };
      const result = EntityModelInfrastruktureinrichtungToJSON(entity);
      expect(result.resultType).toBe("INFRASTRUKTUREINRICHTUNG");
      expect(result.bauvorhabenName).toBe("Kita Nord");
    });

    test("returns null/undefined for null input", () => {
      const result = EntityModelInfrastruktureinrichtungToJSON(null);
      expect(result).toBeNull();
    });
  });

  describe("InfrastruktureinrichtungTypEnum", () => {
    test("has UNSPECIFIED value", () => {
      expect(EntityModelInfrastruktureinrichtungInfrastruktureinrichtungTypEnum.Unspecified).toBe("UNSPECIFIED");
    });

    test("has all expected infrastructure types", () => {
      const values = Object.values(EntityModelInfrastruktureinrichtungInfrastruktureinrichtungTypEnum);
      expect(values).toContain("KINDERKRIPPE");
      expect(values).toContain("KINDERGARTEN");
      expect(values).toContain("GRUNDSCHULE");
      expect(values).toContain("MITTELSCHULE");
    });
  });

  describe("StatusEnum", () => {
    test("has BESTAND value", () => {
      expect(EntityModelInfrastruktureinrichtungStatusEnum.Bestand).toBe("BESTAND");
    });

    test("has UNSPECIFIED value", () => {
      expect(EntityModelInfrastruktureinrichtungStatusEnum.Unspecified).toBe("UNSPECIFIED");
    });
  });
});

describe("InfrastruktureinrichtungRequestBody", () => {
  describe("ResultTypeEnum", () => {
    test("has correct BAUVORHABEN value", () => {
      expect(InfrastruktureinrichtungRequestBodyResultTypeEnum.Bauvorhaben).toBe("BAUVORHABEN");
    });

    test("has correct ABFRAGE value", () => {
      expect(InfrastruktureinrichtungRequestBodyResultTypeEnum.Abfrage).toBe("ABFRAGE");
    });

    test("has correct INFRASTRUKTUREINRICHTUNG value", () => {
      expect(InfrastruktureinrichtungRequestBodyResultTypeEnum.Infrastruktureinrichtung).toBe(
        "INFRASTRUKTUREINRICHTUNG",
      );
    });

    test("has exactly three enum values", () => {
      const values = Object.values(InfrastruktureinrichtungRequestBodyResultTypeEnum);
      expect(values).toHaveLength(3);
    });
  });

  describe("FromJSON - resultType field", () => {
    test("parses resultType as enum value from JSON", () => {
      const json = { resultType: "BAUVORHABEN" };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.resultType).toBe(InfrastruktureinrichtungRequestBodyResultTypeEnum.Bauvorhaben);
    });

    test("parses resultType as INFRASTRUKTUREINRICHTUNG from JSON", () => {
      const json = { resultType: "INFRASTRUKTUREINRICHTUNG" };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.resultType).toBe(InfrastruktureinrichtungRequestBodyResultTypeEnum.Infrastruktureinrichtung);
    });

    test("resultType is undefined when not present in JSON", () => {
      const json = {};
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.resultType).toBeUndefined();
    });

    test("resultType is undefined when null in JSON", () => {
      const json = { resultType: null };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.resultType).toBeUndefined();
    });
  });

  describe("FromJSON - bauvorhabenName field", () => {
    test("parses bauvorhabenName as string from JSON", () => {
      const json = { bauvorhabenName: "Mustervorhaben" };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.bauvorhabenName).toBe("Mustervorhaben");
    });

    test("bauvorhabenName is undefined when not present in JSON", () => {
      const json = {};
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.bauvorhabenName).toBeUndefined();
    });

    test("bauvorhabenName is undefined when null in JSON", () => {
      const json = { bauvorhabenName: null };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.bauvorhabenName).toBeUndefined();
    });
  });

  describe("FromJSON - resultType and bauvorhabenName together", () => {
    test("parses both resultType and bauvorhabenName correctly", () => {
      const json = { resultType: "ABFRAGE", bauvorhabenName: "Projekt Süd" };
      const result = InfrastruktureinrichtungRequestBodyFromJSON(json);
      expect(result.resultType).toBe(InfrastruktureinrichtungRequestBodyResultTypeEnum.Abfrage);
      expect(result.bauvorhabenName).toBe("Projekt Süd");
    });

    test("returns null/undefined for null input", () => {
      const result = InfrastruktureinrichtungRequestBodyFromJSON(null);
      expect(result).toBeNull();
    });
  });

  describe("ToJSON - resultType and bauvorhabenName fields", () => {
    test("serializes resultType enum value to JSON", () => {
      const body = {
        resultType: InfrastruktureinrichtungRequestBodyResultTypeEnum.Abfrage,
      };
      const result = InfrastruktureinrichtungRequestBodyToJSON(body);
      expect(result.resultType).toBe("ABFRAGE");
    });

    test("serializes bauvorhabenName string to JSON", () => {
      const body = {
        bauvorhabenName: "Grundschule West",
      };
      const result = InfrastruktureinrichtungRequestBodyToJSON(body);
      expect(result.bauvorhabenName).toBe("Grundschule West");
    });

    test("serializes both resultType and bauvorhabenName", () => {
      const body = {
        resultType: InfrastruktureinrichtungRequestBodyResultTypeEnum.Bauvorhaben,
        bauvorhabenName: "Hort Ost",
      };
      const result = InfrastruktureinrichtungRequestBodyToJSON(body);
      expect(result.resultType).toBe("BAUVORHABEN");
      expect(result.bauvorhabenName).toBe("Hort Ost");
    });

    test("returns null/undefined for null input", () => {
      const result = InfrastruktureinrichtungRequestBodyToJSON(null);
      expect(result).toBeNull();
    });
  });

  describe("InfrastruktureinrichtungTypEnum", () => {
    test("has UNSPECIFIED value", () => {
      expect(InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum.Unspecified).toBe("UNSPECIFIED");
    });

    test("has all expected infrastructure types", () => {
      const values = Object.values(InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum);
      expect(values).toContain("KINDERKRIPPE");
      expect(values).toContain("KINDERGARTEN");
      expect(values).toContain("GRUNDSCHULE");
      expect(values).toContain("MITTELSCHULE");
    });
  });

  describe("StatusEnum", () => {
    test("has BESTAND value", () => {
      expect(InfrastruktureinrichtungRequestBodyStatusEnum.Bestand).toBe("BESTAND");
    });

    test("has UNSPECIFIED value", () => {
      expect(InfrastruktureinrichtungRequestBodyStatusEnum.Unspecified).toBe("UNSPECIFIED");
    });
  });
});