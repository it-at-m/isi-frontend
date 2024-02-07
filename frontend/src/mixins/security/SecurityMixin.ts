import { Component, Vue } from "vue-property-decorator";

@Component
export default class SecurityMixin extends Vue {
  public isRoleAdminOrAbfrageerstellung(): boolean {
    return this.isRoleAdmin() || this.$store.getters["userinfo/hasRoleAbfrageerstellung"];
  }

  public isRoleAdminOrSachbearbeitung(): boolean {
    return this.isRoleAdmin() || this.$store.getters["userinfo/hasRoleSachbearbeitung"];
  }

  public isRoleAdminOrBedarfsmeldung(): boolean {
    return this.isRoleAdmin() || this.$store.getters["userinfo/hasRoleBedarfsmeldung"];
  }

  public isRoleAdmin(): boolean {
    return this.$store.getters["userinfo/hasRoleAdmin"] || this.isGuiWithoutSecurityContext();
  }

  public hasOnlyRoleAnwender(): boolean {
    return this.$store.getters["userinfo/hasOnlyRoleAnwender"];
  }

  private isGuiWithoutSecurityContext(): boolean {
    return (import.meta.env.VITE_RUN_GUI_WITHOUT_SECURITY as string) === "true";
  }
}
