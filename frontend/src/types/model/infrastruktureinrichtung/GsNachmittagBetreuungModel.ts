import { GsNachmittagBetreuungDto, InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GsNachmittagBetreuungModel extends GsNachmittagBetreuungDto { }
class GsNachmittagBetreuungModel {
  
  constructor(gsNachmittagBetreuung: GsNachmittagBetreuungDto) {
    Object.assign(this, gsNachmittagBetreuung, {});
    this.infrastruktureinrichtung = new InfrastruktureinrichtungModel(gsNachmittagBetreuung.infrastruktureinrichtung);
  }

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung;
  }
    
}
export { GsNachmittagBetreuungModel as default};
