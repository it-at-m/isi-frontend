<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      automatic-zoom-to-polygons
      :editable="isVerortungEditable"
      :look-at="lookAt"
      :geo-json="geoJson"
      :geo-json-options="geoJsonOptions"
      @click-in-map="handleClickInMap"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
    <v-label v-if="pointToDisplayNotEmpty">Koordinate</v-label>
    <v-chip-group
      v-if="pointToDisplayNotEmpty"
      title="Koordinate"
      selected-class="text-primary"
      column
    >
      <v-chip>
        <div>{{ pointToDisplay }}</div>
      </v-chip>
    </v-chip-group>
    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="stadtbezirke.length !== 0">Stadtbezirk</v-label>
        <v-chip-group
          v-if="stadtbezirke.length !== 0"
          title="Stadtbezirke"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(stadtbezirk, index) in stadtbezirke"
            :key="index"
          >
            {{ stadtbezirk.nummer + `/` + stadtbezirk.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="kitaplanungsbereiche.length !== 0">Kitaplanungsbereich</v-label>
        <v-chip-group
          v-if="kitaplanungsbereiche.length !== 0"
          title="Kitaplanungsbereiche"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(kitaplanungsbereich, index) in kitaplanungsbereiche"
            :key="index"
          >
            {{ kitaplanungsbereich.kitaPlbT }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="bezirksteile.length !== 0">Bezirksteil</v-label>
        <v-chip-group
          v-if="bezirksteile.length !== 0"
          title="Bezirksteile"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(bezirksteil, index) in bezirksteile"
            :key="index"
          >
            {{ bezirksteil.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>

      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="grundschulsprengel.length !== 0">Grundschulsprengel</v-label>
        <v-chip-group
          v-if="grundschulsprengel.length !== 0"
          title="Grundschulsprengel"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(grundschulsprengelItem, index) in grundschulsprengel"
            :key="index"
          >
            {{ grundschulsprengelItem.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="gemarkungen.length !== 0">Gemarkung</v-label>
        <v-chip-group
          v-if="gemarkungen.length !== 0"
          title="Gemarkungen"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(gemarkung, index) in gemarkungen"
            :key="index"
          >
            {{ gemarkung.nummer + `/` + gemarkung.name }}
          </v-chip>
        </v-chip-group>
      </v-col>

      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="mittelschulsprengel.length !== 0">Mittelschulsprengel</v-label>
        <v-chip-group
          v-if="mittelschulsprengel.length !== 0"
          title="Mittelschulsprengel"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(mittelschulsprengelItem, index) in mittelschulsprengel"
            :key="index"
          >
            {{ mittelschulsprengelItem.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import CityMap from "@/components/map/CityMap.vue";
import L, { type GeoJSONOptions, LatLng, type LatLngLiteral } from "leaflet";
import type { Feature, Point } from "geojson";
import _ from "lodash";
import type {
  FlurstueckDto,
  GemarkungDto,
  StadtbezirkDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  Wgs84Dto,
  UtmDto,
  VerortungPointDto,
  BezirksteilDto,
  KitaplanungsbereichDto,
  GrundschulsprengelDto,
  MittelschulsprengelDto,
  ViertelDto,
  AdresseDto,
} from "@/api/api-client/isi-backend";
import type {
  FeatureDtoBezirksteilDto,
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoGrundschulsprengelDto,
  FeatureDtoKitaplanungsbereichDto,
  FeatureDtoMittelschulsprengelDto,
  FeatureDtoStadtbezirkDto,
  FeatureDtoViertelDto,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import VerortungPointModel from "@/types/model/common/VerortungPointModel";
import { ICON_INFRASTRUKTUREINRICHTUNG } from "@/utils/MapUtil";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useGeodataEaiApi } from "@/composables/requests/eai/GeodataEaiApi";
import { useKoordinatenApi } from "@/composables/requests/KoordinatenApi";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { isAdresseEmpty, isAdresseEqual } from "@/utils/AdresseUtil";

interface Props {
  adresse?: AdresseDto;
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const geoApi = useGeodataEaiApi();
const koordinatenApi = useKoordinatenApi();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const verortungModel = defineModel<VerortungPointModel | undefined>({ required: true });
const verortungCardTitle = "Verortung";
let oldAdresse: AdresseDto | undefined = undefined;
const pointCoordinatesAsUtm32 = ref("");
const geoJson = ref<Array<Feature<Point>>>([]); /* Repräsentiert eine einzige Punktkoordinate. */
const geoJsonOptions: GeoJSONOptions = {
  pointToLayer: (feature: Feature, latlng) => {
    return L.marker(latlng, { icon: ICON_INFRASTRUKTUREINRICHTUNG });
  },
};
const isVerortungEditable = computed(() => props.isEditable && !adresseValid());
const adresseCoordinate = computed(() => {
  const lng = props.adresse?.coordinate?.longitude;
  const lat = props.adresse?.coordinate?.latitude;

  if (lng && lat) {
    return { lng, lat };
  }
  return undefined;
});

const verortungPointCoordinate = computed(() => {
  let lng = Number.NaN;
  let lat = Number.NaN;

  if (
    !_.isNil(verortungModel.value) &&
    !_.isNil(verortungModel.value.point) &&
    verortungModel.value.point.coordinates.length == 2
  ) {
    lng = verortungModel.value.point.coordinates[0];
    lat = verortungModel.value.point.coordinates[1];
  }
  if (!_.isNaN(lng) && !_.isNaN(lat)) {
    return { lng, lat };
  }
  return undefined;
});

const pointToDisplay = computed({
  get() {
    return pointCoordinatesAsUtm32.value;
  },
  set(value: string) {
    pointCoordinatesAsUtm32.value = value;
  },
});

function adresseValid(): boolean {
  return !_.isNil(props.adresse) && !_.isEmpty(props.adresse.strasse) && !_.isNil(adresseCoordinate.value);
}

const pointToDisplayNotEmpty = computed(() => !_.isEmpty(pointCoordinatesAsUtm32.value));
const stadtbezirke = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.stadtbezirke) as Array<StadtbezirkDto>, ["nummer"]),
);
const bezirksteile = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.bezirksteile) as Array<BezirksteilDto>, ["nummer"]),
);
const gemarkungen = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.gemarkungen) as Array<GemarkungDto>, ["nummer"]),
);
const kitaplanungsbereiche = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.kitaplanungsbereiche) as Array<KitaplanungsbereichDto>, ["kitaPlb"]),
);
const grundschulsprengel = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.grundschulsprengel) as Array<GrundschulsprengelDto>, ["nummer"]),
);
const mittelschulsprengel = computed(() =>
  _.sortBy(_.toArray(verortungModel.value?.mittelschulsprengel) as Array<MittelschulsprengelDto>, ["nummer"]),
);

