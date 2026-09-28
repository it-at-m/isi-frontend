import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import _ from "lodash";

export function isAllowedArtAbfrage(
  zielArtAbfrage?: AbfrageDtoArtAbfrageEnum,
  quelleArtAbfrage?: AbfrageDtoArtAbfrageEnum,
) {
  let isAllowedArtAbfrage = false;
  if (!_.isNil(zielArtAbfrage) && !_.isNil(quelleArtAbfrage)) {
    if (zielArtAbfrage === quelleArtAbfrage) {
      isAllowedArtAbfrage = true;
    }
    switch (zielArtAbfrage) {
      case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
        if (
          quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren ||
          quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren
        ) {
          isAllowedArtAbfrage = true;
        }
        break;
      case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
        if (
          quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren ||
          quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren ||
          quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren
        ) {
          isAllowedArtAbfrage = true;
        }
        break;
      case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
        if (quelleArtAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
          isAllowedArtAbfrage = true;
        }
        break;
      default:
        break;
    }
  }
  return isAllowedArtAbfrage;
}
