import { AdresseDto } from "@/api/api-client/isi-master-eai";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdresseMasterEaiModel extends AdresseDto { }
class AdresseMasterEaiModel {
  
  constructor(adresse: AdresseDto) {
    Object.assign(this, adresse, {});
  }
  
}
export { AdresseMasterEaiModel as default};
