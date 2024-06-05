import { isRoleAdminOrAbfrageerstellung, isRoleAdminOrSachbearbeitung, isRoleAdminOrBedarfsmeldung } from "./Security";

export const enum Context {
  UNDEFINED = "UNDEFINED",
  ABFRAGE = "ABFRAGE",
  SCHUELERPOTENTIALPROGNOSE = "SCHULERPOTENTIALPROGNOSE",
  BAUVORHABEN = "BAUVORHABEN",
  BAUVORHABEN_KOMMENTAR = "BAUVORHABEN_KOMMENTAR",
  INFRASTRUKTUREINRICHTUNG = "INFRASTRUKTUREINRICHTUNG",
}

export function isVisible(context: Context): boolean {
  switch (context) {
    case Context.ABFRAGE:
      return isRoleAdminOrAbfrageerstellung();
    case Context.SCHUELERPOTENTIALPROGNOSE:
      return isRoleAdminOrSachbearbeitung();
    default:
      return false;
  }
}
