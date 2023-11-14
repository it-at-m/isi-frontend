import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import _ from "lodash";
import { createFoerdermixStammDto } from "./Factories";

export function matchFoerdermixStammDaten(
  foerdermixEingabe: FoerdermixModel,
  foerdermixStammDaten: FoerdermixStammModel[],
): FoerdermixStammModel {
  const foerdermixStamm: FoerdermixStammModel = createFoerdermixStammDto();

  for (const stammdatum of foerdermixStammDaten) {
    if (!_.isNil(stammdatum.foerdermix)) {
      if (_.isEqual(foerdermixEingabe.foerderarten, stammdatum.foerdermix.foerderarten)) {
        foerdermixStamm.bezeichnung = stammdatum.bezeichnung;
        return foerdermixStamm;
      } else if (foerdermixEingabe.foerderarten?.length != 0) {
        foerdermixStamm.bezeichnung = "Freie Eingabe";
      }
    }
  }

  return foerdermixStamm;
}
