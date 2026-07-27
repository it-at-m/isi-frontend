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
    <v-btn-toggle
      v-if="isEditable"
      v-model="selectionMode"
      mandatory
      density="compact"
      class="mt-2"
    >
      <v-btn
        value="flurstück"
        prepend-icon="mdi-land-fields"
        >Flurstücke</v-btn
      >
      <v-btn
        value="baublock"
        prepend-icon="mdi-city-variant-outline"
        >Baublöcke</v-btn
      >
      <v-btn
        value="bebauungsplan"
        prepend-icon="mdi-map-outline"
        >Bebauungspläne</v-btn
      >
    </v-btn-toggle>

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
        <v-label v-if="kitaplanungsbereiche.length !== 0">Kitaplanungsbereiche</v-label>
        <v-chip-group
          v-if="kitaplanungsbereiche.length !== 0"
          title="Kitaplanungsbereiche"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="(kitaplanungsbereich, index) in kitaplanungsbereiche"
            :key="kitaplanungsbereich.kitaPlbT ?? `kitaPlb-${index}`"
            :closable="isEditable && kitaplanungsbereiche.length > 1"
            @click:close.stop="removeChipKitaplanungsbereiche(kitaplanungsbereich.kitaPlbT)"
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
            :key="grundschulsprengelItem.nummer ?? `grundschulsprengel-${index}`"
            :closable="isEditable && grundschulsprengel.length > 1"
            @click:close.stop="removeChipGrundschulsprengel(grundschulsprengelItem.nummer)"
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
            :key="mittelschulsprengelItem.nummer ?? `mittelschulSprengel-${index}`"
            :closable="isEditable && mittelschulsprengel.length > 1"
            @click:close.stop="removeChipMittelschulsprengel(mittelschulsprengelItem.nummer)"
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
          selected-class="text-primary"
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
import { computed, onMounted, ref, watch } from "vue";
import type { Feature, MultiPolygon } from "geojson";
import type {
  FeatureDtoBaublockDto,
  FeatureDtoBebauungsplanUmgriffDto,
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
import type {
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
import FieldGroupCard from "./FieldGroupCard.vue";
import CityMap from "@/components/map/CityMap.vue";
import L, { LatLng, Layer } from "leaflet";
import _ from "lodash";
import VerortungMultiPolygonModel from "@/types/model/common/VerortungMultiPolygonModel";
import { Context } from "@/utils/Context";
import { COLOR_POLYGON_UMGRIFF } from "@/utils/MapUtil";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useSecurity } from "@/composables/security/Security";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useGeodataEaiApi } from "@/composables/requests/eai/GeodataEaiApi";
import { useToast } from "vue-toastification";

interface Props {
  context?: Context;
  lookAt?: AdresseDto;
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

type SelectionMode = "flurstück" | "baublock" | "bebauungsplan";

const { formChanged } = useSaveLeave();
const { isRoleAdminOrSachbearbeitung } = useSecurity();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const geoApi = useGeodataEaiApi();
const toast = useToast();
const selectionMode = ref<SelectionMode>("flurstück");
const props = withDefaults(defineProps<Props>(), { context: Context.UNDEFINED });
const verortungModel = defineModel<VerortungMultiPolygonModel | undefined>();
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
  if (!isEditable.value) return;
  const point = createPointGeometry(latlng);

  if (selectionMode.value === "flurstück") {
    const flurstuecke = await geoApi.getFlurstueckeForPoint(point);
    const flurstueckeBackend = flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);
    selectedFlurstuecke.value = adaptMapForSelectedFlurstuecke(flurstueckeBackend);
  } else if (selectionMode.value === "baublock") {
    await handleBaublockSelection(point);
  } else if (selectionMode.value === "bebauungsplan") {
    await handleBebauungsplanSelection(point);
  }
}

