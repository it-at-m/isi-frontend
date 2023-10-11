import { AbfragevarianteFachreferatDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteFachreferatModel extends AbfragevarianteFachreferatDto {}
class AbfragevarianteFachreferatModel {
  constructor(abfragevarianteSachbearbeitung: AbfragevarianteFachreferatDto) {
    Object.assign(this, abfragevarianteSachbearbeitung, {});
  }
}
export { AbfragevarianteFachreferatModel as default };
