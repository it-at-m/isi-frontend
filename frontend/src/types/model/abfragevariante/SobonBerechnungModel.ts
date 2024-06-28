import type { SobonBerechnungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SobonBerechnungModel extends SobonBerechnungDto {}
class SobonBerechnungModel {
  constructor(sobonBerechnung: SobonBerechnungDto) {
    Object.assign(this, sobonBerechnung, {});
  }
}
export { SobonBerechnungModel as default };
