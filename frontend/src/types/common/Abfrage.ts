import type {
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
} from "@/api/api-client/isi-backend";
import BaugenehmigungsverfahrenModel from "../model/abfrage/BaugenehmigungsverfahrenModel";
import BauleitplanverfahrenModel from "../model/abfrage/BauleitplanverfahrenModel";
import WeiteresVerfahrenModel from "../model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "../model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "../model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "../model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";

export type AnyAbfrageModel = BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel;

export type AnyAbfrageDto = BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto;

export type AnyAbfragevarianteModel =
  | AbfragevarianteBauleitplanverfahrenModel
  | AbfragevarianteBaugenehmigungsverfahrenModel
  | AbfragevarianteWeiteresVerfahrenModel;

export type AnyAbfragevarianteDto =
  | AbfragevarianteBauleitplanverfahrenDto
  | AbfragevarianteBaugenehmigungsverfahrenDto
  | AbfragevarianteWeiteresVerfahrenDto;

export const enum AnzeigeContextAbfragevariante {
  UNDEFINED,
  ABFRAGEVARIANTE,
  ABFRAGEVARIANTE_SACHBEARBEITUNG,
}

/**
 * Ein Union aller im Rahmen der Abfrage relevanten DTOs, welche ein eigenes Formular haben.
 */
export type AbfrageDtoWithForm = AnyAbfrageDto | AnyAbfragevarianteDto | BauabschnittDto | BaugebietDto | BaurateDto;

/**
 * Ein Enum für alle im Rahmen der Abfrage relevanten Entitäten, welche ein eigenes Formular haben.
 */
export const enum AbfrageFormType {
  BAULEITPLANVERFAHREN,
  BAUGENEHMIGUNGSVERFAHREN,
  WEITERES_VERFAHREN,
  ABFRAGEVARIANTE_BAULEITPLANVERFAHREN,
  ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN,
  ABFRAGEVARIANTE_WEITERES_VERFAHREN,
  BAUABSCHNITT,
  BAUGEBIET_BAULEITPLANVERFAHREN,
  BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN,
  BAUGEBIET_WEITERES_VERFAHREN,
  BAURATE,
}

/*
 * Hinweis zu disabled: Wenn true, ist die Aktion sichtbar, aber ausgegraut und nicht aktivierbar.
 * Es ist für Aktionen gedacht, welche abhängig von den Daten der Abfrage-Hierarchie verfügbar sind.
 * Aktionen, welche in der aktuellen Rolle nicht oder nur ein Mal relevant sind, sollten ausgelassen werden.
 */
interface AbfrageTreeAction {
  name: string;
  disabled: boolean;
  effect: () => void;
}

export interface AbfrageTreeItem {
  id: string;
  type: AbfrageFormType;
  name: string;
  parent: AbfrageTreeItem | null;
  children: AbfrageTreeItem[];
  actions: AbfrageTreeAction[];
  onSelection: () => void;
  context: AnzeigeContextAbfragevariante;
  value: AbfrageDtoWithForm;
}
