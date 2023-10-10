import { BauleitplanverfahrenDto } from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauleitplanverfahrenModel extends BauleitplanverfahrenDto {}
class BauleitplanverfahrenModel {
  constructor(bauleitplanverfahren: BauleitplanverfahrenDto) {
    Object.assign(this, bauleitplanverfahren, {});
    this.abfragevarianten = _.toArray(bauleitplanverfahren.abfragevarianten).map(
      (abfragevariante) => new AbfragevarianteBauleitplanverfahrenModel(abfragevariante),
    );
    this.abfragevariantenSachbearbeitung = _.toArray(bauleitplanverfahren.abfragevariantenSachbearbeitung).map(
      (abfragevariante) => new AbfragevarianteBauleitplanverfahrenModel(abfragevariante),
    );
  }
}
export { BauleitplanverfahrenModel as default };
