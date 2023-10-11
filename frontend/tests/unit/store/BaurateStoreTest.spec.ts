import Vuex from "vuex";
import Vue from "vue";
import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import StammdatenStore, { StammdatenState } from "@/store/modules/StammdatenStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";

describe("BaurateStoreTest.spec.ts", () => {
  Vue.use(Vuex);
  interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
    stammdaten: StammdatenState;
    common: CommonState;
    lookup: LookupState;
    search: SearchState;
    fileInfoStamm: FileInfoStammState;
  }

  const store = new Vuex.Store<RootState>({
    modules: {
      user: User,
      snackbar: Snackbar,
      stammdaten: StammdatenStore,
      common: CommonStore,
      lookup: LookupStore,
      search: SearchStore,
      fileInfoStamm: FileInfoStammStore,
    },
  });

  afterEach(() => {
    store.commit("stammdaten/foerdermixStammdaten", []);
  });

  test("Initialized foerdermixStammdaten", () => {
    expect(store.getters["stammdaten/foerdermixStammdaten"]).toStrictEqual([]);
  });

  test("save foerdermixStammdaten", () => {
    const list: Array<FoerdermixStammDto> = [];
    list.push({
      bezeichnungJahr: "Sobon 2017",
      bezeichnung: "Test",
    } as FoerdermixStammDto);
    store.commit("stammdaten/foerdermixStammdaten", list);
    expect(store.getters["stammdaten/foerdermixStammdaten"]).toHaveLength(1);
    expect(store.getters["stammdaten/foerdermixStammdaten"][0].bezeichnungJahr).toEqual("Sobon 2017");
    expect(store.getters["stammdaten/foerdermixStammdaten"][0].bezeichnung).toEqual("Test");
  });
});
