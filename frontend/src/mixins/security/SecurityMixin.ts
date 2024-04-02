import { useUserinfoStore } from "@/stores/Userinfostore";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SecurityMixin extends Vue {
  private userInfoStore = useUserinfoStore();

  public isRoleAdminOrAbfrageerstellung(): boolean {
    return this.isRoleAdmin() || this.userInfoStore.hasRoleAbfrageerstellung;
  }

  public isRoleAdminOrSachbearbeitung(): boolean {
    return this.isRoleAdmin() || this.userInfoStore.hasRoleSachbearbeitung;
  }

  public isRoleAdminOrBedarfsmeldung(): boolean {
    return this.isRoleAdmin() || this.userInfoStore.hasRoleBedarfsmeldung;
  }

  public isRoleAdmin(): boolean {
    return this.userInfoStore.hasRoleAdmin || this.isGuiWithoutSecurityContext();
  }

  public hasOnlyRoleAnwender(): boolean {
    return this.userInfoStore.hasOnlyRoleAnwender;
  }

  private isGuiWithoutSecurityContext(): boolean {
    return (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";
  }
}
