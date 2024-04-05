import { Component, Vue } from "vue-property-decorator";
import { useCommonStore } from "@/stores/CommonStore";
/**
 * Mit dem SaveLeave Mixin kann ein Datenverlust durch ungewolltest Navigieren verhindert werden.
 *
 * Das Mixin lässt sich über die Mixins Funktion vom `vue-property-decorator` einbinden.
 *
 * Anschließend kann mittels des Überschreibens der `isFormDirty()` bzw. `isCommentDirty()` Methode festgelegt werden,
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
  saveLeaveNoText = "Abbrechen";
  saveLeaveYesText = "Verlassen";
  saveLeaveDialog = false;
  // eslint-disable-next-line
  next: any = null;

  commonStore = useCommonStore();

  get saveLeaveDialogText(): string {
    let place = "";

    if (this.isCommentDirty()) {
      place = " in den Kommentaren";
    }
    if (this.isFormDirty()) {
      place = " im Formular";
    }

    return `Es wurden Änderungen${place} vorgenommen, die beim Verlassen der Seite verloren gehen.`;
  }

  // eslint-disable-next-line
  beforeRouteLeave(to: any, from: any, next: any): void {
    if (this.isFormDirty() || this.isCommentDirty()) {
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
    this.resetFormDirty();
    this.resetCommentDirty();
    this.next();
  }

  public isFormDirty(): boolean {
    return this.commonStore.formDirty;
  }

  public formChanged(): void {
    this.commonStore.formChanged();
  }

  public resetFormDirty(): void {
    this.commonStore.resetFormDirty();
  }

  public isCommentDirty(): boolean {
    return this.commonStore.commentDirty;
  }

  public commentChanged(): void {
    this.commonStore.commentChanged();
  }

  public resetCommentDirty(): void {
    this.commonStore.resetCommentDirty();
  }
}
