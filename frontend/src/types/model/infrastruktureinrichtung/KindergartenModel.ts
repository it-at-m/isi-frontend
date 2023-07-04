import { KindergartenDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KindergartenModel extends KindergartenDto {}
class KindergartenModel {
  constructor(kindergarten: KindergartenDto) {
    Object.assign(this, kindergarten, {});
  }
}
export { KindergartenModel as default };
