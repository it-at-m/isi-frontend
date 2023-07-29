import { AbfragevarianteDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteModel extends AbfragevarianteDto {
  sachbearbeitung: boolean;
}
class AbfragevarianteModel {
  constructor(abfragevariante: AbfragevarianteDto, sachbearbeitung: boolean) {
    Object.assign(this, abfragevariante, {});
    this.sachbearbeitung = sachbearbeitung;
  }
}
export { AbfragevarianteModel as default };
