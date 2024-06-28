import type { KommentarDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KommentarModel extends KommentarDto {}
class KommentarModel {
  public isDirty: boolean;

  constructor(kommentar: KommentarDto) {
    Object.assign(this, kommentar, {});
    this.isDirty = false;
  }
}
export { KommentarModel as default };
