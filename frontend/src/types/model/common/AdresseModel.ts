import type { AdresseDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdresseModel extends AdresseDto {}
class AdresseModel {
  constructor(adresse: AdresseDto) {
    Object.assign(this, adresse, {});
  }
}
export { AdresseModel as default };
