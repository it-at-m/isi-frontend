<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-checkbox
        id="sobon_berechnung"
        ref="sobonBerechnungCheckbox"
        v-model="sobonBerechnung.isASobonBerechnung"
        :disabled="!isEditableBySachbearbeitung"
        class="mx-3"
        label="SoBoN-Berechnung"
        color="primary"
        @update:model-value="sobonBerechnungChanged"
      />
    </v-col>
    <v-expand-transition>
      <v-col
        v-if="sobonBerechnung.isASobonBerechnung"
        cols="12"
        md="6"
      >
        <v-select
          id="sobon_orientierungswert_jahr_sobonursaechlich_dropdown"
          ref="sobonOrientierungswertJahrSobonursaechlichDropdown"
          v-model="sobonBerechnung.sobonOrientierungswertJahrSobonUrsaechlich"
          variant="underlined"
          :disabled="!isEditableBySachbearbeitung"
          :items="sobonOrientierungswertJahrList"
          item-value="key"
          item-title="value"
          @update:model-value="formChanged"
        >
          <template #label> Jahr für SoBoN-Orientierungwerte (SoBoN-ursächlich) </template>
        </v-select>
      </v-col>
    </v-expand-transition>
    <v-expand-transition>
      <v-col
        v-if="sobonBerechnung.isASobonBerechnung"
        cols="12"
        md="6"
      >
        <v-select
          id="sobon_berechnung_foerdermix_stammdaten_dropdown"
          v-model="sobonFoerdermix"
          :disabled="!isEditableBySachbearbeitung"
          :items="groupedStammdaten"
          label="Fördermix für Berechnung"
          variant="underlined"
          item-title="foerdermix.bezeichnung"
          return-object
          @update:model-value="formChanged"
        />
      </v-col>
    </v-expand-transition>
    <v-expand-transition>
      <v-col
        v-if="sobonBerechnung.isASobonBerechnung"
        cols="12"
        md="6"
      >
        <v-row class="align-center">
          <v-col>
            <v-select
              id="sobon_berechnung_versorgungsquote_hort_sobon"
              v-model="sobonBerechnung.versorgungsquoteHortSobon"
              :disabled="!isEditableBySachbearbeitung"
              :items="versorungsquoteHortSobon"
              label="SoBoN-ursächliche Versorgungsquote Hort"
              variant="underlined"
              item-value="versorgungsquoteSobon"
              item-title="beschreibung"
              @update:model-value="formChanged"
            />
          </v-col>
          <v-col
            class="pa-0"
            cols="auto"
          >
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  :color="isEditableBySachbearbeitung ? 'primary' : 'grey-lighten-1'"
                >
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <div v-html="helpTextSoBoNUrsaechlicheVersorgungsquoteHort"></div>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-expand-transition>

    <v-expand-transition>
      <v-col
        v-if="isFreieEingabe"
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              id="sobon_foerdermix_summe"
              v-model="gesamtsumme"
              label="Summe"
              variant="underlined"
              readonly
              :rules="[() => nichtGleich100Prozent(sobonBerechnung.sobonFoerdermix)]"
              suffix="%"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(foerderart, index) in foerderarten"
            :key="index"
            cols="12"
            md="4"
          >
            <num-field
              :id="'sobon_foerderart_' + index"
              v-model="foerderart.anteilProzent"
              :label="foerderart.bezeichnung"
              :suffix="PERCENT"
              :readonly="!isFreieEingabe"
              :class="isFreieEingabe ? '' : 'text-grey-lighten-1'"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-expand-transition>
  </v-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import SobonBerechnungModel from "@/types/model/abfragevariante/SobonBerechnungModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { createFoerdermixDto } from "@/utils/Factories";
import { mapFoerdermixStammModelToFoerderMix, mapFoerdermixToFoerderMixStammModel } from "@/utils/MapperUtil";
import { nichtGleich100Prozent } from "@/utils/FieldValidationRules";
import { addiereAnteile } from "@/utils/CalculationUtil";
import NumField from "@/components/common/NumField.vue";
import _ from "lodash";
import { PERCENT } from "@/utils/FieldPrefixesSuffixes";
import { FoerdermixStammdaten } from "@/types/common/FördermixStammdatenEnum";
import { useVersorgungsquoteSobonHortApi } from "@/composables/requests/VersorgungsquoteSobonHortApi";
import { LookupEntryDto, VersorgungsquoteSobonHortDto } from "@/api/api-client/isi-backend";
import { useErrorHandler } from "@/composables/requests/ErrorHandler";
import { helpTextSoBoNUrsaechlicheVersorgungsquoteHort } from "@/utils/AbfragevarianteUtil";