const lookAt = computed(() => {
  if (!_.isEmpty(geoJson.value)) {
    const coordinates = geoJson.value[0].geometry.coordinates;
    return { lng: coordinates[0], lat: coordinates[1] };
  }
  return undefined;
});

function getPointGeometry(): PointGeometryDto | undefined {
  if (!_.isEmpty(geoJson.value)) {
    const coordinates = geoJson.value[0].geometry.coordinates;
    if (coordinates.length == 2) {
      return {
        type: "Point",
        coordinates: [coordinates[0], coordinates[1]], // [0] = longitude, [1] = latitude
      } as PointGeometryDto;
    }
  }
  return undefined;
}

function createVerortung(point: PointGeometryDto | undefined): void {
  if (!_.isNil(point)) {
    createVerortungPointDtoFromSelectedPoint(point).then((verortung: VerortungPointDto | undefined) => {
      verortungModel.value = verortung;
    });
  } else {
    verortungModel.value = undefined;
  }
}

function handleClickInMap(latlng: LatLng): void {
  if (isVerortungEditable.value) {
    setGeoJsonFromLatLng(latlng);
  }
}

function handleDeselectGeoJson(): void {
  geoJson.value = [];
  verortungModel.value = undefined;
  refresh();
  formChanged();
}

function handleAcceptSelectedGeoJson(): void {
  createVerortung(getPointGeometry());
  formChanged();
}

