import { MittelschuleDto } from "@/api/api-client/isi-backend";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MittelschuleModel extends MittelschuleDto {}
class MittelschuleModel {
  constructor(mittelschule: MittelschuleDto) {
    Object.assign(this, mittelschule, {});
    this.schule = new SchuleModel(mittelschule.schule);
  }
}
export { MittelschuleModel as default };
