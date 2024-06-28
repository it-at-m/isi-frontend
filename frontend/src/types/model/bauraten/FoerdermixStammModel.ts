import type { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { createFoerdermixDto } from "@/utils/Factories";
import _ from "lodash";
import FoerdermixModel from "./FoerdermixModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FoerdermixStammModel extends FoerdermixStammDto {}

class FoerdermixStammModel {
  constructor(foerdermixStamm: FoerdermixStammDto) {
    Object.assign(this, foerdermixStamm, {});
    if (_.isNil(foerdermixStamm.foerdermix)) {
      this.foerdermix = new FoerdermixModel(createFoerdermixDto());
    } else {
      this.foerdermix = new FoerdermixModel(foerdermixStamm.foerdermix);
    }
  }
}

export { FoerdermixStammModel as default };