watch(
  () => props.adresse,
  () => handleAdresseChanged(),
  { deep: true },
);

/**
 * Dient als Reaktion auf Änderungen der Adresse aus der Elternkomponente.
 */
function handleAdresseChanged(): void {
  if (adresseChanged()) {
    if (adresseValid()) {
      setGeoJsonFromLatLng(adresseCoordinate.value as LatLng);
    } else {
      geoJson.value = [];
    }
    handleAcceptSelectedGeoJson();
  }
}

function adresseChanged(): boolean {
  let changed = false;
  // Erstaufruf?
  if (_.isNil(oldAdresse) && !_.isNil(props.adresse)) {
    if (_.isNil(verortungModel.value)) {
      changed = !isAdresseEmpty(props.adresse); // Neuanlage mit Adressauswahl
    } else {
      /* Infrastruktureinrichtung mit existierender Adresse */
    }
    oldAdresse = _.cloneDeep(props.adresse);
  } else {
    // Folgeaufruf: Hat sich die ausgewählte Adresse geändert?
    if (!_.isNil(oldAdresse) && !_.isNil(props.adresse)) {
      if (!isAdresseEmpty(oldAdresse) && !isAdresseEmpty(props.adresse)) {
        changed = !isAdresseEqual(oldAdresse, props.adresse);
      } else if (
        (isAdresseEmpty(oldAdresse) && !isAdresseEmpty(props.adresse)) ||
        (!isAdresseEmpty(oldAdresse) && isAdresseEmpty(props.adresse))
      ) {
        changed = true;
      }
    }
    if (changed) {
      if (!_.isNil(props.adresse)) {
        oldAdresse = _.cloneDeep(props.adresse);
      } else {
        oldAdresse = undefined;
      }
    }
  }
  return changed;
}

watch(
  verortungModel,
  () => {
    handleVerortungModelChanged();
  },
  { deep: true },
);

function handleVerortungModelChanged(): void {
  if (!_.isNil(verortungPointCoordinate.value)) {
    setGeoJsonFromLatLng({ lat: verortungPointCoordinate.value?.lat, lng: verortungPointCoordinate.value?.lng });
  } else {
    geoJson.value = [];
  }
  refresh();
}

function refresh(): void {
  const point = getPointGeometry();
  if (!_.isNil(point)) {
    getUtm32(point).then((utm32) => {
      pointToDisplay.value = !_.isNil(utm32) ? `${_.round(utm32.east)} ${_.round(utm32.north)} (UTM)` : "";
    });
  } else {
    pointToDisplay.value = "";
  }
}

async function getUtm32(point: PointGeometryDto | undefined): Promise<UtmDto | undefined> {
  let utm32: UtmDto | undefined = undefined;
  if (!_.isNil(point) && !_.isNil(point.coordinates) && point.coordinates.length === 2) {
    const wgs84 = {
      longitude: point.coordinates[0],
      latitude: point.coordinates[1],
    } as Wgs84Dto;
    utm32 = await koordinatenApi.wgs84toUtm32(wgs84);
  }
  return utm32;
}

function setGeoJsonFromLatLng(latlng: LatLngLiteral): void {
  geoJson.value = [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [latlng.lng, latlng.lat] },
      properties: null,
    },
  ];
}

/**
 * Erstellt das VerortungPointDto auf Basis einer Punktkoordinate.
 * Tritt ein fehler bei der Erstellung des VerortungPointDtos auf, so wird undefined zurückgegeben.
 */
