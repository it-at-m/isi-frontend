import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import _ from "lodash";
import { createFoerdermixStamm } from "./Factories";

export function matchFoerdermixStammDaten(
  foerdermixEingabe: FoerdermixModel,
  foerdermixStammDaten: FoerdermixStammModel[]
): FoerdermixStammModel {
  const foerdermixStamm: FoerdermixStammModel = createFoerdermixStamm();

  for (const stammdatum of foerdermixStammDaten) {
    if (!_.isNil(stammdatum.foerdermix)) {
      if (
        _.isEqual(foerdermixEingabe.anteilBaugemeinschaften, stammdatum.foerdermix.anteilBaugemeinschaften) &&
        _.isEqual(
          foerdermixEingabe.anteilEinUndZweifamilienhaeuser,
          stammdatum.foerdermix.anteilEinUndZweifamilienhaeuser
        ) &&
        _.isEqual(
          foerdermixEingabe.anteilFreifinanzierterGeschosswohnungsbau,
          stammdatum.foerdermix.anteilFreifinanzierterGeschosswohnungsbau
        ) &&
        _.isEqual(
          foerdermixEingabe.anteilGefoerderterMietwohnungsbau,
          stammdatum.foerdermix.anteilGefoerderterMietwohnungsbau
        ) &&
        _.isEqual(
          foerdermixEingabe.anteilKonzeptionellerMietwohnungsbau,
          stammdatum.foerdermix.anteilKonzeptionellerMietwohnungsbau
        ) &&
        _.isEqual(foerdermixEingabe.anteilMuenchenModell, stammdatum.foerdermix.anteilMuenchenModell) &&
        _.isEqual(foerdermixEingabe.anteilBaugemeinschaften, stammdatum.foerdermix.anteilBaugemeinschaften) &&
        _.isEqual(
          foerdermixEingabe.anteilPreisgedaempfterMietwohnungsbau,
          stammdatum.foerdermix.anteilPreisgedaempfterMietwohnungsbau
        )
      ) {
        foerdermixStamm.bezeichnung = stammdatum.bezeichnung;
        return foerdermixStamm;
      } else {
        foerdermixStamm.bezeichnung = "Freie Eingabe";
      }
    }
  }

  return foerdermixStamm;
}
