import { useSecurity } from "@/composables/security/Security";
import { Context } from "@/utils/Context";

export function useComponentSecurity() {
  const security = useSecurity();

  function areDokumenteVisible(context: Context): boolean {
    switch (context) {
      case Context.ABFRAGE:
        return security.isRoleAdminOrAbfrageerstellung.value || security.isRoleAdminOrSachbearbeitung.value;
      case Context.ABFRAGEVARIANTE_SACHBEARBEITUNG:
        return security.isRoleAdminOrSachbearbeitung.value || security.isRoleAdminOrBedarfsmeldung.value;
      case Context.BAUVORHABEN:
        return (
          security.isRoleAdminOrAbfrageerstellung.value ||
          security.isRoleAdminOrSachbearbeitung.value ||
          security.isRoleAdminOrBedarfsmeldung.value
        );
      case Context.INFRASTRUKTUREINRICHTUNG:
        return security.isRoleAdminOrSachbearbeitung.value || security.isRoleAdminOrBedarfsmeldung.value;
      default:
        return false;
    }
  }

  function areKommentareVisible(context: Context): boolean {
    switch (context) {
      case Context.BAUVORHABEN:
        return security.isRoleAdminOrSachbearbeitung.value;
      case Context.INFRASTRUKTUREINRICHTUNG:
        return security.isRoleAdminOrSachbearbeitung.value || security.isRoleAdminOrBedarfsmeldung.value;
      default:
        return false;
    }
  }

  return {
    areDokumenteVisible,
    areKommentareVisible,
  };
}