async function createVerortungPointDtoFromSelectedPoint(
  point: PointGeometryDto,
): Promise<VerortungPointDto | undefined> {
  try {
    const promiseStadtbezirke = geoApi.getStadtbezirkeForPoint(point);
    const promiseBezirksteile = geoApi.getBezirksteileForPoint(point);
    const promiseViertel = geoApi.getViertelForPoint(point);
    const promiseGemarkungen = geoApi.getGemarkungenForPoint(point);
    const promiseFlurstuecke = geoApi.getFlurstueckeForPoint(point);
    const promiseKitaplanungsbereiche = geoApi.getKitaplanungsbereicheForPoint(point);
    const promiseGrundschulsprengel = geoApi.getGrundschulsprengelForPoint(point);
    const promiseMittelschulsprengel = geoApi.getMittelschulsprengelForPoint(point);

    // Stadtbezirke ermitteln
    const stadtbezirkeBackend: Array<StadtbezirkDto> = stadtbezirkeGeoDataEaiToStadtbezirkeBackend(
      await promiseStadtbezirke,
    );

    // Stadtbezirksteile ermitteln
    const bezirksteileBackend: Array<BezirksteilDto> = bezirksteileGeoDataEaiToBezirksteileBackend(
      await promiseBezirksteile,
    );

    // Viertel ermitteln
    const viertelBackend: Array<ViertelDto> = viertelGeoDataEaiToViertelBackend(await promiseViertel);

    // Gemarkungen ermitteln
    const gemarkungenBackend: Array<GemarkungDto> = gemarkungenGeoDataEaiToGemarkungenBackend(await promiseGemarkungen);

    // Flurstücke ermitteln
    const flurstueckeBackend: Array<FlurstueckDto> = flurstueckeGeoDataEaiToFlurstueckeBackend(
      await promiseFlurstuecke,
    );

    // Anfügen der Flurstücke an Gemarkung
    flurstueckeBackend.forEach((flurstueck) => {
      const matchingGemarkung = gemarkungenBackend.find((gemarkung) => gemarkung.nummer === flurstueck.gemarkungNummer);
      matchingGemarkung?.flurstuecke.add(flurstueck);
    });

    // KitaPlb ermitteln
    const kitaplanungsbereicheBackend: Array<KitaplanungsbereichDto> =
      kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(await promiseKitaplanungsbereiche);

    // Grundschulsprengel ermitteln
    const grundschulsprengelBackend: Array<GrundschulsprengelDto> =
      grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(await promiseGrundschulsprengel);

    // Mittelschulsprengel ermitteln
    const mittelschulsprengelBackend: Array<MittelschulsprengelDto> =
      mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(await promiseMittelschulsprengel);

    // Erstellung des VerortungPointDto
    return new VerortungPointModel({
      gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
      stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
      bezirksteile: new Set<BezirksteilDto>(bezirksteileBackend),
      viertel: new Set<ViertelDto>(viertelBackend),
      kitaplanungsbereiche: new Set<KitaplanungsbereichDto>(kitaplanungsbereicheBackend),
      grundschulsprengel: new Set<GrundschulsprengelDto>(grundschulsprengelBackend),
      mittelschulsprengel: new Set<MittelschulsprengelDto>(mittelschulsprengelBackend),
      point: point,
    } as VerortungPointDto);
  } catch (error) {
    return undefined;
  }
}

