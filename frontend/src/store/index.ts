import Vue from "vue";
import Vuex from "vuex";
import Snackbar, { SnackbarState } from "@/store/modules/Snackbar";
import CommonStore, { CommonState } from "@/store/modules/CommonStore";
import LookupStore, { LookupState } from "@/store/modules/LookupStore";
import SearchStore, { SearchState } from "@/store/modules/SearchStore";
import StammdatenStore, { StammdatenState } from "@/store/modules/StammdatenStore";
import FileInfoStammStore, { FileInfoStammState } from "./modules/FileInfoStammStore";
import InformationStore from "./modules/InformationStore";
import UserinfoStore, { UserinfoState } from "./modules/Userinfostore";

Vue.use(Vuex);
const debug = import.meta.env.DEV;

export interface RootState {
  snackbarState: SnackbarState;
  stammdaten: StammdatenState;
  common: CommonState;
  lookup: LookupState;
  search: SearchState;
  fileInfoStamm: FileInfoStammState;
  userinfo: UserinfoState;
}

export default new Vuex.Store<RootState>({
  modules: {
    snackbar: Snackbar,
    stammdaten: StammdatenStore,
    common: CommonStore,
    lookup: LookupStore,
    search: SearchStore,
    fileInfoStamm: FileInfoStammStore,
    information: InformationStore,
    userinfo: UserinfoStore,
  },
  strict: debug,
});
