import { TYPE } from "vue-toastification";

export class ApiError extends Error {
  toasterType: TYPE;
  constructor({
    toasterType = TYPE.ERROR,
    message = "Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.",
  }: {
    toasterType?: TYPE;
    message?: string;
  }) {
    // Übergibt die verbleibenden Parameter (einschließlich Vendor spezifischer Parameter) dem Error Konstruktor
    super(message);

    // Behält den richtigen Stack-Trace für die Stelle bei, an der unser Fehler ausgelöst wurde
    this.stack = new Error().stack;

    // Benutzerdefinierte Informationen
    this.toasterType = toasterType;
    this.message = message;
  }
}