function stadtbezirkeGeoDataEaiToStadtbezirkeBackend(
  stadtbezirkeGeoDataEai: Array<FeatureDtoStadtbezirkDto>,
): Array<StadtbezirkDto> {
  return stadtbezirkeGeoDataEai.map((stadtbezirk) => {
    return {
      nummer: stadtbezirk.properties?.stadtbezirkNummer,
      name: stadtbezirk.properties?.name,
      multiPolygon: JSON.parse(JSON.stringify(stadtbezirk.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function bezirksteileGeoDataEaiToBezirksteileBackend(
  bezirksteileGeoDataEai: Array<FeatureDtoBezirksteilDto>,
): Array<BezirksteilDto> {
  return bezirksteileGeoDataEai.map((bezirksteil) => {
    return {
      nummer: bezirksteil.properties?.bezirksteilNummer,
      multiPolygon: JSON.parse(JSON.stringify(bezirksteil.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function viertelGeoDataEaiToViertelBackend(bezirksteileGeoDataEai: Array<FeatureDtoViertelDto>): Array<ViertelDto> {
  return bezirksteileGeoDataEai.map((viertel) => {
    return {
      nummer: viertel.properties?.viertelNummer,
      flaecheQm: viertel.properties?.flaecheQm,
      multiPolygon: JSON.parse(JSON.stringify(viertel.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function gemarkungenGeoDataEaiToGemarkungenBackend(
  gemarkungenGeoDataEai: Array<FeatureDtoGemarkungDto>,
): Array<GemarkungDto> {
  return gemarkungenGeoDataEai.map((gemarkung) => {
    return {
      flurstuecke: new Set<FlurstueckDto>(),
      name: gemarkung.properties?.gemarkungName,
      nummer: gemarkung.properties?.gemarkung,
      multiPolygon: JSON.parse(JSON.stringify(gemarkung.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function flurstueckeGeoDataEaiToFlurstueckeBackend(
  flurstueckGeoDataEai: Array<FeatureDtoFlurstueckDto>,
): Array<FlurstueckDto> {
  return flurstueckGeoDataEai.map(flurstueckGeoDataEaiToFlurstueckBackend);
}

function flurstueckGeoDataEaiToFlurstueckBackend(flurstueckGeoDataEai: FeatureDtoFlurstueckDto): FlurstueckDto {
  return {
    nummer: [
      flurstueckGeoDataEai.properties?.fluerstueckNummerZ,
      flurstueckGeoDataEai.properties?.fluerstueckNummerN,
    ].join("/"),
    zaehler: flurstueckGeoDataEai.properties?.fluerstueckNummerZ,
    nenner: flurstueckGeoDataEai.properties?.fluerstueckNummerN,
    flaecheQm: flurstueckGeoDataEai.properties?.flaecheQm,
    eigentumsart: flurstueckGeoDataEai.properties?.eigentumsart,
    eigentumsartBedeutung: flurstueckGeoDataEai.properties?.eigentumsartBedeutung,
    gemarkungNummer: flurstueckGeoDataEai.properties?.gemarkung,
    multiPolygon: JSON.parse(JSON.stringify(flurstueckGeoDataEai.geometry)) as MultiPolygonGeometryDtoBackend,
  };
}

function kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(
  kitaplanungsbereicheGeoDataEai: Array<FeatureDtoKitaplanungsbereichDto>,
): Array<KitaplanungsbereichDto> {
  return kitaplanungsbereicheGeoDataEai.map((kitaplanungsbereich) => {
    return {
      kitaPlb: kitaplanungsbereich.properties?.kitaPlb,
      kitaPlbT: kitaplanungsbereich.properties?.kitaPlbT,
      multiPolygon: JSON.parse(JSON.stringify(kitaplanungsbereich.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(
  grundschulsprengelGeoDataEai: Array<FeatureDtoGrundschulsprengelDto>,
): Array<GrundschulsprengelDto> {
  return grundschulsprengelGeoDataEai.map((grundschulsprengel) => {
    return {
      nummer: grundschulsprengel.properties?.schulnummer,
      multiPolygon: JSON.parse(JSON.stringify(grundschulsprengel.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}

function mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(
  mittelschulsprengelGeoDataEai: Array<FeatureDtoMittelschulsprengelDto>,
): Array<MittelschulsprengelDto> {
  return mittelschulsprengelGeoDataEai.map((mittelschulsprengel) => {
    return {
      nummer: mittelschulsprengel.properties?.schulnummer,
      multiPolygon: JSON.parse(JSON.stringify(mittelschulsprengel.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  });
}
</script>
