import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";

/**
 * Addiert alle Anteile eines Fördermixes zusammen und gibt die Summe zurück
 */
export function addiereAnteile(foerdermix: FoerdermixModel): number {
  if (_.isNil(foerdermix)) {
    return 0;
  }

  let sum = 0;

  sum += _.isNil(foerdermix.anteilFreifinanzierterGeschosswohnungsbau)
    ? 0
    : foerdermix.anteilFreifinanzierterGeschosswohnungsbau;

  sum += _.isNil(foerdermix.anteilGefoerderterMietwohnungsbau) ? 0 : foerdermix.anteilGefoerderterMietwohnungsbau;

  sum += _.isNil(foerdermix.anteilMuenchenModell) ? 0 : foerdermix.anteilMuenchenModell;

  sum += _.isNil(foerdermix.anteilPreisgedaempfterMietwohnungsbau)
    ? 0
    : foerdermix.anteilPreisgedaempfterMietwohnungsbau;

  sum += _.isNil(foerdermix.anteilKonzeptionellerMietwohnungsbau) ? 0 : foerdermix.anteilKonzeptionellerMietwohnungsbau;

  sum += _.isNil(foerdermix.anteilBaugemeinschaften) ? 0 : foerdermix.anteilBaugemeinschaften;

  sum += _.isNil(foerdermix.anteilEinUndZweifamilienhaeuser) ? 0 : foerdermix.anteilEinUndZweifamilienhaeuser;

  return sum;
}
