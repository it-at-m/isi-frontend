import { describe, expect, test } from "vitest";
import { InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum as Typ } from "@/api/api-client/isi-backend";
import {
  type InfrastruktureinrichtungRollen,
  isInfrastruktureinrichtungEditable,
} from "@/utils/InfrastruktureinrichtungUtil";

const KEINE: InfrastruktureinrichtungRollen = {
  isAdmin: false,
  isInfrastruktureinrichtungSchreibend: false,
  isBedarfsmeldungSozialplanung: false,
};

describe("InfrastruktureinrichtungUtil.spec.ts", () => {
  test("ohne schreibende Rolle, z. B. als Sachbearbeitung, ist keine Einrichtung bearbeitbar oder neu anlegbar", () => {
    expect(isInfrastruktureinrichtungEditable(KEINE, true, undefined)).toBe(false);
    expect(isInfrastruktureinrichtungEditable(KEINE, false, Typ.Kinderkrippe)).toBe(false);
    expect(isInfrastruktureinrichtungEditable(KEINE, false, Typ.Nachbarschaftstreff)).toBe(false);
  });

  test("Administratoren bearbeiten alle Einrichtungen", () => {
    const admin = { ...KEINE, isAdmin: true };
    expect(isInfrastruktureinrichtungEditable(admin, true, undefined)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(admin, false, Typ.Kinderkrippe)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(admin, false, Typ.Nachbarschaftstreff)).toBe(true);
  });

  test("schreibende Bedarfsmeldungsrollen bearbeiten alle Einrichtungen außer Nachbarschaftstreffs", () => {
    const schreibend = { ...KEINE, isInfrastruktureinrichtungSchreibend: true };
    expect(isInfrastruktureinrichtungEditable(schreibend, true, undefined)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(schreibend, false, Typ.Grundschule)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(schreibend, false, Typ.Nachbarschaftstreff)).toBe(false);
  });

  test("die Bedarfsmeldung Sozialplanung bearbeitet ausschließlich Nachbarschaftstreffs", () => {
    const sozialplanung = { ...KEINE, isBedarfsmeldungSozialplanung: true };
    expect(isInfrastruktureinrichtungEditable(sozialplanung, true, undefined)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(sozialplanung, false, Typ.Nachbarschaftstreff)).toBe(true);
    expect(isInfrastruktureinrichtungEditable(sozialplanung, false, Typ.Kindergarten)).toBe(false);
  });
});
