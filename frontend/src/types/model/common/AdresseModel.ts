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
      (_.isNil(this.hausnummer) || _.isEmpty(this.hausnummer.trim())) &&
      (_.isNil(this.coordinate) || _.isEmpty(this.coordinate))
    );
  }

  public isEqual(other: AdresseModel): boolean {
    if (!_.isNil(other)) {
      return (
        this.plz === other.plz &&
        this.strasse === other.strasse &&
        this.ort === other.ort &&
        this.hausnummer === other.hausnummer
      );
    }
    return false;
  }
}
export { AdresseModel as default };
