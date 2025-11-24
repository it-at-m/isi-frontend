import type { BaurateDto } from "@/api/api-client/isi-backend";
import { createFoerdermixDto } from "@/utils/Factories";
import FoerdermixModel from "./FoerdermixModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaurateModel extends BaurateDto {}
class BaurateModel {
  constructor(baurate: BaurateDto) {
    Object.assign(this, baurate, {});
    if (_.isNil(baurate.foerdermix)) {
      this.foerdermix = new FoerdermixModel(createFoerdermixDto());
    } else {
      this.foerdermix = new FoerdermixModel(baurate.foerdermix);
    }
  }
}

export { BaurateModel as default };
