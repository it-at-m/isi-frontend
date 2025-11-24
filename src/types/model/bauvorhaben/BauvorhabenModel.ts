import type { BauvorhabenDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauvorhabenModel extends BauvorhabenDto {}

class BauvorhabenModel {
  constructor(bauvorhabenDto: BauvorhabenDto) {
    Object.assign(this, bauvorhabenDto, {});
  }
}

export { BauvorhabenModel as default };
