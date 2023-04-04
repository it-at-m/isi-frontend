import { AdresseDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdresseModel extends AdresseDto {}
class AdresseModel {
  constructor(adresse: AdresseDto) {
    Object.assign(this, adresse, {});
  }

  get isEmpty(): boolean {
    return (
      (_.isNil(this.plz) || _.isEmpty(this.plz.trim())) &&
      (_.isNil(this.strasse) || _.isEmpty(this.strasse.trim())) &&
      (_.isNil(this.ort) || _.isEmpty(this.ort.trim())) &&
      (_.isNil(this.hausnummer) || _.isEmpty(this.hausnummer.trim()))
    );
  }
}
export { AdresseModel as default };
