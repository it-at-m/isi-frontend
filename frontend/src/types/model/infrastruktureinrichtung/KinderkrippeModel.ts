import { KinderkrippeDto, InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KinderkrippeModel extends KinderkrippeDto { }
class KinderkrippeModel {
  
  constructor(kinderkrippe: KinderkrippeDto) {
    Object.assign(this, kinderkrippe, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(kinderkrippe.infrastruktureinrichtung);
  }

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe;    
  }

}
export { KinderkrippeModel as default};
