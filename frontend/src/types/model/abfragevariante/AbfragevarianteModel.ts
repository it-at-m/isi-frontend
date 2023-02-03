import { AbfragevarianteDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteModel extends AbfragevarianteDto { }
class AbfragevarianteModel {
  constructor(abfragevariante: AbfragevarianteDto) {
    Object.assign(this, abfragevariante, {});
  }
}
export { AbfragevarianteModel as default};