interface Props {
  sobonOrientierungswertJahrList: LookupEntryDto[];
}

defineProps<Props>();

const sobonBerechnung = defineModel<SobonBerechnungModel>({ required: true });
const { formChanged } = useSaveLeave();
const { isEditableBySachbearbeitung } = useAbfrageSecurity();
const groupedStammdaten = ref<FoerdermixStammDto[]>([]);
const stammdatenStore = useStammdatenStore();
const { getVersorgungsquoteHortSobon } = useVersorgungsquoteSobonHortApi();
const versorungsquoteHortSobon = ref<VersorgungsquoteSobonHortDto[] | undefined>(undefined);
const { handleError } = useErrorHandler();

let stammdaten: FoerdermixStammDto[] = [];

onMounted(() => {
  setGroupedStammdatenList();
  void loadVersorungsquoteHortSobon();
});

const sobonFoerdermix = computed({
  get() {
    if (!_.isNil(sobonBerechnung.value.sobonFoerdermix?.bezeichnung)) {
      return mapFoerdermixToFoerderMixStammModel(
        sobonBerechnung.value.sobonFoerdermix ?? new FoerdermixModel(createFoerdermixDto()),
      );
    }
    return undefined;
  },
  set(item: FoerdermixStammModel | undefined) {
    sobonBerechnung.value.sobonFoerdermix = item ? mapFoerdermixStammModelToFoerderMix(item) : undefined;
  },
});

const foerderarten = computed(() => {
  return sobonBerechnung.value.sobonFoerdermix?.foerderarten ?? [];
});

const isFreieEingabe = computed(() => {
  return (
    sobonBerechnung.value.sobonFoerdermix?.bezeichnung === FoerdermixStammdaten.FREIE_EINGABE &&
    isEditableBySachbearbeitung
  );
});

const gesamtsumme = computed(() => {
  if (!_.isNil(sobonBerechnung.value.sobonFoerdermix)) {
    return addiereAnteile(new FoerdermixModel(sobonBerechnung.value.sobonFoerdermix));
  }
  return 0;
});

function setGroupedStammdatenList(): void {
  stammdaten = stammdatenStore.foerdermixStammdaten;
  groupedStammdaten.value = getFilteredAndSortedStammdaten();
  handleOldEntries();
}

function getFilteredAndSortedStammdaten(): FoerdermixStammDto[] {
  return _.sortBy(
    stammdaten.filter(
      (stammdatum) =>
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.PRIVATE_FLAECHE &&
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.STAEDTISCHE_FLAECHE &&
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.BESCHLUSS_40 &&
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.BEFREIUNG_31_BAUGB,
    ),
    ["foerdermix.bezeichnungJahr"],
  );
}

function handleOldEntries(): void {
  if (isOldEntry()) {
    const matchedDatum = findMatchingStammdatum();
    if (matchedDatum) {
      groupedStammdaten.value.push(matchedDatum);
      groupedStammdaten.value = _.sortBy(groupedStammdaten.value, ["foerdermix.bezeichnungJahr"]);
    }
  }
}

function findMatchingStammdatum(): FoerdermixStammDto | undefined {
  return stammdaten.find(
    (stammdatum) =>
      stammdatum.foerdermix.bezeichnung === sobonBerechnung.value.sobonFoerdermix?.bezeichnung &&
      stammdatum.foerdermix.bezeichnungJahr === sobonBerechnung.value.sobonFoerdermix?.bezeichnungJahr,
  );
}

function isOldEntry(): boolean {
  return [FoerdermixStammdaten.BESCHLUSS_40, FoerdermixStammdaten.BEFREIUNG_31_BAUGB].includes(
    sobonBerechnung.value.sobonFoerdermix?.bezeichnung as FoerdermixStammdaten,
  );
}

function sobonBerechnungChanged(): void {
  formChanged();
  if (!sobonBerechnung.value.isASobonBerechnung) {
    sobonBerechnung.value.sobonFoerdermix = undefined;
    sobonBerechnung.value.versorgungsquoteHortSobon = undefined;
  }
}

async function loadVersorungsquoteHortSobon(): Promise<void> {
  try {
    versorungsquoteHortSobon.value = await getVersorgungsquoteHortSobon();
  } catch (error) {
    handleError(error);
    versorungsquoteHortSobon.value = [];
  }
}
</script>

<style scoped></style>
