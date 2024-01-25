import { BedarfsmeldungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BedarfsmeldungModel extends BedarfsmeldungDto {}
class BedarfsmeldungModel {
  constructor(bedarfsmeldung: BedarfsmeldungDto) {
    Object.assign(this, bedarfsmeldung, {});
  }
}
export { BedarfsmeldungModel as default };
