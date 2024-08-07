import type { KommentarBauvorhabenDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KommentarBauvorhabenModel extends KommentarBauvorhabenDto {}
class KommentarBauvorhabenModel {
  public isDirty: boolean;

  constructor(kommentar: KommentarBauvorhabenDto) {
    Object.assign(this, kommentar, {});
    this.isDirty = false;
  }
}
export { KommentarBauvorhabenModel as default };
