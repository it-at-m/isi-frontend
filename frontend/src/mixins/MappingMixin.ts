import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MappingMixin extends Vue {
  mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
    const foerdermix = new FoerdermixModel({});
    foerdermix.foerderarten = foerdermixStammModel.foerdermix.foerderarten;
    return foerdermix;
  }
}
