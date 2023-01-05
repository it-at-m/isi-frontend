import { FoerdermixDto } from "@/api/api-client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FoerdermixModel extends FoerdermixDto {}

class FoerdermixModel {
  constructor(foerdermix: FoerdermixDto) {
    Object.assign(this, foerdermix, {});
  }
}
export { FoerdermixModel as default };
