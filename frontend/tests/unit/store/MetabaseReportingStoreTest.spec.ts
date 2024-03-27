import Vuex from "vuex";
import Vue from "vue";
import { MetabaseReportingDto } from "@/api/api-client/isi-backend";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import StammdatenStore, { StammdatenState } from "@/store/modules/StammdatenStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";
import MetabaseReportingStore, { MetabaseReportingInformationState } from "@/store/modules/MetabaseReportingStore";

describe("MetabaseReportingStoreTest.spec.ts", () => {
  Vue.use(Vuex);

  interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
    foerdermix: StammdatenState;
    common: CommonState;
    lookup: LookupState;
    search: SearchState;
    fileInfoStamm: FileInfoStammState;
    metabaseReporting: MetabaseReportingInformationState;
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
      metabaseReporting: MetabaseReportingStore,
    },
  });

  beforeEach(() => {
    store.commit("metabaseReportingInformation/metabaseReportingInformation", {} as MetabaseReportingDto);
  });

  test("Initialize Metabase Reporting Information", () => {
    const metabaseReporting: MetabaseReportingDto = {
      url: "https://isi-metabase-test.muenchen.de",
      reportBedarfe: "dashboard/45-dashboard-bedarfe",
      reportSpitzenbedarfePlanungsursaechlich: "dashboard/27-dashboard-spitzenbedarfe-planungsursachlich",
      reportSpitzenbedarfeSobonUrsaechlich: "dashboard/30-dashboard-spitzenbedarfe-sobon-ursachlich",
      reportWohneinheiten: "dashboard/33-dashboard-wohneinheiten",
    };
    store.commit("metabaseReporting/metabaseReportingInformation", metabaseReporting);
    assert.isNotNull(store.getters["metabaseReporting/metabaseReportingInformation"]);
  });

  test("Checks content", () => {
    const metabaseReporting: MetabaseReportingDto = {
      url: "https://isi-metabase-test.muenchen.de",
      reportBedarfe: "dashboard/45-dashboard-bedarfe",
      reportSpitzenbedarfePlanungsursaechlich: "dashboard/27-dashboard-spitzenbedarfe-planungsursachlich",
      reportSpitzenbedarfeSobonUrsaechlich: "dashboard/30-dashboard-spitzenbedarfe-sobon-ursachlich",
      reportWohneinheiten: "dashboard/33-dashboard-wohneinheiten",
    };
    store.commit("metabaseReporting/metabaseReportingInformation", metabaseReporting);
    expect(store.getters["metabaseReporting/metabaseReportingInformation"].url).toEqual(
      "https://isi-metabase-test.muenchen.de",
    );
    expect(store.getters["metabaseReporting/metabaseReportingInformation"].reportBedarfe).toEqual(
      "dashboard/45-dashboard-bedarfe",
    );
    expect(
      store.getters["metabaseReporting/metabaseReportingInformation"].reportSpitzenbedarfePlanungsursaechlich,
    ).toEqual("dashboard/27-dashboard-spitzenbedarfe-planungsursachlich");
    expect(
      store.getters["metabaseReporting/metabaseReportingInformation"].reportSpitzenbedarfeSobonUrsaechlich,
    ).toEqual("dashboard/30-dashboard-spitzenbedarfe-sobon-ursachlich");
    expect(store.getters["metabaseReporting/metabaseReportingInformation"].reportWohneinheiten).toEqual(
      "dashboard/33-dashboard-wohneinheiten",
    );
  });
});
