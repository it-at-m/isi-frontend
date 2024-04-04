import {
  InformationResponseDto,
  InformationResponseDtoFromJSON,
  InformationResponseDtoTypeEnum,
  ResponseError,
} from "@/api/api-client/isi-backend";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";
import { useInformationList } from "./InformationList";
import _ from "lodash";

// eslint-disable-next-line
export function useErrorHandler() {
  const { showInformationResponseDtoInInformationList, showErrorInInformationList } = useInformationList();
  const ERROR_MESSAGE_GATEWAY =
    "Anwendungssystem (API-Gateway) nicht verfügbar. Bitte kontaktieren Sie den Servicedesk.";
  const ERROR_MESSAGE_BACKEND =
    "Es ist ein Problem im Anwendungssystem (Backend) aufgetreten. Bitte kontaktieren Sie den Servicedesk.";
  const ERROR_MESSAGE_NOT_AUTHORIZED = "Sie haben nicht die nötigen Rechte um diese Aktion durchzuführen.";

  /**
   * Diese Methode zeigt den im Parameter übergebenen "error" abhängig vom Parameter "showInInformationList"
   * entweder als Nachricht in der InformationsListe oder als Toast.
   *
   * Handelt es sich um einen Redirect des Typs "opaqueredirect", so wird ein Neuladen der Seite veranlasst.
   *
   * Handelt es sich beim Parameter "error" um eine "TypeError" oder um einen ResponseError mit Status 500
   * oder 403 so wird eine feste Fehlermeldung ausgegeben.
   *
   * Handelt es sich um einen ResponseError mit einem anderen Status als 500, so wird die Nutzlast
   * des Body als Fehlermeldung angezeigt.
   *
   * @param showInInformationList falls true. Andernfalls wird der Fehler als Toast gezeigt.
   * @param error welche angezeigt werden soll.
   */
  function handleError(showInInformationList: boolean, error: unknown): Error {
    if (error instanceof ResponseError && error.response.type === "opaqueredirect") {
      location.reload();
    } else if (error instanceof ResponseError && error.response.status === 403) {
      const errorMessage = ERROR_MESSAGE_NOT_AUTHORIZED;
      showErrorInformation(showInInformationList, errorMessage);
    } else if (error instanceof ResponseError && error.response.status === 503) {
      // ResponseError vom Loadbalancer. D.h. das Gateway konnte nicht erreicht werden.
      const errorMessage = ERROR_MESSAGE_GATEWAY;
      showErrorInformation(showInInformationList, errorMessage);
    } else if (error instanceof ResponseError && error.response.status !== 500) {
      // Das Backend reagiert mit einer fachlichen Fehlermeldung.
      error.response.json().then((json: unknown) => {
        const informationResponseDto: InformationResponseDto = InformationResponseDtoFromJSON(json);

        if (showInInformationList) {
          showInformationResponseDtoInInformationList(informationResponseDto);
        } else {
          // Show as Toast
          const messages: string = _.join(informationResponseDto.messages, "; ");
          const toastLevel: Levels = getToastLevel(informationResponseDto.type);
          Toaster.toast(messages, toastLevel);
        }
      });
    } else if (error instanceof ResponseError && error.response.status === 500) {
      // ResponseError vom Gateway. D.h. das Gateway aber nicht das Backend konnte erreicht werden.
      const errorMessage = ERROR_MESSAGE_BACKEND;
      showErrorInformation(showInInformationList, errorMessage);
    } else {
      // TypeError -> Der fetch-Request ist fehlgeschlagen.
      const errorMessage = ERROR_MESSAGE_GATEWAY;
      showErrorInformation(showInInformationList, errorMessage);
    }
    return error instanceof Error ? error : { name: "Error", message: ERROR_MESSAGE_GATEWAY };
  }

  /**
   * @param showInInformationList falls true. Andernfalls wird der Fehler als Toast gezeigt.
   * @param errorMessage welche angezeigt werden soll.
   */
  function showErrorInformation(showInInformationList: boolean, errorMessage: string): void {
    if (showInInformationList) {
      showErrorInInformationList(errorMessage);
    } else {
      Toaster.toast(errorMessage, Levels.ERROR);
    }
  }

  function getToastLevel(type: InformationResponseDtoTypeEnum | undefined): Levels {
    let level: Levels = Levels.INFO;
    if (type === InformationResponseDtoTypeEnum.Error) {
      level = Levels.ERROR;
    } else if (type === InformationResponseDtoTypeEnum.Warning) {
      level = Levels.WARNING;
    } else if (type === InformationResponseDtoTypeEnum.InformationSuccess) {
      level = Levels.SUCCESS;
    }
    return level;
  }

  return { handleError, getToastLevel };
}
