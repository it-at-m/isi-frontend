import {
  HausFuerKinderDto,
  InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum,
} from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HausFuerKinderModel extends HausFuerKinderDto {}
class HausFuerKinderModel {
  constructor(hausFuerKinder: HausFuerKinderDto) {
    Object.assign(this, hausFuerKinder, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(hausFuerKinder.infrastruktureinrichtung);
  }

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder;
  }
}
export { HausFuerKinderModel as default };
