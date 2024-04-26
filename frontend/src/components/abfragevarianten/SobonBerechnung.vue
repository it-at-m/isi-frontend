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
        :disabled="!isEditableBySachbearbeitung()"
        class="mx-3"
        label="SoBoN-Berechnung"
        color="primary"
        @change="sobonBerechnungChanged"
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
          :disabled="!isEditableBySachbearbeitung()"
          :items="groupedStammdaten"
          label="Fördermix für Berechnung"
          item-text="foerdermix.bezeichnung"
          return-object
          @change="formChanged"
        />
      </v-col>
    </v-expand-transition>
  </v-row>
</template>

<script setup lang="ts">
import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import SobonBerechnungModel from "@/types/model/abfragevariante/SobonBerechnungModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { createFoerdermixDto } from "@/utils/Factories";
import {
  groupItemsToHeader,
  mapFoerdermixStammModelToFoerderMix,
  mapFoerdermixToFoerderMixStammModel,
} from "@/utils/MapperUtil";
import { defineModel } from "@/utils/Vue";
import { computed, onMounted } from "vue";
type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;

interface Props {
  value: SobonBerechnungModel;
}

interface Emits {
  (event: "input", value: SobonBerechnungModel): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const sobonBerechnung = defineModel(props, emit);
const { formChanged } = useSaveLeave();
const { isEditableBySachbearbeitung } = useAbfrageSecurity();
let groupedStammdaten = ref<GroupedStammdaten | null>([]);

const stammdatenStore = useStammdatenStore();

onMounted(() => {
  setGroupedStammdatenList();
});

const sobonFoerdermix = computed({
  get() {
    return mapFoerdermixToFoerderMixStammModel(
      sobonBerechnung.value.sobonFoerdermix ?? new FoerdermixModel(createFoerdermixDto()),
    );
  },
  set(item: FoerdermixStammModel) {
    sobonBerechnung.value.sobonFoerdermix = mapFoerdermixStammModelToFoerderMix(item);
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
  groupedStammdaten.value = groupItemsToHeader(stammdaten, true);
}

function sobonBerechnungChanged(): void {
  formChanged();
  if (!sobonBerechnung.value.isASobonBerechnung) {
    sobonBerechnung.value.sobonFoerdermix = undefined;
  }
}
</script>

<style></style>
