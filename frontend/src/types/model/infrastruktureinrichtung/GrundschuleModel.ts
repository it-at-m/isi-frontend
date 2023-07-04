import { GrundschuleDto } from "@/api/api-client/isi-backend";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GrundschuleModel extends GrundschuleDto {}
class GrundschuleModel {
  constructor(grundschule: GrundschuleDto) {
    Object.assign(this, grundschule, {});
    this.schule = new SchuleModel(grundschule.schule);
  }
}
export { GrundschuleModel as default };
