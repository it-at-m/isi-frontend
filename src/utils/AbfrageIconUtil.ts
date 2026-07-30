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

export function getAbfrageArtLabel(artAbfrage: AbfrageDtoArtAbfrageEnum | string | undefined): string {
  switch (artAbfrage) {
    case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
      return "Bauleitplanverfahren";
    case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
      return "Baugenehmigungsverfahren";
    case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
      return "Weiteres Verfahren";
    case AbfrageDtoArtAbfrageEnum.Unspecified:
    default:
      return "";
  }
}
