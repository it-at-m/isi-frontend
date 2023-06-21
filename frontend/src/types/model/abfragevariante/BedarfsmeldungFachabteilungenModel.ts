import { BedarfsmeldungFachabteilungenDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BedarfsmeldungFachabteilungenModel extends BedarfsmeldungFachabteilungenDto {}
class BedarfsmeldungFachabteilungenModel {
  constructor(bedarfsmeldung: BedarfsmeldungFachabteilungenDto) {
    Object.assign(this, bedarfsmeldung, {});
  }
}
export { BedarfsmeldungFachabteilungenModel as default };
