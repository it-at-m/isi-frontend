import { MittelschuleDto, InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MittelschuleModel extends MittelschuleDto { }
class MittelschuleModel {
  
  constructor(mittelschule: MittelschuleDto) {
    Object.assign(this, mittelschule, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(mittelschule.infrastruktureinrichtung);
    this.schule = new SchuleModel(mittelschule.schule);
  }

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule;
  }
    
}
export { MittelschuleModel as default};
