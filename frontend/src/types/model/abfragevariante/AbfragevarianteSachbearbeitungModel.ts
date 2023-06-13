import { AbfragevarianteSachbearbeitungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteSachbearbeitungModel extends AbfragevarianteSachbearbeitungDto {}
class AbfragevarianteSachbearbeitungModel {
  constructor(abfragevariante: AbfragevarianteSachbearbeitungDto) {
    Object.assign(this, abfragevariante, {});
  }
}
export { AbfragevarianteSachbearbeitungModel as default };
