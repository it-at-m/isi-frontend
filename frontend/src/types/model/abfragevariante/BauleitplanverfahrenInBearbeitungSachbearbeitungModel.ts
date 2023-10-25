import { BauleitplanverfahrenInBearbeitungSachbearbeitungDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauleitplanverfahrenInBearbeitungSachbearbeitungModel
  extends BauleitplanverfahrenInBearbeitungSachbearbeitungDto {}
class BauleitplanverfahrenInBearbeitungSachbearbeitungModel {
  constructor(abfragevarianteSachbearbeitung: BauleitplanverfahrenInBearbeitungSachbearbeitungDto) {
    Object.assign(this, abfragevarianteSachbearbeitung, {});
  }
}
export { BauleitplanverfahrenInBearbeitungSachbearbeitungModel as default };
