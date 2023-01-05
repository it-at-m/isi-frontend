import { GrundschuleDto, InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GrundschuleModel extends GrundschuleDto { }
class GrundschuleModel {
  
  constructor(grundschule: GrundschuleDto) {
    Object.assign(this, grundschule, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(grundschule.infrastruktureinrichtung);
    this.schule = new SchuleModel(grundschule.schule);
  }
    
  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule;
  }

}
export { GrundschuleModel as default};
