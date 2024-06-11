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
          item-title="foerdermix.bezeichnung"
          return-object
          @update:model-value="formChanged"
        />
      </v-col>
    </v-expand-transition>
  </v-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import SobonBerechnungModel from "@/types/model/abfragevariante/SobonBerechnungModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { createFoerdermixDto } from "@/utils/Factories";
import { mapFoerdermixStammModelToFoerderMix, mapFoerdermixToFoerderMixStammModel } from "@/utils/MapperUtil";
import _ from "lodash";

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

function setGroupedStammdatenList(): void {
  let stammdaten = stammdatenStore.foerdermixStammdaten;
  stammdaten = stammdaten.filter((foerdermixStaemme: FoerdermixStammDto) => {
    return (
      foerdermixStaemme.foerdermix.bezeichnung !== "private Fläche" &&
      foerdermixStaemme.foerdermix.bezeichnung !== "städtische Fläche"
    );
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
