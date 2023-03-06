import Vuex from "vuex";
import Vue from "vue";
import {
  AbfrageListElementDto,
  AbfrageListElementDtoStandVorhabenEnum,
  InfrastruktureinrichtungListElementDto,
  InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum
 } from "@/api/api-client/isi-backend";
import { createBauvorhabenDto } from "@/utils/Factories";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import FoerdermixStore, { FoerdermixState } from "@/store/modules/FoerdermixStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";

describe("SearchStoreTest.spec.ts", () => {
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
      fileInfoStamm: FileInfoStammStore,
    },
  });

  beforeEach(() => {
    store.commit("search/searchQueryAbfrage", "");
    store.commit("search/resultAbfrage", undefined);
    store.commit("search/searchQueryInfrastruktureinrichtung", "");
    store.commit("search/resultInfrastruktureinrichtung", undefined);
  });

  test("Initialization of searchQueryAbfrage", () => {
    expect(store.getters["search/searchQueryAbfrage"]).toBe("");
  });

  test("Change searchQueryAbfrage", () => {
    store.commit("search/searchQueryAbfrage", "BAUVORHABEN=TEST");
    expect(store.getters["search/searchQueryAbfrage"]).toBe("BAUVORHABEN=TEST");
  });

  test("Initialized resultAbfrage", () => {
    expect(store.getters["search/resultAbfrage"]).toBe(undefined);
  });

  test("Save resultAbfrage", () => {
    const list: Array<AbfrageListElementDto> = [];
    list.push({
      standVorhaben: AbfrageListElementDtoStandVorhabenEnum.BaugenehmigungErteilt,
    } as AbfrageListElementDto);
    store.commit("search/resultAbfrage", list);
    expect(store.getters["search/resultAbfrage"]).toHaveLength(1);
    expect(store.getters["search/resultAbfrage"][0].standVorhaben).toEqual(
      AbfrageListElementDtoStandVorhabenEnum.BaugenehmigungErteilt
    );
  });

  test("Is initialized resultAbfrage", async () => {
    const list: Array<AbfrageListElementDto> = [];
    list.push({
      standVorhaben: AbfrageListElementDtoStandVorhabenEnum.BaugenehmigungErteilt,
    } as AbfrageListElementDto);
    store.commit("search/resultAbfrage", list);
    expect(await store.dispatch("search/isInitializedAbfrage")).toBeTruthy;
  });

  test("Reset resultAbfrage", async () => {
    const list: Array<AbfrageListElementDto> = [];
    list.push({
      standVorhaben: AbfrageListElementDtoStandVorhabenEnum.BaugenehmigungErteilt,
    } as AbfrageListElementDto);
    store.commit("search/resultAbfrage", list);
    expect(await store.dispatch("search/resetAbfrage"));
    expect(await store.dispatch("search/isInitializedAbfrage")).toBeFalsy;
  });

  // Tests für Bauvorhaben

  test("resultBauvorhaben is empty", () => {
    expect(store.getters["search/resultBauvorhaben"]).toHaveLength(0);
  });

  test("resultBauvorhaben receives an entry", () => {
    const bauvorhaben = createBauvorhabenDto();

    store.dispatch("search/resultBauvorhaben", [bauvorhaben]);

    expect(store.getters["search/resultBauvorhaben"]).toHaveLength(1);
    expect(store.getters["search/resultBauvorhaben"][0]).toBe(bauvorhaben);
  });

  test("selectedBauvorhaben is undefined", () => {
    expect(store.getters["search/selectedBauvorhaben"]).toBeUndefined();
  });

  test("selectedBauvorhaben is set", () => {
    const bauvorhaben = createBauvorhabenDto();

    store.dispatch("search/selectedBauvorhaben", bauvorhaben);

    expect(store.getters["search/selectedBauvorhaben"]).toBe(bauvorhaben);
  });

  // Tests Infrastruktureinrichtung

  test("Initialization of searchQueryInfrastruktureinrichtung", () => {
    expect(store.getters["search/searchQueryInfrastruktureinrichtung"]).toBe("");
  });

  test("Change searchQueryInfrastruktureinrichtung", () => {
    store.commit("search/searchQueryInfrastruktureinrichtung", "INFRASTRUKTUREINRICHTUNG_TYP=KINDERKRPPE");
    expect(store.getters["search/searchQueryInfrastruktureinrichtung"]).toBe(
      "INFRASTRUKTUREINRICHTUNG_TYP=KINDERKRPPE"
    );
  });

  test("Initialized resultInfrastruktureinrichtung", () => {
    expect(store.getters["search/resultInfrastruktureinrichtung"]).toBe(undefined);
  });

  test("Save resultInfrastruktureinrichtung", () => {
    const list: Array<InfrastruktureinrichtungListElementDto> = [];
    list.push({
      nameEinrichtung: "Kinderkrippe Maikäfer",
      infrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
    } as InfrastruktureinrichtungListElementDto);
    store.commit("search/resultInfrastruktureinrichtung", list);
    expect(store.getters["search/resultInfrastruktureinrichtung"]).toHaveLength(1);
    expect(store.getters["search/resultInfrastruktureinrichtung"][0].nameEinrichtung).toEqual("Kinderkrippe Maikäfer");
    expect(store.getters["search/resultInfrastruktureinrichtung"][0].infrastruktureinrichtungTyp).toEqual(
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe
    );
  });

  test("Is initialized resultInfrastruktureinrichtung", async () => {
    const list: Array<InfrastruktureinrichtungListElementDto> = [];
    list.push({
      nameEinrichtung: "Kinderkrippe Maikäfer",
      infrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
    } as InfrastruktureinrichtungListElementDto);
    store.commit("search/resultInfrastruktureinrichtung", list);
    expect(await store.dispatch("search/isInitializedInfrastruktureinrichtung")).toBeTruthy;
  });

  test("Reset resultInfrastruktureinrichtung", async () => {
    const list: Array<InfrastruktureinrichtungListElementDto> = [];
    list.push({
      nameEinrichtung: "Kinderkrippe Maikäfer",
      infrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
    } as InfrastruktureinrichtungListElementDto);
    store.commit("search/resultInfrastruktureinrichtung", list);
    expect(await store.dispatch("search/resetInfrastruktureinrichtung"));
    expect(await store.dispatch("search/isInitializedInfrastruktureinrichtung")).toBeFalsy;
  });
});
