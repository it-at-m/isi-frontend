import { Component, Vue } from "vue-property-decorator";

/**
 * Mit dem SaveLeave Mixin kann ein Datenverlust durch ungewolltest Navigieren verhindert werden.
 *
 * Das Mixin lässt sich über die Mixins Funktion vom `vue-property-decorator` einbinden.
 *
 * Anschließend kann mittels des Überschreibens der `isDirty()` Methode festgelegt werden,
 * ob sicher navigiert werden kann oder eine Rückfrage an den Nutzer stattfinden soll.
 * Diese Rückfrage kann z.B. über einen Dialog gelöst werden. Hierzu bietet das SaveLeaveMixin
 * ein `saveLeaveDialog` Flag an. Für genererische Dialoge bietet das SaveLeaveMixin bereits Titel und
 * Text mit an.
 *
 * Mit dem Aufruf von `leave()` oder `cancel()` kann die Entscheidung des Nutzers ausgeführt werden.
 */
Component.registerHooks(["beforeRouteLeave"]);
@Component
export default class SaveLeaveMixin extends Vue {
  name = "saveLeaveMixin";

  saveLeaveDialogTitle = "Hinweis";
  saveLeaveDialogText =
    "Es sind ungespeicherte Änderungen vorhanden, die beim Verlassen der Seite verloren gehen werden.";
  saveLeaveNoText = "Abbrechen";
  saveLeaveYesText = "Verlassen";
  saveLeaveDialog = false;
  // eslint-disable-next-line
  next: any = null;

  // eslint-disable-next-line
  beforeRouteLeave(to: any, from: any, next: any): void {
    if (this.isDirty()) {
      this.saveLeaveDialog = true;
      this.next = next;
    } else {
      this.saveLeaveDialog = false;
      next();
    }
  }

  cancel(): void {
    this.saveLeaveDialog = false;
    this.next(false);
  }

  leave(): void {
    this.resetDirty();
    this.next();
  }

  public isDirty(): boolean {
    return this.$store.getters["common/isDirty"];
  }

  public formChanged(): void {
    this.$store.dispatch("common/formChanged");
  }

  public resetDirty(): void {
    this.$store.dispatch("common/resetDirty");
  }
}
