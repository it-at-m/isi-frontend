import _ from "lodash";
import { AdresseDto } from "@/api/api-client/isi-backend";

export function isAdresseEqual(thisAdresse: AdresseDto, otherAdresse: AdresseDto): boolean {
  if (_.isNil(thisAdresse) && _.isNil(otherAdresse)) {
    return true;
  }
  if (!_.isNil(otherAdresse) && !_.isNil(otherAdresse)) {
    return (
      thisAdresse.plz === otherAdresse.plz &&
      thisAdresse.strasse === otherAdresse.strasse &&
      thisAdresse.ort === otherAdresse.ort &&
      thisAdresse.hausnummer === otherAdresse.hausnummer
    );
  }
  return false;
}

export function isAdresseEmpty(thisAdresse: AdresseDto): boolean {
  return (
    (_.isNil(thisAdresse.plz) || _.isEmpty(thisAdresse.plz.trim())) &&
    (_.isNil(thisAdresse.strasse) || _.isEmpty(thisAdresse.strasse.trim())) &&
    (_.isNil(thisAdresse.ort) || _.isEmpty(thisAdresse.ort.trim())) &&
    (_.isNil(thisAdresse.hausnummer) || _.isEmpty(thisAdresse.hausnummer.trim())) &&
    (_.isNil(thisAdresse.coordinate) || _.isEmpty(thisAdresse.coordinate))
  );
}
