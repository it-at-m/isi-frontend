import { KindergartenDto, InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KindergartenModel extends KindergartenDto { }
class KindergartenModel {
  
  constructor(kindergarten: KindergartenDto) {
    Object.assign(this, kindergarten, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(kindergarten.infrastruktureinrichtung);
  }

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten;
  }
    
}
export { KindergartenModel as default};
