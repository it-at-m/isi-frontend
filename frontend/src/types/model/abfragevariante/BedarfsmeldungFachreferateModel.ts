import { BedarfsmeldungFachreferateDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BedarfsmeldungFachreferateModel extends BedarfsmeldungFachreferateDto {}
class BedarfsmeldungFachreferateModel {
  constructor(bedarfsmeldung: BedarfsmeldungFachreferateDto) {
    Object.assign(this, bedarfsmeldung, {});
  }
}
export { BedarfsmeldungFachreferateModel as default };
