import { InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client/isi-backend";

/**
 * Die für das Bearbeiten einer Infrastruktureinrichtung relevanten Rollen.
 * <p>
 * Die Sachbearbeitung fehlt bewusst: Sie darf Infrastruktureinrichtungen nur lesen.
 */
export interface InfrastruktureinrichtungRollen {
  isAdmin: boolean;
  /** Kita-, Schul- und Flächenbedarfsmeldung, siehe `isRoleAdminOrInfrastruktureinrichtungSchreibend`. */
  isInfrastruktureinrichtungSchreibend: boolean;
  isBedarfsmeldungSozialplanung: boolean;
}

/**
 * Ermittelt, ob eine Infrastruktureinrichtung angelegt oder bearbeitet werden darf.
 * <p>
 * Die Bedarfsmeldung Sozialplanung bearbeitet ausschließlich Nachbarschaftstreffs, die übrigen schreibenden Rollen
 * alle anderen Einrichtungen. Administratoren bearbeiten alle Einrichtungen.
 *
 * @param rollen die Rollen des Nutzers.
 * @param isNew ob die Einrichtung neu angelegt wird.
 * @param typ der Typ der Einrichtung.
 * @returns `true`, falls die Einrichtung bearbeitet werden darf.
 */
export function isInfrastruktureinrichtungEditable(
  rollen: InfrastruktureinrichtungRollen,
  isNew: boolean,
  typ: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum | undefined,
): boolean {
  if (!rollen.isAdmin && !rollen.isInfrastruktureinrichtungSchreibend && !rollen.isBedarfsmeldungSozialplanung) {
    return false;
  }
  if (isNew || rollen.isAdmin) {
    return true;
  }
  const isNachbarschaftstreff = typ === InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Nachbarschaftstreff;
  return rollen.isBedarfsmeldungSozialplanung ? isNachbarschaftstreff : !isNachbarschaftstreff;
}
