<template>
  <field-group-card card-title="Verortung">
    <city-map
      height="300"
      :zoom="14"
      expandable
      automatic-zoom-to-polygons
      :editable="isEditable"
      :look-at="coordinate"
      :geo-json="geoJson"
      :geo-json-options="geoJsonOptions"
      @click-in-map="handleClickInMap"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="stadtbezirke.length !== 0">Stadtbezirke</v-label>
        <v-chip-group
          v-if="stadtbezirke.length !== 0"
          title="Stadtbezirke"
          selected-class="primary--text"
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
        <v-label v-if="kitaplanungsbereiche.length !== 0">Kitaplanungsbereiche</v-label>
        <v-chip-group
          v-if="kitaplanungsbereiche.length !== 0"
          title="Kitaplanungsbereiche"
          selected-class="primary--text"
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
        <v-label v-if="bezirksteile.length !== 0">Bezirksteile</v-label>
        <v-chip-group
          v-if="bezirksteile.length !== 0"
          title="Bezirksteile"
          selected-class="primary--text"
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
          selected-class="primary--text"
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
        <v-label v-if="gemarkungen.length !== 0">Gemarkungen</v-label>
        <v-chip-group
          v-if="gemarkungen.length !== 0"
          title="Gemarkungen"
          selected-class="primary--text"
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
          selected-class="primary--text"
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
    <v-row class="justify-center">
      <v-col
        cols="12"
        md="12"
      >
        <v-label v-if="flurstuecke.length !== 0">Flurstücke</v-label>
        <v-chip-group
          v-if="flurstuecke.length !== 0"
          title="Flurstücke"
          selected-class="primary--text"
          column
        >
          <v-chip
            v-for="(flurstueck, index) in flurstuecke"
            :key="index"
          >
            <div v-if="flurstueck.eigentumsart">
              {{ flurstueck.gemarkungNummer + `/` + flurstueck.zaehler + `/` + flurstueck.nenner + `/städtisch` }}
            </div>
            <div v-else>
              {{ flurstueck.gemarkungNummer + `/` + flurstueck.zaehler + `/` + flurstueck.nenner + `/nicht städtisch` }}
            </div>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import CityMap from "@/components/map/CityMap.vue";
import L, { LatLng, Layer } from "leaflet";
import { Feature, MultiPolygon } from "geojson";
import {
  FeatureDtoBezirksteilDto,
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoGrundschulsprengelDto,
  FeatureDtoKitaplanungsbereichDto,
  FeatureDtoMittelschulsprengelDto,
  FeatureDtoStadtbezirkDto,
  FeatureDtoViertelDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoGeoDataEai,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import _ from "lodash";
import VerortungMultiPolygonModel from "@/types/model/common/VerortungMultiPolygonModel";
import {
  AdresseDto,
  BezirksteilDto,
  FlurstueckDto,
  GemarkungDto,
  GrundschulsprengelDto,
  KitaplanungsbereichDto,
  MittelschulsprengelDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  StadtbezirkDto,
  VerortungMultiPolygonDto,
  ViertelDto,
} from "@/api/api-client/isi-backend";
import { Context } from "@/utils/Context";
import { COLOR_POLYGON_UMGRIFF } from "@/utils/MapUtil";
import { defineModel } from "@/utils/Vue";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useSecurity } from "@/composables/security/Security";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useGeodataEaiApi } from "@/composables/requests/eai/GeodataEaiApi";

interface Props {
  value: VerortungMultiPolygonModel | undefined;
  context?: Context;
  lookAt?: AdresseDto;
}

interface Emits {
  (event: "input", value: VerortungMultiPolygonModel | undefined): void;
}

const geoJsonOptions = {
  // Farbe des Multipolygons
  style: function () {
    return { color: COLOR_POLYGON_UMGRIFF };
  },
  onEachFeature: function (feature: Feature, layer: Layer) {
    // Tooltip je Multipolygon
    if (feature.properties && feature.properties.nummer) {
      layer.bindTooltip(
        "<b>Flurstück:</b><br>" +
          "Nummer:&nbsp;" +
          feature.properties.nummer +
          "<br>" +
          "Gemarkung:&nbsp;" +
          feature.properties.nummerGemarkung,
        {
          sticky: true,
          direction: "top",
          offset: L.point(0, -2),
        },
      );

      layer.on("mouseover", function () {
        layer.openTooltip();
      });
      layer.on("mouseout", function () {
        layer.closeTooltip();
      });
    }
  },
};

