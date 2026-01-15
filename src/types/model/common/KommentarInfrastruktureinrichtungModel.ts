import type { KommentarInfrastruktureinrichtungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KommentarInfrastruktureinrichtungModel extends KommentarInfrastruktureinrichtungDto {}
class KommentarInfrastruktureinrichtungModel {
  public isDirty: boolean;

  constructor(kommentar: KommentarInfrastruktureinrichtungDto) {
    Object.assign(this, kommentar, {});
    this.isDirty = false;
  }
}
export { KommentarInfrastruktureinrichtungModel as default };
