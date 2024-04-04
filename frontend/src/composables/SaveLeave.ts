import type { NavigationGuardNext } from "vue-router";

import { onBeforeRouteLeave } from "vue-router/composables";
import { useCommonStore } from "@/stores/CommonStore";

/**
 * Mit dem SaveLeaveComposable kann ein Datenverlust durch ungewolltest Navigieren verhindert werden.
 *
 * Nimmt eine Funktion `isDirty()` entgegen, in der festgelegt werden kann,
 * ob sicher navigiert werden kann oder eine Rückfrage an den Nutzer stattfinden soll.
 * Diese Rückfrage kann z.B. über einen Dialog gelöst werden. Hierzu bietet das SaveLeaveComposable
 * ein `saveLeaveDialog` Flag an. Für genererische Dialoge bietet das SaveLeaveComposable bereits Titel und
 * Text mit an.
 *
 * Mit dem Aufruf von `leave()` oder `cancel()` kann die Entscheidung des Nutzers ausgeführt werden.
 */
// eslint-disable-next-line
export function useSaveLeave() {
  const commonStore = useCommonStore();
  const saveLeaveDialogTitle = "Hinweis";
  const saveLeaveNoText = "Abbrechen";
  const saveLeaveYesText = "Verlassen";
  const saveLeaveDialogText = computed(() => {
    let place = "";
    if (isCommentDirty()) {
      place = " in den Kommentaren";
    }
    if (isFormDirty()) {
      place = " im Formular";
    }
    return `Es wurden Änderungen${place} vorgenommen, die beim Verlassen der Seite verloren gehen.`;
  });
  const saveLeaveDialog = ref(false);
  const nextRoute = ref<NavigationGuardNext | null>(null);

  // eslint-disable-next-line
  onBeforeRouteLeave((to: any, from: any, next: NavigationGuardNext) => {
    if (isFormDirty() || isCommentDirty()) {
      saveLeaveDialog.value = true;
      nextRoute.value = next;
    } else {
      saveLeaveDialog.value = false;
      next();
    }
  });

  function cancel(): void {
    saveLeaveDialog.value = false;
    if (nextRoute.value != null) {
      nextRoute.value(false);
    }
  }

  function leave(): void {
    if (nextRoute.value != null) {
      resetFormDirty();
      resetCommentDirty();
      nextRoute.value();
    }
  }

  function isFormDirty(): boolean {
    return commonStore.formDirty;
  }

  function formChanged(): void {
    commonStore.formChanged();
  }

  function resetFormDirty(): void {
    commonStore.resetFormDirty();
  }

  function isCommentDirty(): boolean {
    return commonStore.commentDirty;
  }

  function commentChanged(): void {
    commonStore.commentChanged();
  }

  function resetCommentDirty(): void {
    commonStore.resetCommentDirty();
  }

  return {
    saveLeaveDialogTitle,
    saveLeaveNoText,
    saveLeaveYesText,
    saveLeaveDialogText,
    saveLeaveDialog,
    nextRoute,
    cancel,
    leave,
    isFormDirty,
    formChanged,
    resetFormDirty,
    isCommentDirty,
    commentChanged,
    resetCommentDirty,
  };
}
