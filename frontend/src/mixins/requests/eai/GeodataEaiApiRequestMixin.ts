import { Component, Mixins } from "vue-property-decorator";
import {
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api as PunktApi,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api as PolygonApi,
  ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api as PolygonOperationenApi,
  MultiPolygonGeometryDto,
  FeatureDtoFlurstueckDto,
  GetFlurstuecke1Request,
  PointGeometryDto,
  FeatureDtoGemarkungDto,
  GetGemarkungenRequest,
  FeatureDtoStadtbezirkDto,
  GetStadtbezirkeRequest,
  UnifyRequest,
  GetFlurstueckeRequest,
  GetStadtbezirke1Request,
  GetGemarkungen1Request,
  FeatureDtoBezirksteilDto,
  FeatureDtoKitaplanungsbereichDto,
  GetKitaplanungsbereicheRequest,
  GetBezirksteileRequest,
  FeatureDtoGrundschulsprengelDto,
  GetGrundschulsprengelRequest,
  FeatureDtoMittelschulsprengelDto,
  GetMittelschulsprengelRequest,
  GetBezirksteile1Request,
  GetKitaplanungsbereiche1Request,
  GetGrundschulsprengel1Request,
  GetMittelschulsprengel1Request,
  FeatureDtoViertelDto,
  GetViertel1Request,
  GetViertelRequest,
} from "@/api/api-client/isi-geodata-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

@Component
export default class GeodataEaiApiRequestMixin extends Mixins(ErrorHandler) {
  private punktApi: PunktApi;

  private polygonApi: PolygonApi;

  private operationApi: PolygonOperationenApi;

  constructor() {
    super();
    this.punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
    this.polygonApi = new PolygonApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
    this.operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  }

  async getFlurstueckeForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstuecke1Request = { pointGeometryDto: point };
    let flurstuecke: Array<FeatureDtoFlurstueckDto> = [];

    await this.punktApi
      .getFlurstuecke1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          flurstuecke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return flurstuecke;
  }

  async getStadtbezirkeForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirke1Request = { pointGeometryDto: point };
    let stadtbezirke: Array<FeatureDtoStadtbezirkDto> = [];

    await this.punktApi
      .getStadtbezirke1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          stadtbezirke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return stadtbezirke;
  }

  async getGemarkungenForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungen1Request = { pointGeometryDto: point };
    let gemarkungen: Array<FeatureDtoGemarkungDto> = [];

    await this.punktApi
      .getGemarkungen1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          gemarkungen = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return gemarkungen;
  }

  async getBezirksteileForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteile1Request = { pointGeometryDto: point };
    let bezirksteile: Array<FeatureDtoBezirksteilDto> = [];

    await this.punktApi
      .getBezirksteile1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          bezirksteile = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return bezirksteile;
  }

  async getViertelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertel1Request = { pointGeometryDto: point };
    let viertel: Array<FeatureDtoViertelDto> = [];

    await this.punktApi
      .getViertel1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          viertel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return viertel;
  }

  async getKitaplanungsbereicheForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereiche1Request = { pointGeometryDto: point };
    let kitaPlb: Array<FeatureDtoKitaplanungsbereichDto> = [];

    await this.punktApi
      .getKitaplanungsbereiche1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          kitaPlb = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return kitaPlb;
  }

  async getGrundschulsprengelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengel1Request = { pointGeometryDto: point };
    let grundschulsprengel: Array<FeatureDtoGrundschulsprengelDto> = [];

    await this.punktApi
      .getGrundschulsprengel1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          grundschulsprengel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return grundschulsprengel;
  }

  async getMittelschulsprengelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengel1Request = { pointGeometryDto: point };
    let mittelschulsprengel: Array<FeatureDtoMittelschulsprengelDto> = [];

    await this.punktApi
      .getMittelschulsprengel1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          mittelschulsprengel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return mittelschulsprengel;
  }

  async getFlurstueckeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstueckeRequest = { multiPolygonGeometryDto: multiPolygon };
    let flurstuecke: Array<FeatureDtoFlurstueckDto> = [];

    await this.polygonApi
      .getFlurstuecke(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          flurstuecke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return flurstuecke;
  }

  async getGemarkungenForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungenRequest = { multiPolygonGeometryDto: multiPolygon };
    let gemarkungen: Array<FeatureDtoGemarkungDto> = [];

    await this.polygonApi
      .getGemarkungen(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          gemarkungen = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return gemarkungen;
  }

  async getStadtbezirkeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirkeRequest = { multiPolygonGeometryDto: multiPolygon };
    let stadtbezirke: Array<FeatureDtoStadtbezirkDto> = [];

    await this.polygonApi
      .getStadtbezirke(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          stadtbezirke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return stadtbezirke;
  }

  async getBezirksteileForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteileRequest = { multiPolygonGeometryDto: multiPolygon };
    let bezirksteile: Array<FeatureDtoBezirksteilDto> = [];

    await this.polygonApi
      .getBezirksteile(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          bezirksteile = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return bezirksteile;
  }

  async getViertelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertelRequest = { multiPolygonGeometryDto: multiPolygon };
    let viertel: Array<FeatureDtoViertelDto> = [];

    await this.polygonApi
      .getViertel(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          viertel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return viertel;
  }

  async getKitaplanungsbereicheForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereicheRequest = { multiPolygonGeometryDto: multiPolygon };
    let kitaplanungsbereiche: Array<FeatureDtoKitaplanungsbereichDto> = [];

    await this.polygonApi
      .getKitaplanungsbereiche(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          kitaplanungsbereiche = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return kitaplanungsbereiche;
  }

  async getGrundschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    let grundschulsprengel: Array<FeatureDtoGrundschulsprengelDto> = [];

    await this.polygonApi
      .getGrundschulsprengel(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          grundschulsprengel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return grundschulsprengel;
  }

  async getMittelschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    let mittelschulsprengel: Array<FeatureDtoMittelschulsprengelDto> = [];

    await this.polygonApi
      .getMittelschulsprengel(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          mittelschulsprengel = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return mittelschulsprengel;
  }

  async getUnionOfMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<MultiPolygonGeometryDto> {
    const request: UnifyRequest = { multiPolygonGeometryDto: multiPolygon };
    let unifiedMultipolygon: MultiPolygonGeometryDto = {
      type: "MultiPolygon",
      coordinates: undefined,
    };

    await this.operationApi
      .unify(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response)) {
          unifiedMultipolygon = response;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
        throw new Error(error);
      });

    return unifiedMultipolygon;
  }
}
