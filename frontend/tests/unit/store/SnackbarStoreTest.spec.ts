import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSnackbarStore } from "@/stores/SnackbarStore";
import { Levels } from "@/api/error";

describe("Snackbar Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("setMessage updates the message correctly", () => {
    const snackbarStore = useSnackbarStore();
    const newMessage = "Test message";
    snackbarStore.setMessage(newMessage);
    expect(snackbarStore.message).toBe(newMessage);
  });

  it("setLevel updates the level correctly", () => {
    const snackbarStore = useSnackbarStore();
    snackbarStore.setLevel(Levels.ERROR);
    expect(snackbarStore.level).toBe(Levels.ERROR);
  });

  it("setShow updates the show state correctly", () => {
    const snackbarStore = useSnackbarStore();
    snackbarStore.setShow(true);
    expect(snackbarStore.show).toBe(true);
    snackbarStore.setShow(false);
    expect(snackbarStore.show).toBe(false);
  });

  it("showMessage sets message, level, and show correctly", () => {
    const snackbarStore = useSnackbarStore();
    const testMessage = "This is a test message";
    snackbarStore.setLevel(Levels.WARNING);
    snackbarStore.showMessage(testMessage);

    expect(snackbarStore.message).toBe(testMessage);
    expect(snackbarStore.level).toBe(Levels.WARNING); // Bestätigt, dass der Level beibehalten wird, wenn vorher gesetzt
    expect(snackbarStore.show).toBe(true);
  });

  it("showMessage defaults to INFO level if no level set", () => {
    const nullValue: unknown = undefined;
    const snackbarStore = useSnackbarStore();
    const testMessage = "Another test message";
    snackbarStore.setLevel(nullValue as Levels);
    snackbarStore.showMessage(testMessage);

    expect(snackbarStore.message).toBe(testMessage);
    expect(snackbarStore.level).toBe(Levels.INFO); // Bestätigt, dass der Standardwert INFO ist
    expect(snackbarStore.show).toBe(true);
  });
});
