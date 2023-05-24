import { VerortungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VerortungModel extends VerortungDto {}
class VerortungModel {
  constructor(verortung: VerortungDto) {
    Object.assign(this, verortung, {});
  }
}
export { VerortungModel as default };
