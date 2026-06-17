import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";

export function getAbfrageIcon(artAbfrage: AbfrageDtoArtAbfrageEnum | string | undefined): string {
  switch (artAbfrage) {
    case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
      return "mdi-map-outline";
    case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
      return "mdi-floor-plan";
    case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
      return "mdi-notebook-outline";
    case AbfrageDtoArtAbfrageEnum.Unspecified:
    default:
      return "";
  }
}