async function handleBaublockSelection(point: PointGeometryDto): Promise<void> {
  const baublöcke = await geoApi.getBaubloeckeForPoint(point);
  if (baublöcke.length === 0) {
    toast.warning("Es wurde kein Baublock an der gewählten Stelle gefunden.");
    return;
  }
  const allFlurstueckeEai: FeatureDtoFlurstueckDto[] = [];
  for (const baublock of baublöcke) {
    const baublockMultiPolygon = baublockToMultiPolygon(baublock);
    const flurstuecke = await geoApi.getFlurstueckeInnerhalbUmgriffForMultipolygon(baublockMultiPolygon);
    allFlurstueckeEai.push(...flurstuecke);
  }
  if (allFlurstueckeEai.length === 0) {
    toast.warning("Es wurden keine Flurstücke innerhalb des gewählten Baublocks gefunden.");
    return;
  }
  const deduplicated = _.uniqBy(
    allFlurstueckeEai,
    (f) => `${f.properties?.fluerstueckNummerZ}/${f.properties?.fluerstueckNummerN}`,
  );
  const flurstueckeBackend = flurstueckeGeoDataEaiToFlurstueckeBackend(deduplicated);
  selectedFlurstuecke.value = adaptMapForSelectedFlurstuecke(flurstueckeBackend);
}

async function handleBebauungsplanSelection(point: PointGeometryDto): Promise<void> {
  const bebauungsplaene = await geoApi.getBebauungsplaeneForPoint(point);
  if (bebauungsplaene.length === 0) {
    toast.warning("Es wurde kein Bebauungsplan-Umgriff an der gewählten Stelle gefunden.");
    return;
  }
  const allFlurstueckeEai: FeatureDtoFlurstueckDto[] = [];
  for (const bebauungsplan of bebauungsplaene) {
    const bebauungsplanMultiPolygon = bebauungsplanToMultiPolygon(bebauungsplan);
    const flurstuecke = await geoApi.getFlurstueckeInnerhalbUmgriffForMultipolygon(bebauungsplanMultiPolygon);
    allFlurstueckeEai.push(...flurstuecke);
  }
  if (allFlurstueckeEai.length === 0) {
    toast.warning("Es wurden keine Flurstücke innerhalb des gewählten Bebauungsplan-Umgriffs gefunden.");
    return;
  }
  const deduplicated = _.uniqBy(
    allFlurstueckeEai,
    (f) => `${f.properties?.fluerstueckNummerZ}/${f.properties?.fluerstueckNummerN}`,
  );
  const flurstueckeBackend = flurstueckeGeoDataEaiToFlurstueckeBackend(deduplicated);
  selectedFlurstuecke.value = adaptMapForSelectedFlurstuecke(flurstueckeBackend);
}

function baublockToMultiPolygon(baublock: FeatureDtoBaublockDto): MultiPolygonGeometryDtoGeoDataEai {
  const geometry = baublock.geometry as MultiPolygonGeometryDtoGeoDataEai;
  return geometry ?? { type: "MultiPolygon", coordinates: [] };
}

function bebauungsplanToMultiPolygon(
  bebauungsplan: FeatureDtoBebauungsplanUmgriffDto,
): MultiPolygonGeometryDtoGeoDataEai {
  const geometry = bebauungsplan.geometry as MultiPolygonGeometryDtoGeoDataEai;
  return geometry ?? { type: "MultiPolygon", coordinates: [] };
}

