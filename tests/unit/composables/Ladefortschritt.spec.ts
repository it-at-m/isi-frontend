import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLadefortschritt } from "@/composables/Ladefortschritt";

describe("useLadefortschritt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("ist initial inaktiv ohne Fortschritt", () => {
    const fortschritt = useLadefortschritt(4);
    expect(fortschritt.status.value).toBe("inaktiv");
    expect(fortschritt.prozent.value).toBe(0);
  });

  it("zählt erfolgreiche Schritte und berechnet den Prozentwert", async () => {
    const fortschritt = useLadefortschritt(4);
    fortschritt.starte();
    expect(fortschritt.status.value).toBe("laedt");

    const ergebnis = await fortschritt.schritt(Promise.resolve("a"));
    await fortschritt.schritt(Promise.resolve("b"));

    expect(ergebnis).toBe("a");
    expect(fortschritt.erledigteSchritte.value).toBe(2);
    expect(fortschritt.prozent.value).toBe(50);
  });

  it("zählt fehlgeschlagene Schritte mit und reicht den Fehler weiter", async () => {
    const fortschritt = useLadefortschritt(2);
    fortschritt.starte();

    await expect(fortschritt.schritt(Promise.reject(new Error("Fehler")))).rejects.toThrow("Fehler");
    expect(fortschritt.erledigteSchritte.value).toBe(1);
  });

  it("zeigt den Abschluss an und wird nach der Anzeigedauer wieder inaktiv", () => {
    const fortschritt = useLadefortschritt(3, 1000);
    fortschritt.starte();
    fortschritt.beende();

    expect(fortschritt.status.value).toBe("abgeschlossen");
    expect(fortschritt.prozent.value).toBe(100);

    vi.advanceTimersByTime(999);
    expect(fortschritt.status.value).toBe("abgeschlossen");
    vi.advanceTimersByTime(1);
    expect(fortschritt.status.value).toBe("inaktiv");
  });

  it("meldet einen unvollständigen Abschluss", () => {
    const fortschritt = useLadefortschritt(3);
    fortschritt.starte();
    fortschritt.beende(false);
    expect(fortschritt.status.value).toBe("unvollstaendig");
  });

  it("setzt beim erneuten Start Fortschritt zurück und verhindert das Ausblenden durch den alten Timer", async () => {
    const fortschritt = useLadefortschritt(2, 1000);
    fortschritt.starte();
    fortschritt.beende();

    fortschritt.starte();
    expect(fortschritt.erledigteSchritte.value).toBe(0);
    vi.advanceTimersByTime(1000);
    expect(fortschritt.status.value).toBe("laedt");
  });

  it("wird beim Abbruch sofort inaktiv", () => {
    const fortschritt = useLadefortschritt(2);
    fortschritt.starte();
    fortschritt.brecheAb();
    expect(fortschritt.status.value).toBe("inaktiv");
  });
});
