import type { VerortungPointDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VerortungPointModel extends VerortungPointDto {}
class VerortungPointModel {
  constructor(verortung: VerortungPointDto) {
    Object.assign(this, verortung, {});
  }
}
export { VerortungPointModel as default };