const { formChanged } = useSaveLeave();
const { isRoleAdminOrSachbearbeitung } = useSecurity();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const geoApi = useGeodataEaiApi();
const  = withDefaults(defineProps<Props>(), { context: Context.UNDEFINED });
const emit = defineEmits<Emits>();
const verortungModel = defineModel(props, emit);
// Repräsentiert das Multipolygon je Flurstück.
const geoJson = computed(() => flurstueckeToGeoJsonFeature(Array.from(selectedFlurstuecke.value.values())));
// Repräsentiert die gewählten Flurstücke identifiziert über die Flurstücksnummer.
const selectedFlurstuecke = ref(new Map<string, FlurstueckDto>());
const stadtbezirke = computed(() => _.sortBy(Array.from(verortungModel.value?.stadtbezirke ?? []), ["nummer"]));
const bezirksteile = computed(() => _.sortBy(Array.from(verortungModel.value?.bezirksteile ?? []), ["nummer"]));
const gemarkungen = computed(() => _.sortBy(Array.from(verortungModel.value?.gemarkungen ?? []), ["nummer"]));
const flurstuecke = computed(() =>
  gemarkungen.value.flatMap((gemarkung) =>
    _.sortBy(Array.from(gemarkung.flurstuecke), ["gemarkungNummer", "zaehler", "nenner"]),
  ),
);
const kitaplanungsbereiche = computed(() =>
  _.sortBy(Array.from(verortungModel.value?.kitaplanungsbereiche ?? []), ["kitaPlb"]),
);
const grundschulsprengel = computed(() =>
  _.sortBy(Array.from(verortungModel.value?.grundschulsprengel ?? []), ["nummer"]),
);
const mittelschulsprengel = computed(() =>
  _.sortBy(Array.from(verortungModel.value?.mittelschulsprengel ?? []), ["nummer"]),
);

const isEditable = computed(() => {
  let editable = false;
  if (props.context === Context.ABFRAGE) {
    editable = isEditableByAbfrageerstellung.value || isEditableBySachbearbeitung.value;
  } else if (props.context === Context.BAUVORHABEN) {
    editable = isRoleAdminOrSachbearbeitung.value;
  }
  return editable;
});

const coordinate = computed(() => {
  const lat = props.lookAt?.coordinate?.latitude;
  const lng = props.lookAt?.coordinate?.longitude;

  if (lat && lng) {
    return { lat, lng };
  }
  return undefined;
});

onMounted(() => onVerortungModelChanged());

watch(verortungModel, () => onVerortungModelChanged());

function onVerortungModelChanged(): void {
  const gemarkungenFromVerortungModel = Array.from(verortungModel.value?.gemarkungen ?? []);
  const flurstueckeFromVerortungModel = gemarkungenFromVerortungModel.flatMap((gemarkung) =>
    Array.from(gemarkung.flurstuecke),
  );
  selectedFlurstuecke.value = createMapForFlurstuecke(flurstueckeFromVerortungModel);
}

async function handleClickInMap(latlng: LatLng): Promise<void> {
  if (isEditable) {
    const point = createPointGeometry(latlng);
    const flurstuecke = await geoApi.getFlurstueckeForPoint(point, true);
    const flurstueckeBackend = flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);
    selectedFlurstuecke.value = adaptMapForSelectedFlurstuecke(flurstueckeBackend);
  }
}

function handleDeselectGeoJson(): void {
  selectedFlurstuecke.value = new Map<string, FlurstueckDto>();
}

async function handleAcceptSelectedGeoJson(): Promise<void> {
  let verortung: VerortungMultiPolygonDto | undefined;
  if (selectedFlurstuecke.value.size !== 0) {
    verortung = await createVerortungMultiPolygonDtoFromSelectedFlurstuecke();
    if (!_.isNil(verortung)) {
      verortungModel.value = new VerortungMultiPolygonModel(verortung);
      formChanged();
    }
  } else {
    verortungModel.value = undefined;
    formChanged();
  }
}

/**
 * Die Funktion dient dazu, die im Parameter gegebenen Flurstücke an eine Kopie der Variablen "selectedFlurstuecke" anzufügen.
 * Ist ein Flurstück, gegeben im Parameter, bereits in der Kopie der Variablen "selectedFlurstuecke" vorhanden,
 * wird das Flurstück aus der Variablen entfernt.
 * Es wird die angepasste Kopie der Variablen "selectedFlurstuecke" zurückgegeben.
 */
function adaptMapForSelectedFlurstuecke(flurstuecke: Array<FlurstueckDto>): Map<string, FlurstueckDto> {
  const clonedMap = _.cloneDeep(selectedFlurstuecke.value);
  flurstuecke.forEach((flurstueck: FlurstueckDto) => {
    const flurstueckNummer: string = _.isNil(flurstueck.nummer) ? "" : flurstueck.nummer;
    const alreadySelected = clonedMap.has(flurstueckNummer);
    if (alreadySelected) {
      clonedMap.delete(flurstueckNummer);
    } else {
      clonedMap.set(flurstueckNummer, flurstueck);
    }
  });
  return clonedMap;
}

