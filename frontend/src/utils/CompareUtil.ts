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
      if (_.isEqual(foerdermixEingabe.foerderarten, stammdatum.foerdermix.anteilBaugemeinschaften)) {
        foerdermixStamm.bezeichnung = stammdatum.bezeichnung;
        return foerdermixStamm;
      } else {
        foerdermixStamm.bezeichnung = "Freie Eingabe";
      }
    }
  }

  return foerdermixStamm;
}
