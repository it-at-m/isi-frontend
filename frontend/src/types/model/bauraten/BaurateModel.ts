import { BaurateDto } from "@/api/api-client/isi-backend";
import { createFoerdermix } from "@/utils/Factories";
import FoerdermixModel from "./FoerdermixModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaurateModel extends BaurateDto {}
class BaurateModel {
  constructor(baurate: BaurateDto) {
    Object.assign(this, baurate, {});
    if (_.isNil(baurate.foerdermix)) {
      this.foerdermix = new FoerdermixModel(createFoerdermix());
    } else {
      this.foerdermix = new FoerdermixModel(baurate.foerdermix);
    }
  }
}

export { BaurateModel as default };
