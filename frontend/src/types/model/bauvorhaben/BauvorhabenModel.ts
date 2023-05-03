import { BauvorhabenDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import VerortungModel from "@/types/model/common/VerortungModel";
import { createVerortungDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauvorhabenModel extends BauvorhabenDto {}

class BauvorhabenModel {
  constructor(bauvorhabenDto: BauvorhabenDto) {
    Object.assign(this, bauvorhabenDto, {});
    if (_.isNil(bauvorhabenDto.verortung)) {
      this.verortung = new VerortungModel(createVerortungDto());
    } else {
      this.verortung = new VerortungModel(bauvorhabenDto.verortung);
    }
  }
}

export { BauvorhabenModel as default };
