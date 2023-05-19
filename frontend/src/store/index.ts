import Vue from "vue";
import Vuex from "vuex";
import User, { UserState } from "@/store/modules/User";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import FoerdermixStore, { FoerdermixState } from "@/store/modules/FoerdermixStore";
import FileInfoStammStore, { FileInfoStammState } from "./modules/FileInfoStammStore";
import InformationStore from "./modules/InformationStore";
import VerortungStore, { VerortungState } from "./modules/VerortungStore";
import UserinfoStore, { UserinfoState } from "./modules/Userinfostore";

Vue.use(Vuex);
const debug = import.meta.env.DEV;

export interface RootState {
  snackbarState: SnackbarState;
  userState: UserState;
  foerdermix: FoerdermixState;
  common: CommonState;
  lookup: LookupState;
  search: SearchState;
  fileInfoStamm: FileInfoStammState;
  verortungState: VerortungState;
  userinfo: UserinfoState;
}

export default new Vuex.Store<RootState>({
  modules: {
    snackbar: Snackbar,
    user: User,
    foerdermix: FoerdermixStore,
    common: CommonStore,
    lookup: LookupStore,
    search: SearchStore,
    fileInfoStamm: FileInfoStammStore,
    information: InformationStore,
    verortung: VerortungStore,
    userinfo: UserinfoStore,
  },
  strict: debug,
});
