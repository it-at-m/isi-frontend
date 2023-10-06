import { KommentarDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KommentarModel extends KommentarDto {}
class KommentarModel {
  constructor(kommentar: KommentarDto) {
    Object.assign(this, kommentar, {});
  }
}
export { KommentarModel as default };
