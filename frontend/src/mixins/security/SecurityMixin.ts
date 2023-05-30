import { Component, Vue } from "vue-property-decorator";

@Component
export default class SecurityMixin extends Vue {
  public isRoleAdminOrAbfrageerstellung(): boolean {
    return this.isRoleAdmin() || this.$store.getters["userinfo/hasRoleAbfrageerstellung"];
  }

  public isRoleAdminOrSachbearbeitung(): boolean {
    return this.isRoleAdmin() || this.$store.getters["userinfo/hasRoleSachbearbeitung"];
  }

  public isRoleAdmin(): boolean {
    return this.$store.getters["userinfo/hasRoleAdmin"];
  }
}
