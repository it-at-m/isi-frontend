import moment from "moment";
import _ from "lodash";

/**
 * Formatierung eines Datum in das Format YYYY-MM-DD
 *
 * @param string Datum das zu formatieren ist
 */
export function convertDateForBackend(dateToFormat: string | undefined): string | undefined {
  return dateToFormat ? moment(dateToFormat, "DD.MM.YYYY").format("YYYY-MM-DD") : undefined;
}

/**
 * Formatierung eines Datum in das Format DD.MM.YYYY
 *
 * @param string Datum das zu formatieren ist
 */
export function convertDateForFrontend(dateToFormat: string | undefined): string {
  return dateToFormat ? moment(dateToFormat).format("DD.MM.YYYY") : "";
}

export function convertDecimalForFrontend(decimalToFormat: number | undefined): string {
  return _.isNil(decimalToFormat) ? "" : decimalToFormat.toString().replace(".", ",");
}

export function convertDecimalForBackend(decimalToFormat: string | undefined): number | undefined {
  return _.isNil(decimalToFormat) || decimalToFormat === ""
    ? undefined
    : parseFloat(decimalToFormat.toString().replace(",", "."));
}

export function convertIntForFrontend(intToFormat: number | undefined): string {
  return _.isNil(intToFormat) ? "" : intToFormat.toString();
}

export function convertIntForBackend(intToFormat: string | undefined): number | undefined {
  return _.isNil(intToFormat) || intToFormat === "" ? undefined : parseInt(intToFormat as string);
}
