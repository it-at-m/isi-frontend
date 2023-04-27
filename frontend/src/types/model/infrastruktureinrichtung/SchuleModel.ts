import { SchuleDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SchuleModel extends SchuleDto {}
class SchuleModel {
  constructor(schule: SchuleDto) {
    Object.assign(this, schule, {});
  }
}
export { SchuleModel as default };
