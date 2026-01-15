import type { BauabschnittDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauabschnittModel extends BauabschnittDto {}
class BauabschnittModel {
  constructor(bauabschnitt: BauabschnittDto) {
    Object.assign(this, bauabschnitt, {});
    this.baugebiete = _.toArray(bauabschnitt.baugebiete).map((baugebiet) => new BaugebietModel(baugebiet));
  }
}
export { BauabschnittModel as default };
