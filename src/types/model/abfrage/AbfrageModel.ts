import type { AbfrageDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfrageModel extends AbfrageDto {}
class AbfrageModel {
  constructor(abfrage: AbfrageDto) {
    Object.assign(this, abfrage, {});
  }
}
export { AbfrageModel as default };