function handleDeselectGeoJson(): void {
  selectedFlurstuecke.value = new Map<string, FlurstueckDto>();
  handleAcceptSelectedGeoJson();
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
    const unifiedMultipolygon = await geoApi.getUnionOfMultipolygon(multipolygon);
    const promiseStadtbezirke = await geoApi.getStadtbezirkeForMultipolygon(unifiedMultipolygon);
    const promiseBezirksteile = await geoApi.getBezirksteileForMultipolygon(unifiedMultipolygon);
    const promiseViertel = await geoApi.getViertelForMultipolygon(unifiedMultipolygon);
    const promiseGemarkungen = await geoApi.getGemarkungenForMultipolygon(unifiedMultipolygon);
    const promiseKitaplanungsbereiche = await geoApi.getKitaplanungsbereicheForMultipolygon(unifiedMultipolygon);
    const promiseGrundschulsprengel = await geoApi.getGrundschulsprengelForMultipolygon(unifiedMultipolygon);
    const promiseMittelschulsprengel = await geoApi.getMittelschulsprengelForMultipolygon(unifiedMultipolygon);

    // Stadtbezirke ermitteln
    const stadtbezirkeBackend: Array<StadtbezirkDto> = stadtbezirkeGeoDataEaiToStadtbezirkeBackend(promiseStadtbezirke);

    // Stadtbezirksteile ermitteln
    const bezirksteileBackend: Array<BezirksteilDto> = bezirksteileGeoDataEaiToBezirksteileBackend(promiseBezirksteile);

    // Viertel ermitteln
    const viertelBackend: Array<ViertelDto> = viertelGeoDataEaiToViertelBackend(promiseViertel);

    // Gemarkungen ermitteln
    const gemarkungenBackend: Array<GemarkungDto> = gemarkungenGeoDataEaiToGemarkungenBackend(promiseGemarkungen);

    // Anfügen der Flurstücke an Gemarkung
    selectedFlurstuecke.value.forEach((selectedFlurstueck) => {
      const matchingGemarkung = gemarkungenBackend.find(
        (gemarkung) => gemarkung.nummer === selectedFlurstueck.gemarkungNummer,
      );
      matchingGemarkung?.flurstuecke.add(selectedFlurstueck);
    });

    // KitaPlb ermitteln
    const kitaplanungsbereicheBackend: Array<KitaplanungsbereichDto> =
      kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(promiseKitaplanungsbereiche);

    // Grundschulsprengel ermitteln
    const grundschulsprengelBackend: Array<GrundschulsprengelDto> =
      grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(promiseGrundschulsprengel);

    // Mittelschulsprengel ermitteln
    const mittelschulsprengelBackend: Array<MittelschulsprengelDto> =
      mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(promiseMittelschulsprengel);

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

function removeChipGrundschulsprengel(nummer: number | undefined) {
  const grundschulSprengel = Array.from(verortungModel.value?.grundschulsprengel ?? []);
  if (nummer === undefined) {
    return;
  }
  if (grundschulSprengel.length <= 1) {
    return;
  }
  const filteredGrundschulSprengel = grundschulSprengel.filter((x) => x.nummer !== nummer);
  verortungModel.value!.grundschulsprengel = new Set(filteredGrundschulSprengel);
  formChanged();
}

function removeChipKitaplanungsbereiche(kitaPlbT: string | undefined) {
  const kitaplanungsbereiche = Array.from(verortungModel.value?.kitaplanungsbereiche ?? []);
  if (kitaPlbT === undefined) {
    return;
  }

  if (kitaplanungsbereiche.length <= 1) {
    return;
  }
  const filteredKitaplanungsbereiche = kitaplanungsbereiche.filter((x) => x.kitaPlbT !== kitaPlbT);
  verortungModel.value!.kitaplanungsbereiche = new Set(filteredKitaplanungsbereiche);
  formChanged();
}

function removeChipMittelschulsprengel(nummer: number | undefined) {
  const mittelschulsprengel = Array.from(verortungModel.value?.mittelschulsprengel ?? []);
  if (nummer === undefined) {
    return;
  }
  if (mittelschulsprengel.length <= 1) {
    return;
  }
  const filteredMittelschulSprengel = mittelschulsprengel.filter((x) => x.nummer !== nummer);
  verortungModel.value!.mittelschulsprengel = new Set(filteredMittelschulSprengel);
  formChanged();
}
</script>
