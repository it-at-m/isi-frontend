import Vuex from "vuex";
import Vue from "vue";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import FoerdermixStore, { FoerdermixState } from "@/store/modules/FoerdermixStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";

describe("SaveLeaveMixin Test", () => {
  Vue.use(Vuex);

  interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
    foerdermix: FoerdermixState;
    common: CommonState;
    lookup: LookupState;
    search: SearchState;
    fileInfoStamm: FileInfoStammState;
  }

  const store = new Vuex.Store<RootState>({
    modules: {
      user: User,
      snackbar: Snackbar,
      foerdermix: FoerdermixStore,
      common: CommonStore,
      lookup: LookupStore,
      search: SearchStore,
      fileInfoStamm: FileInfoStammStore
    }
  });

  afterEach(() => {
    store.dispatch("common/resetDirty");
  });

  test("Test: Keine Änderung vorgenommen", () => {
    expect(store.getters["common/isDirty"]).toBe(false);
  });

  test("Test: Änderung vorgenommen, nicht gespeichert", () => {
    expect(store.getters["common/isDirty"]).toBe(false);
    store.dispatch("common/formChanged");
    expect(store.getters["common/isDirty"]).toBe(true);
  });

  test("Test: Änderung vorgenommen und gespeichert", () => {
    expect(store.getters["common/isDirty"]).toBe(false);
    store.dispatch("common/formChanged");
    store.dispatch("common/resetDirty");
    expect(store.getters["common/isDirty"]).toBe(false);
  });

});
