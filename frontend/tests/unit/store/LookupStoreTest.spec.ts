import Vuex from "vuex";
import Vue from "vue";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import StammdatenStore, { StammdatenState } from "@/store/modules/StammdatenStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";

describe("LookupStoreTest.spec.ts", () => {
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
    store.commit("lookup/artAbfrage", {} as LookupEntryDto[]);
  });

  test("Initialize list artAbfrage", () => {
    const list: Array<LookupEntryDto> = [];
    list.push({
      key: "ERMITTLUNG_SOZINFRA_BEDARF",
      value: "Ermittlung des durch das Wohnbauvorhaben ausgelösten Infrastrukturbedarfs",
    } as LookupEntryDto);
    list.push({
      key: "STELLUNGNAHME_MITZEICHNUNGSKETTE_BESCHLUSSVORLAGE",
      value: "Stellungnahme zu Beschlussvorlage",
    } as LookupEntryDto);
    store.commit("lookup/artAbfrage", list);
    expect(store.getters["lookup/artAbfrage"]).toHaveLength(2);
  });

  test("Contains items artAbfrage", () => {
    const list: Array<LookupEntryDto> = [];
    list.push({
      key: "ERMITTLUNG_SOZINFRA_BEDARF",
      value: "Ermittlung des durch das Wohnbauvorhaben ausgelösten Infrastrukturbedarfs",
    } as LookupEntryDto);
    list.push({
      key: "STELLUNGNAHME_MITZEICHNUNGSKETTE_BESCHLUSSVORLAGE",
      value: "Stellungnahme zu Beschlussvorlage",
    } as LookupEntryDto);
    store.commit("lookup/artAbfrage", list);
    expect(store.getters["lookup/artAbfrage"]).toHaveLength(2);
    expect(store.getters["lookup/artAbfrage"][0].key).toEqual("ERMITTLUNG_SOZINFRA_BEDARF");
    expect(store.getters["lookup/artAbfrage"][0].value).not.toBe("");
    expect(store.getters["lookup/artAbfrage"][1].key).toEqual("STELLUNGNAHME_MITZEICHNUNGSKETTE_BESCHLUSSVORLAGE");
    expect(store.getters["lookup/artAbfrage"][1].value).not.toBe("");
  });
});
