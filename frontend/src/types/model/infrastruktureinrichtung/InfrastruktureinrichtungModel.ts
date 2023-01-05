import { InfrastruktureinrichtungDto } from "@/api/api-client";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfrastruktureinrichtungModel extends InfrastruktureinrichtungDto { }
class InfrastruktureinrichtungModel {
  
  constructor(infrastruktureinrichtung: InfrastruktureinrichtungDto) {
    Object.assign(this, infrastruktureinrichtung, {});
    if (_.isNil(infrastruktureinrichtung.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    }
    else {      
      this.adresse = new AdresseModel(infrastruktureinrichtung.adresse);
    }    
  }
 
}
export { InfrastruktureinrichtungModel as default};
