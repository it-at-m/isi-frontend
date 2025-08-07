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
    "Anwendungssystem (API-Gateway) nicht verfügbar. Bitte kontaktieren Sie den Servicedesk.";
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
    console.log("Error is instanceof ResponseError: " + (error instanceof ResponseError));
    console.log("Error is type of: " + typeof error);
    console.log("Error response.type: " + (error as ResponseError).response.type);
    console.log("Error response.status: " + (error as ResponseError).response.status);
    if (error instanceof ResponseError && error.response.status === 403) {
      console.log("label1");
      showInformation(ERROR_MESSAGE_NOT_AUTHORIZED);
    } else if (error instanceof ResponseError && error.response.status === 503) {
      console.log("label2");
      // ResponseError vom Loadbalancer. D.h. das Gateway konnte nicht erreicht werden.
      showInformation(ERROR_MESSAGE_GATEWAY);
    } else if (error instanceof ResponseError && error.response.status === 504) {
      console.log("label3");
      // ResponseError vom Loadbalancer. D.h. das Gateway konnte nicht erreicht werden.
      showInformation(ERROR_MESSAGE_TIMEOUT);
    } else if (error instanceof ResponseError && error.response.status !== 500) {
      console.log("label4");
      // Das Backend reagiert mit einer fachlichen Fehlermeldung.
      error.response.json().then((json: unknown) => {
        const informationResponseDto: InformationResponseDto = InformationResponseDtoFromJSON(json);
        // Show as Toast
        const messages: string = _.join(informationResponseDto.messages, "; ");
        const type = getToastType(informationResponseDto.type);
        showInformation(messages, type);
      });
    } else if (error instanceof ResponseError && error.response.status === 500) {
      console.log("label5");
      // ResponseError vom Gateway. D.h. das Gateway aber nicht das Backend konnte erreicht werden.
      showInformation(ERROR_MESSAGE_BACKEND);
    } else if ((error as ResponseError).response.type === "opaqueredirect") {
      console.log("label6");
      location.reload();
    } else {
      console.log("label7");
      // TypeError -> Der fetch-Request ist fehlgeschlagen.
      showInformation(ERROR_MESSAGE_GATEWAY);
    }
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
