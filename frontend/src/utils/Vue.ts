import { WritableComputedRef } from "vue";

interface Props<T> {
  value: T;
}

interface Emits<T> {
  (event: "input", value: T): void;
}

/**
 * Ein Workaround für das fehlende defineModel() von Vue 3.4+.
 * Um das Ergebnis zu verändern, muss es immer komplett überschrieben werden.
 *
 * @param props Die Props der Komponente. Diese müssen ein Feld namens `value` haben.
 * @param emit Die Emits der Komponente. Diese müssen einen Emit für `input` haben, welcher einen Wert vom Typ von `value` emittet.
 * @returns Ein WritableComputedRef, welches `value` referenziert, aber nicht überschreibt.
 */
export function defineModel<T>(props: Props<T>, emit: Emits<T>): WritableComputedRef<T> {
  return computed({
    get() {
      return props.value;
    },
    set(value: T) {
      emit("input", value);
    },
  });
}
