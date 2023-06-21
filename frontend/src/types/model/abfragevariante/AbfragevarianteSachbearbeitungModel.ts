import { AbfragevarianteSachbearbeitungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteSachbearbeitungModel extends AbfragevarianteSachbearbeitungDto {}
class AbfragevarianteSachbearbeitungModel {
  constructor(abfragevarianteSachbearbeitung: AbfragevarianteSachbearbeitungDto) {
    Object.assign(this, abfragevarianteSachbearbeitung, {});
  }
}
export { AbfragevarianteSachbearbeitungModel as default };
