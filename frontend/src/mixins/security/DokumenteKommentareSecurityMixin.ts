import { Component, Mixins } from "vue-property-decorator";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import { Context } from "@/utils/Context";

@Component
export default class DokumenteKommentareSecurityMixin extends Mixins(SecurityMixin) {
  public isDokumenteVisible(context: Context): boolean {
    switch (context) {
      case Context.ABFRAGE:
        return this.isRoleAdminOrAbfrageerstellung() || this.isRoleAdminOrSachbearbeitung();
      case Context.ABFRAGEVARIANTE_SACHBEARBEITUNG:
        return this.isRoleAdminOrSachbearbeitung() || this.isRoleAdminOrBedarfsmeldung();
      case Context.BAUVORHABEN:
        return (
          this.isRoleAdminOrAbfrageerstellung() ||
          this.isRoleAdminOrSachbearbeitung() ||
          this.isRoleAdminOrBedarfsmeldung()
        );
      case Context.INFRASTRUKTUREINRICHTUNG:
        return this.isRoleAdminOrSachbearbeitung() || this.isRoleAdminOrBedarfsmeldung();
      default:
        return false;
    }
  }

  public isKommentareVisible(context: Context): boolean {
    switch (context) {
      case Context.BAUVORHABEN:
        return this.isRoleAdminOrSachbearbeitung();
      case Context.INFRASTRUKTUREINRICHTUNG:
        return this.isRoleAdminOrSachbearbeitung() || this.isRoleAdminOrBedarfsmeldung();
      default:
        return false;
    }
  }
}
