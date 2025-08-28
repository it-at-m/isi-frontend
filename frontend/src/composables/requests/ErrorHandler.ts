import {
  type InformationResponseDto,
  InformationResponseDtoFromJSON,
  InformationResponseDtoTypeEnum,
  ResponseError,
} from "@/api/api-client/isi-backend";
import { useToast, TYPE } from "vue-toastification";
import { useCommonStore } from "@/stores/CommonStore";
import _ from "lodash";

// eslint-disable-next-line
export function useErrorHandler() {
  const toast = useToast();
  const commonStore = useCommonStore();
  const ERROR_MESSAGE_GATEWAY =
    "Das Anwendungssystem (API-Gateway) ist nicht verfügbar oder die Sitzung ist abgelaufen. Versuchen Sie es erneut mit F5. Ansonsten kontaktieren Sie bitte den Servicedesk.";
  const ERROR_MESSAGE_BACKEND =
    "Es ist ein Problem im Anwendungssystem (Backend) aufgetreten. Bitte kontaktieren Sie den Servicedesk.";
  const ERROR_MESSAGE_NOT_AUTHORIZED = "Sie haben nicht die nötigen Rechte um diese Aktion durchzuführen.";
  const ERROR_MESSAGE_TIMEOUT =
    "Im Anwendungssystem ist eine Zeitüberschreitung aufgetreten. Bitte kontaktieren Sie den Servicedesk.";

  /**
   * Diese Methode zeigt den im Parameter übergebenen "error" als Toast an.
   *
   * Handelt es sich um einen Redirect des Typs "opaqueredirect", so wird ein Neuladen der Seite veranlasst.
   *
   * Handelt es sich beim Parameter "error" um eine "TypeError" oder um einen ResponseError mit Status 500
   * oder 403 so wird eine feste Fehlermeldung ausgegeben.
   *
   * Handelt es sich um einen ResponseError mit einem anderen Status als 500, so wird die Nutzlast
   * des Body als Fehlermeldung angezeigt.
   *
   * @param error welche angezeigt werden soll.
   */
  function handleError(error: unknown): Error {
    console.log("Error instanceof ResponseError: " + (error instanceof ResponseError));
    if (error instanceof ResponseError) {
      console.log(
        "ResponeError, Status: " +
          (error as ResponseError).response.status +
          ", type: " +
          (error as ResponseError).response.type +
          ", message: " +
          (error as ResponseError).message,
      );
    }
    if (error instanceof ResponseError) {
      if ((error as ResponseError).response.type === "opaqueredirect") {
        console.log("label 0");
        location.reload();
      }
      switch ((error as ResponseError).response.status) {
        case 0:
          console.log("label 1");
          break;
        case 403:
          console.log("label 2");
          showInformation(ERROR_MESSAGE_NOT_AUTHORIZED);
          break;
        case 500:
          // ResponseError vom Gateway. D.h. das Gateway aber nicht das Backend konnte erreicht werden.
          console.log("label 3");
          showInformation(ERROR_MESSAGE_BACKEND);
          break;
        case 503:
          // ResponseError vom Loadbalancer. D.h. das Gateway konnte nicht erreicht werden.
          console.log("label 4");
          showInformation(ERROR_MESSAGE_GATEWAY);
          break;
        case 504:
          // ResponseError vom Loadbalancer. D.h. das Gateway konnte nicht erreicht werden.
          console.log("label 5");
          showInformation(ERROR_MESSAGE_TIMEOUT);
          break;
        default:
          // Das Backend reagiert mit einer fachlichen Fehlermeldung.
          console.log("label 6");
          error.response.json().then((json: unknown) => {
            const informationResponseDto: InformationResponseDto = InformationResponseDtoFromJSON(json);
            // Show as Toast
            const messages: string = _.join(informationResponseDto.messages, "; ");
            const type = getToastType(informationResponseDto.type);
            showInformation(messages, type);
          });
          break;
      }
    } else {
      // TypeError -> Der fetch-Request ist fehlgeschlagen.
      console.log("label 7");
      showInformation(ERROR_MESSAGE_GATEWAY);
    }
    console.log("label 8");
    commonStore.enableButton();
    return error instanceof Error ? error : { name: "Error", message: ERROR_MESSAGE_GATEWAY };
  }

  /**
   * Zeigt eine Nachricht mit einem Toast an, der keinen Timeout hat.
   *
   * @param message welche angezeigt werden soll.
   * @param type vom Toast. Default ist `TYPE.ERROR`.
   */
  function showInformation(message: string, type: TYPE = TYPE.ERROR): void {
    toast(message, { type, timeout: false });
  }

  function getToastType(type: InformationResponseDtoTypeEnum | undefined): TYPE {
    let toastType = TYPE.INFO;
    if (type === InformationResponseDtoTypeEnum.Error) {
      toastType = TYPE.ERROR;
    } else if (type === InformationResponseDtoTypeEnum.Warning) {
      toastType = TYPE.WARNING;
    } else if (type === InformationResponseDtoTypeEnum.InformationSuccess) {
      toastType = TYPE.SUCCESS;
    }
    return toastType;
  }

  return { handleError, getToastType };
}
