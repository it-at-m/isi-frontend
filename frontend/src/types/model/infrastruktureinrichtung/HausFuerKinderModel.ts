import { HausFuerKinderDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HausFuerKinderModel extends HausFuerKinderDto {}
class HausFuerKinderModel {
  constructor(hausFuerKinder: HausFuerKinderDto) {
    Object.assign(this, hausFuerKinder, {});
  }
}
export { HausFuerKinderModel as default };
