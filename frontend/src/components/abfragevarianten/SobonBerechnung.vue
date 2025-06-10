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
              :disabled="!isFreieEingabe"
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

const sobonBerechnung = defineModel<SobonBerechnungModel>({ required: true });
const { formChanged } = useSaveLeave();
const { isEditableBySachbearbeitung } = useAbfrageSecurity();
const groupedStammdaten = ref<FoerdermixStammDto[]>([]);
const stammdatenStore = useStammdatenStore();

onMounted(() => {
  setGroupedStammdatenList();
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
    sobonBerechnung.value.sobonFoerdermix = mapFoerdermixStammModelToFoerderMix(item as FoerdermixStammModel);
  },
});

const foerderarten = computed(() => {
  if (!_.isNil(sobonBerechnung.value.sobonFoerdermix)) {
    return sobonBerechnung.value.sobonFoerdermix.foerderarten;
  }
});

const isFreieEingabe = computed(() => {
  return sobonBerechnung.value.sobonFoerdermix?.bezeichnung === "Freie Eingabe" && isEditableBySachbearbeitung;
});

const gesamtsumme = computed(() => {
  if (!_.isNil(sobonBerechnung.value.sobonFoerdermix)) {
    const foerdermixe = new FoerdermixModel(sobonBerechnung.value.sobonFoerdermix);
    return addiereAnteile(foerdermixe);
  }
  return 0;
});

function setGroupedStammdatenList(): void {
  let stammdaten = stammdatenStore.foerdermixStammdaten;
  stammdaten = stammdaten.filter((fm: FoerdermixStammDto) => {
    return fm.foerdermix.bezeichnung !== "private Fläche" && fm.foerdermix.bezeichnung !== "städtische Fläche";
  });
  groupedStammdaten.value = _.sortBy(stammdaten, ["foerdermix.bezeichnungJahr"]);
}

function sobonBerechnungChanged(): void {
  formChanged();
  if (!sobonBerechnung.value.isASobonBerechnung) {
    sobonBerechnung.value.sobonFoerdermix = undefined;
  }
}
</script>

<style scoped></style>
