import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _, { each, forEach } from "lodash";

/**
 * Addiert alle Anteile eines Fördermixes zusammen und gibt die Summe zurück
 */
export function addiereAnteile(foerdermix: FoerdermixModel): number {
  if (_.isNil(foerdermix.foerderarten)) {
    return 0;
  }

  let sum = 0;
  foerdermix.foerderarten.forEach((foerderart) => {
    sum += _.isNil(foerderart.anteilProzent) ? 0 : foerderart.anteilProzent;
  });
  console.log("hhiiiiiier" + sum);

  return sum;
}
