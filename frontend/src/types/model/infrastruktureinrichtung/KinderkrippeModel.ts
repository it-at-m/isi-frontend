import { KinderkrippeDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KinderkrippeModel extends KinderkrippeDto {}
class KinderkrippeModel {
  constructor(kinderkrippe: KinderkrippeDto) {
    Object.assign(this, kinderkrippe, {});
  }
}
export { KinderkrippeModel as default };
