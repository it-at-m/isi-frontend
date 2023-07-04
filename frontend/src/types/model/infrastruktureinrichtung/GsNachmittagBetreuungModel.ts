import { GsNachmittagBetreuungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GsNachmittagBetreuungModel extends GsNachmittagBetreuungDto {}
class GsNachmittagBetreuungModel {
  constructor(gsNachmittagBetreuung: GsNachmittagBetreuungDto) {
    Object.assign(this, gsNachmittagBetreuung, {});
  }
}
export { GsNachmittagBetreuungModel as default };
