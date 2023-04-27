import { BauabschnittDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauabschnittModel extends BauabschnittDto {}
class BauabschnittModel {
  constructor(bauabschnitt: BauabschnittDto) {
    Object.assign(this, bauabschnitt, {});
  }
}
export { BauabschnittModel as default };
