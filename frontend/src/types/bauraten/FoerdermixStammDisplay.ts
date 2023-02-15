import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { convertDecimalForBackend } from "@/utils/Formatter";
import _ from "lodash";
import FoerdermixModel from "../model/bauraten/FoerdermixModel";
export default class FoerdermixStammDisplay {
  id: string;

  name: string;

  anteilFreifinanzierterGeschosswohnungsbau: string;

  anteilGefoerderterMietwohnungsbau: string;

  anteilMuenchenModell: string;

  anteilPreisgedaempfterMietwohnungsbau: string;

  anteilKonzeptionellerMietwohnungsbau: string;

  anteilBaugemeinschaften: string;

  anteilEinUndZweifamilienhaeuser: string;

  category: string;

  constructor(
    id: string,
    name: string,
    anteilFreifinanzierterGeschosswohnungsbau: string,
    anteilGefoerderterMietwohnungsbau: string,
    anteilMuenchenModell: string,
    anteilPreisgedaempfterMietwohnungsbau: string,
    anteilKonzeptionellerMietwohnungsbau: string,
    anteilBaugemeinschaften: string,
    anteilEinUndZweifamilienhaeuser: string,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.anteilFreifinanzierterGeschosswohnungsbau = anteilFreifinanzierterGeschosswohnungsbau;
    this.anteilGefoerderterMietwohnungsbau = anteilGefoerderterMietwohnungsbau;
    this.anteilMuenchenModell = anteilMuenchenModell;
    this.anteilPreisgedaempfterMietwohnungsbau = anteilPreisgedaempfterMietwohnungsbau;
    this.anteilKonzeptionellerMietwohnungsbau = anteilKonzeptionellerMietwohnungsbau;
    this.anteilBaugemeinschaften = anteilBaugemeinschaften;
    this.anteilEinUndZweifamilienhaeuser = anteilEinUndZweifamilienhaeuser;
    this.category = category;
  }

  static mapFoerdermixStammToDisplay(foerdermixStammDto: FoerdermixStammDto): FoerdermixStammDisplay {
    return new FoerdermixStammDisplay(
      _.isNil(foerdermixStammDto.id) ? "" : foerdermixStammDto.id,
      _.isNil(foerdermixStammDto.bezeichnung) ? "" : foerdermixStammDto.bezeichnung,

      _.isNil(foerdermixStammDto.foerdermix.anteilFreifinanzierterGeschosswohnungsbau)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilFreifinanzierterGeschosswohnungsbau.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilGefoerderterMietwohnungsbau)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilGefoerderterMietwohnungsbau.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilMuenchenModell)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilMuenchenModell.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilPreisgedaempfterMietwohnungsbau)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilPreisgedaempfterMietwohnungsbau.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilKonzeptionellerMietwohnungsbau)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilKonzeptionellerMietwohnungsbau.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilBaugemeinschaften)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilBaugemeinschaften.toFixed(2),

      _.isNil(foerdermixStammDto.foerdermix.anteilEinUndZweifamilienhaeuser)
        ? "0"
        : foerdermixStammDto.foerdermix.anteilEinUndZweifamilienhaeuser.toFixed(2),

      _.isNil(foerdermixStammDto.bezeichnungJahr) ? "" : foerdermixStammDto.bezeichnungJahr
    );
  }

  static mapDisplayToFoerderMix(display: FoerdermixStammDisplay): FoerdermixModel {
    const foerdermix = new FoerdermixModel({});
    foerdermix.anteilBaugemeinschaften = convertDecimalForBackend(
      _.isNil(display.anteilBaugemeinschaften)
      ? "0"
      : display.anteilBaugemeinschaften
    );

    foerdermix.anteilEinUndZweifamilienhaeuser = convertDecimalForBackend(
      _.isNil(display.anteilEinUndZweifamilienhaeuser)
      ? "0"
      : display.anteilEinUndZweifamilienhaeuser
    );

    foerdermix.anteilFreifinanzierterGeschosswohnungsbau = convertDecimalForBackend(
      _.isNil(display.anteilFreifinanzierterGeschosswohnungsbau)
      ? "0"
      : display.anteilFreifinanzierterGeschosswohnungsbau
    );

    foerdermix.anteilGefoerderterMietwohnungsbau = convertDecimalForBackend(
      _.isNil(display.anteilGefoerderterMietwohnungsbau)
      ? "0"
      : display.anteilGefoerderterMietwohnungsbau
    );

    foerdermix.anteilKonzeptionellerMietwohnungsbau = convertDecimalForBackend(
      _.isNil(display.anteilKonzeptionellerMietwohnungsbau)
      ? "0"
      : display.anteilKonzeptionellerMietwohnungsbau
    );

    foerdermix.anteilMuenchenModell = convertDecimalForBackend(
      _.isNil(display.anteilMuenchenModell) ? "0" : display.anteilMuenchenModell);

    foerdermix.anteilPreisgedaempfterMietwohnungsbau = convertDecimalForBackend(
      _.isNil(display.anteilPreisgedaempfterMietwohnungsbau)
      ? "0"
      : display.anteilPreisgedaempfterMietwohnungsbau
    );

    return foerdermix;
  }
}
