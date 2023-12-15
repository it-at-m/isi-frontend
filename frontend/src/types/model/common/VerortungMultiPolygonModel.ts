import { VerortungMultiPolygonDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VerortungMultiPolygonModel extends VerortungMultiPolygonDto {}
class VerortungMultiPolygonModel {
  constructor(verortung: VerortungMultiPolygonDto) {
    Object.assign(this, verortung, {});
  }
}
export { VerortungMultiPolygonModel as default };
