import { BaugebietDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaugebietModel extends BaugebietDto {}
class BaugebietModel {
  constructor(baugebiet: BaugebietDto) {
    Object.assign(this, baugebiet, {});
  }
}
export { BaugebietModel as default };
