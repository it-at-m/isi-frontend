import Vuex from "vuex";
import Vue from "vue";
import {
  AbfrageListElementDto,
  AbfrageListElementDtoStandVorhabenEnum,
  InfrastruktureinrichtungListElementDto,
  InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum,
} from "@/api/api-client";
import { createBauvorhabenDto } from "@/utils/Factories";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import FoerdermixStore, { FoerdermixState } from "@/store/modules/FoerdermixStore";
import FileInfoStammStore, { FileInfoStammState } from "@/store/modules/FileInfoStammStore";
import { Userinfo } from "@/types/common/Userinfo";
import UserinfoStore, { UserinfoState } from "@/store/modules/Userinfostore";

describe("UserinfoStoreTest.spec.ts", () => {
  Vue.use(Vuex);

  interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
    foerdermix: FoerdermixState;
    common: CommonState;
    lookup: LookupState;
    search: SearchState;
    fileInfoStamm: FileInfoStammState;
    userinfo: UserinfoState;
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
      userinfo: UserinfoStore
    },
  });

  // Test Userinfo
  test("Save Userinfo in Store", async () => {
    const userinfo: Userinfo = new Userinfo();
    userinfo.givenname = "Vorname";
    userinfo.surname = "Nachname";
    userinfo.department = "Abteilung";
    userinfo.email = "Email";
    userinfo.role = ["Admin"];
    store.commit("userinfo/userinfo", userinfo);
    expect(store.getters["userinfo/userinfo"].givenname).toEqual("Vorname");
    expect(store.getters["userinfo/userinfo"].surname).toEqual("Nachname");
    expect(store.getters["userinfo/userinfo"].department).toEqual("Abteilung");
    expect(store.getters["userinfo/userinfo"].email).toEqual("Email");
    expect(store.getters["userinfo/userinfo"].role[0]).toEqual("Admin");
  });
});
