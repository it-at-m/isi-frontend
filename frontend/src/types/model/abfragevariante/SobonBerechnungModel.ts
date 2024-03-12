import { SobonBerechnungDto } from "@/api/api-client/isi-backend";

type SobonBerechnungModel = SobonBerechnungDto;

class SobonBerechnungModel {
  constructor(sobonBerechnung: SobonBerechnungDto) {
    Object.assign(this, sobonBerechnung);
  }
}

export { SobonBerechnungModel as default };
