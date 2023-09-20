import { KommentarDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KommentarModel extends KommentarDto {}
class KommentarModel {
  index: number;

  constructor(kommentar: KommentarDto, index: number) {
    Object.assign(this, kommentar, {});
    this.index = index;
  }
}
export { KommentarModel as default };
