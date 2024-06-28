import type { LookupEntryDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LookupEntryModel extends LookupEntryDto {}
class LookupEntryModel {
  constructor(lookupEntry: LookupEntryDto) {
    Object.assign(this, lookupEntry, {});
  }
}
export { LookupEntryModel as default };