/**
 * Erstellt eine Map mit den im Parameter gegebenen Flurstücken und gibt diese zurück.
 * Der Key der Map ist die Flurstücknummer und der Value das entsprechende Flurstück.
 */
function createMapForFlurstuecke(flurstuecke: Array<FlurstueckDto>): Map<string, FlurstueckDto> {
  const flurstueckMap = new Map<string, FlurstueckDto>();
  flurstuecke.forEach((flurstueck: FlurstueckDto) => {
    const flurstueckNummer: string = _.isNil(flurstueck.nummer) ? "" : flurstueck.nummer;
    flurstueckMap.set(flurstueckNummer, flurstueck);
  });
  return flurstueckMap;
}

function createPointGeometry(latlng: LatLng): PointGeometryDto {
  return {
    type: "Point",
    coordinates: [latlng.lng, latlng.lat],
  };
}

function createMultiPolygonGeometryFromSelectedFlurstuecke(): MultiPolygonGeometryDtoGeoDataEai {
  const multipolygon: MultiPolygonGeometryDtoGeoDataEai = {
    type: "MultiPolygon",
    coordinates: [],
  };
  selectedFlurstuecke.value.forEach((flurstueck: FlurstueckDto) => {
    const flurstueckMultiPolygon = flurstueck.multiPolygon as MultiPolygonGeometryDtoBackend;
    flurstueckMultiPolygon?.coordinates?.forEach((polygon) => {
      multipolygon.coordinates?.push(polygon);
    });
  });
  return multipolygon;
}

/**
 * Erstellt das VerortungMultiPolygonDto auf Basis der in den geoJson-Variable hinterlegten Flurstück-Multipolygone.
 * Tritt ein fehler bei der Erstellung des VerortungMultiPolygonDtos auf, so wird undefined zurückgegeben.
 */
async function createVerortungMultiPolygonDtoFromSelectedFlurstuecke(): Promise<VerortungMultiPolygonDto | undefined> {
  const multipolygon = createMultiPolygonGeometryFromSelectedFlurstuecke();
  try {
    const unifiedMultipolygon = await geoApi.getUnionOfMultipolygon(multipolygon, true);

    const promiseStadtbezirke = geoApi.getStadtbezirkeForMultipolygon(unifiedMultipolygon, true);
    const promiseBezirksteile = geoApi.getBezirksteileForMultipolygon(unifiedMultipolygon, true);
    const promiseViertel = geoApi.getViertelForMultipolygon(unifiedMultipolygon, true);
    const promiseGemarkungen = geoApi.getGemarkungenForMultipolygon(unifiedMultipolygon, true);
    const promiseKitaplanungsbereiche = geoApi.getKitaplanungsbereicheForMultipolygon(unifiedMultipolygon, true);
    const promiseGrundschulsprengel = geoApi.getGrundschulsprengelForMultipolygon(unifiedMultipolygon, true);
    const promiseMittelschulsprengel = geoApi.getMittelschulsprengelForMultipolygon(unifiedMultipolygon, true);

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

    // Anfügen der Flurstücke an Gemarkung
    selectedFlurstuecke.value.forEach((selectedFlurstueck) => {
      const matchingGemarkung = gemarkungenBackend.find(
        (gemarkung) => gemarkung.nummer === selectedFlurstueck.gemarkungNummer,
      );
      matchingGemarkung?.flurstuecke.add(selectedFlurstueck);
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

    // Erstellung des VerortungMultiPolygonDto
    return {
      gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
      stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
      bezirksteile: new Set<BezirksteilDto>(bezirksteileBackend),
      viertel: new Set<ViertelDto>(viertelBackend),
      kitaplanungsbereiche: new Set<KitaplanungsbereichDto>(kitaplanungsbereicheBackend),
      grundschulsprengel: new Set<GrundschulsprengelDto>(grundschulsprengelBackend),
      mittelschulsprengel: new Set<MittelschulsprengelDto>(mittelschulsprengelBackend),
      multiPolygon: JSON.parse(JSON.stringify(unifiedMultipolygon)) as MultiPolygonGeometryDtoBackend,
    } as VerortungMultiPolygonDto;
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

function flurstueckeToGeoJsonFeature(flurstuecke: Array<FlurstueckDto>): Array<Feature> {
  return flurstuecke.map((flurstueck: FlurstueckDto) => {
    return {
      type: "Feature",
      geometry: JSON.parse(JSON.stringify(flurstueck.multiPolygon)) as MultiPolygon,
      properties: {
        nummer: flurstueck.nummer,
        zaehler: flurstueck.zaehler,
        nenner: flurstueck.nenner,
        eigentumsart: flurstueck.eigentumsart,
        eigentumsartBedeutung: flurstueck.eigentumsartBedeutung,
        flaecheQm: flurstueck.flaecheQm,
        nummerGemarkung: flurstueck.gemarkungNummer,
      },
    };
  });
}
</script>
