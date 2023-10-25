import Vuex from "vuex";
import Vue from "vue";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import StammdatenStore, { StammdatenState } from "@/store/modules/StammdatenStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";

describe("SaveLeaveMixin Test", () => {
  Vue.use(Vuex);

  interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
    foerdermix: StammdatenState;
    common: CommonState;
    lookup: LookupState;
    search: SearchState;
    fileInfoStamm: FileInfoStammState;
  }

  const store = new Vuex.Store<RootState>({
    modules: {
      user: User,
      snackbar: Snackbar,
      foerdermix: StammdatenStore,
      common: CommonStore,
      lookup: LookupStore,
      search: SearchStore,
      fileInfoStamm: FileInfoStammStore,
    },
  });

  afterEach(() => {
    store.dispatch("common/resetFormDirty");
  });

  test("Test: Keine Änderung vorgenommen", () => {
    expect(store.getters["common/isFormDirty"]).toBe(false);
  });

  test("Test: Änderung vorgenommen, nicht gespeichert", () => {
    expect(store.getters["common/isFormDirty"]).toBe(false);
    store.dispatch("common/formChanged");
    expect(store.getters["common/isFormDirty"]).toBe(true);
  });

  test("Test: Änderung vorgenommen und gespeichert", () => {
    expect(store.getters["common/isFormDirty"]).toBe(false);
    store.dispatch("common/formChanged");
    store.dispatch("common/resetFormDirty");
    expect(store.getters["common/isFormDirty"]).toBe(false);
  });
});
