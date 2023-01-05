import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MappingMixin extends Vue {
  mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
    const foerdermix = new FoerdermixModel({});
    foerdermix.anteilBaugemeinschaften = foerdermixStammModel.foerdermix.anteilBaugemeinschaften;

    foerdermix.anteilEinUndZweifamilienhaeuser = foerdermixStammModel.foerdermix.anteilEinUndZweifamilienhaeuser;

    foerdermix.anteilFreifinanzierterGeschosswohnungsbau = foerdermixStammModel.foerdermix.anteilFreifinanzierterGeschosswohnungsbau;

    foerdermix.anteilGefoerderterMietwohnungsbau = foerdermixStammModel.foerdermix.anteilGefoerderterMietwohnungsbau;

    foerdermix.anteilKonzeptionellerMietwohnungsbau = foerdermixStammModel.foerdermix.anteilKonzeptionellerMietwohnungsbau;

    foerdermix.anteilMuenchenModell = foerdermixStammModel.foerdermix.anteilMuenchenModell;

    foerdermix.anteilPreisgedaempfterMietwohnungsbau = foerdermixStammModel.foerdermix.anteilPreisgedaempfterMietwohnungsbau;

    return foerdermix;
  }
}
