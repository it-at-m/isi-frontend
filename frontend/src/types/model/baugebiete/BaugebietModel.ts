import { BaugebietDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import BaurateModel from "@/types/model/bauraten/BaurateModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaugebietModel extends BaugebietDto {}
class BaugebietModel {
  constructor(baugebiet: BaugebietDto) {
    Object.assign(this, baugebiet, {});
    this.bauraten = _.toArray(baugebiet.bauraten).map((baurate) => new BaurateModel(baurate));
  }
}
export { BaugebietModel as default };
